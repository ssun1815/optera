import { createAdminClient } from '@/app/lib/supabase/admin'
import { anthropic } from '@/app/lib/anthropic'

export async function runDiscoveryLogic() {
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

Write every text field in plain prose. Do not include citation markup, footnotes, brackets, or tags of any kind inline in your sentences. Source attribution belongs only in the dedicated source_name and source_url fields, nowhere else.

Score each opportunity 1-10 for HVAC relevance based on facility type, size, likely need for significant HVAC and mechanical systems, project stage, recency, geographic relevance, and source credibility. Scores 9-10 are high priority, 7-8 are strong opportunities, 5-6 are possible opportunities, below 5 should not be included.

For each opportunity, also determine:
- lifecycle_stage: exactly one of "announced", "planning", "design", "permitting", "construction", or "completed", based on what the sources actually describe. Do not guess a stage the sources do not support.
- timing_assessment: a short phrase such as "Early-stage opportunity", "Active development opportunity", or "Later-stage opportunity", consistent with the lifecycle_stage.
- timing_assessment_reason: one or two sentences explaining the timing judgment based on the actual facts found.
- recommended_action: one of "Research Project Team", "Identify Key Organisations", "Investigate Now", "Monitor Project", or "Follow Up", chosen based on how much is already known and how active construction is.
- recommended_action_reason: one or two sentences explaining why that action is recommended, based on actual facts, not assumptions presented as certainty.
- organisations: an array of objects, one per company or organisation actually named in your sources, each with: company_name, role (e.g. "Developer", "General Contractor", "Architect", "Civil Engineer", "MEP Engineering Firm", "Operating Partner"), source_note (where this was mentioned), investigation_priority (integer, 1 = most relevant to investigate first for HVAC subcontracting), and investigation_reason (one sentence on why this organisation matters for a commercial HVAC contractor specifically). Only include organisations that are actually named in a source. If none are named, return an empty array - never invent a company name.

Find up to 4 new opportunities. Respond with ONLY a raw JSON array as your entire response, starting with [ and ending with ]. Do not include any introductory sentence, explanation, markdown code fences, or commentary before or after the array. Each object must have exactly these fields: project_name, company_or_developer, location, city, state, project_type, project_description, estimated_size, estimated_value, project_stage, announcement_date (YYYY-MM-DD or null if unknown), hvac_relevance, reason_for_relevance, opportunity_score (integer 1-10), source_name, source_url, source_date (YYYY-MM-DD or null), verification_status, lifecycle_stage, timing_assessment, timing_assessment_reason, recommended_action, recommended_action_reason, organisations (array as described above).

If you cannot find any qualifying new opportunities, respond with an empty JSON array: []`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-5',
    max_tokens: 16000,
    tools: [{ type: 'web_search_20250305', name: 'web_search' } as any],
    messages: [{ role: 'user', content: prompt }],
  })

  const textBlocks = response.content.filter((block: any) => block.type === 'text')
  const rawText = textBlocks.map((block: any) => block.text).join('\n').trim()

  const firstBracket = rawText.indexOf('[')
  const lastBracket = rawText.lastIndexOf(']')
  const cleaned = firstBracket !== -1 && lastBracket !== -1
    ? rawText.slice(firstBracket, lastBracket + 1)
    : rawText

  let candidates: any[] = []
  try {
    candidates = JSON.parse(cleaned)
  } catch (err) {
    console.error('Discovery: JSON parse failed', cleaned.slice(0, 500))
    throw new Error('Discovery run failed: could not parse AI response.')
  }

  let insertedCount = 0
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
      lifecycle_stage: c.lifecycle_stage ?? null,
      timing_assessment: c.timing_assessment ?? null,
      timing_assessment_reason: c.timing_assessment_reason ?? null,
      recommended_action: c.recommended_action ?? null,
      recommended_action_reason: c.recommended_action_reason ?? null,
      organisations: Array.isArray(c.organisations) ? c.organisations : [],
    }))

    const { error: insertError } = await admin.from('opportunity_candidates').insert(rows)
    if (insertError) {
      throw new Error(`Failed to save candidates: ${insertError.message}`)
    }
    insertedCount = rows.length
  }

  return { candidatesFound: candidates.length, insertedCount }
}