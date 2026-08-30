'use server'

import { createClient } from '@/app/lib/supabase/server'
import { createAdminClient } from '@/app/lib/supabase/admin'
import { anthropic } from '@/app/lib/anthropic'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect('/dashboard')
  }
  return user
}

export async function runDiscovery() {
  await requireAdmin()
  const admin = createAdminClient()

  const { data: existingOpps } = await admin.from('opportunities').select('project_name')
  const { data: existingCandidates } = await admin
    .from('opportunity_candidates')
    .select('project_name')
    .eq('status', 'pending')

  const knownNames = [
    ...(existingOpps?.map((o) => o.project_name) ?? []),
    ...(existingCandidates?.map((c) => c.project_name) ?? []),
  ].filter(Boolean)

  const prompt = `You are a research analyst for Optera, a B2B commercial opportunity intelligence platform for commercial HVAC contractors in the Dallas-Fort Worth, Texas metropolitan area.

Find NEW, REAL, VERIFIABLE commercial or industrial development opportunities in the Dallas-Fort Worth metro area (including nearby counties that are part of the DFW metropolitan statistical area) that may represent potential HVAC opportunities.

INCLUDE these project types: warehouses, distribution centers, manufacturing and industrial facilities, data centers, hotels, healthcare facilities, office developments, large commercial developments, major commercial renovations and expansions.

EXCLUDE: single-family residential housing, small residential projects, projects outside the DFW metro area, generic business news without an identifiable physical project, unverified rumors, and projects that are clearly too old to be actionable (already completed or fully occupied).

Do NOT include any project matching these names, which are already known: ${knownNames.join('; ') || 'none yet'}.

For each opportunity found, use web search to verify real, credible sources (established news outlets, commercial real estate trade publications like Bisnow or CoStar, or official government or company announcements). Never fabricate any information. If a specific detail is not publicly available, use the exact string "Not publicly available" for that field.

Score each opportunity 1-10 for HVAC relevance based on facility type, size, likely need for significant HVAC and mechanical systems, project stage, recency, geographic relevance, and source credibility. Scores 9-10 are high priority, 7-8 are strong opportunities, 5-6 are possible opportunities, below 5 should not be included.

Find up to 4 new opportunities. Respond with ONLY a raw JSON array, no markdown code fences, no commentary before or after. Each object must have exactly these fields: project_name, company_or_developer, location, city, state, project_type, project_description, estimated_size, estimated_value, project_stage, announcement_date (YYYY-MM-DD or null if unknown), hvac_relevance, reason_for_relevance, opportunity_score (integer 1-10), source_name, source_url, source_date (YYYY-MM-DD or null), verification_status.

If you cannot find any qualifying new opportunities, respond with an empty JSON array: []`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-5',
    max_tokens: 16000,
    tools: [{ type: 'web_search_20250305', name: 'web_search' } as any],
    messages: [{ role: 'user', content: prompt }],
  })

  console.log('--- DISCOVERY RUN: stop_reason ---', response.stop_reason)

  const textBlocks = response.content.filter((block: any) => block.type === 'text')
  const rawText = textBlocks.map((block: any) => block.text).join('\n').trim()
  const cleaned = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim()

  console.log('--- DISCOVERY RUN: raw text length ---', rawText.length)
  console.log('--- DISCOVERY RUN: first 1000 chars ---', cleaned.slice(0, 1000))

  let candidates: any[] = []
  try {
    candidates = JSON.parse(cleaned)
    console.log('--- DISCOVERY RUN: parsed candidate count ---', candidates.length)
  } catch (err) {
    console.error('--- DISCOVERY RUN: JSON PARSE FAILED ---', err)
    throw new Error('Discovery run failed: could not parse AI response. Check server logs.')
  }

  if (Array.isArray(candidates) && candidates.length > 0) {
    const rows = candidates.map((c) => ({
      status: 'pending',
      project_name: c.project_name ?? null,
      company_or_developer: c.company_or_developer ?? null,
      location: c.location ?? null,
      city: c.city ?? null,
      state: c.state ?? null,
      project_type: c.project_type ?? null,
      project_description: c.project_description ?? null,
      estimated_size: c.estimated_size ?? null,
      estimated_value: c.estimated_value ?? null,
      project_stage: c.project_stage ?? null,
      announcement_date: c.announcement_date || null,
      hvac_relevance: c.hvac_relevance ?? null,
      reason_for_relevance: c.reason_for_relevance ?? null,
      opportunity_score: c.opportunity_score ?? null,
      source_name: c.source_name ?? null,
      source_url: c.source_url ?? null,
      source_date: c.source_date || null,
      verification_status: c.verification_status ?? null,
    }))

    const { error: insertError } = await admin.from('opportunity_candidates').insert(rows)
    if (insertError) {
      console.error('--- DISCOVERY RUN: INSERT FAILED ---', insertError)
      throw new Error(`Failed to save candidates: ${insertError.message}`)
    }
    console.log('--- DISCOVERY RUN: inserted successfully ---')
  }

  revalidatePath('/admin')
}

export async function approveCandidate(candidateId: string) {
  await requireAdmin()
  const admin = createAdminClient()

  const { data: candidate } = await admin
    .from('opportunity_candidates')
    .select('*')
    .eq('id', candidateId)
    .single()

  if (candidate) {
    await admin.from('opportunities').insert({
      project_name: candidate.project_name,
      company_or_developer: candidate.company_or_developer,
      location: candidate.location,
      city: candidate.city,
      state: candidate.state,
      project_type: candidate.project_type,
      project_description: candidate.project_description,
      estimated_size: candidate.estimated_size,
      estimated_value: candidate.estimated_value,
      project_stage: candidate.project_stage,
      announcement_date: candidate.announcement_date,
      hvac_relevance: candidate.hvac_relevance,
      reason_for_relevance: candidate.reason_for_relevance,
      opportunity_score: candidate.opportunity_score,
      source_name: candidate.source_name,
      source_url: candidate.source_url,
      source_date: candidate.source_date,
      verification_status: candidate.verification_status,
    })

    await admin.from('opportunity_candidates').update({ status: 'approved' }).eq('id', candidateId)
  }

  revalidatePath('/admin')
}

export async function rejectCandidate(candidateId: string) {
  await requireAdmin()
  const admin = createAdminClient()
  await admin.from('opportunity_candidates').update({ status: 'rejected' }).eq('id', candidateId)
  revalidatePath('/admin')
}