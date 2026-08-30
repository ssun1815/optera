'use server'

import { createClient } from '@/app/lib/supabase/server'
import { createAdminClient } from '@/app/lib/supabase/admin'
import { runDiscoveryLogic } from '@/app/lib/discovery'
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
  await runDiscoveryLogic()
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
    const { data: inserted, error: insertError } = await admin
      .from('opportunities')
      .insert({
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
        lifecycle_stage: candidate.lifecycle_stage,
        timing_assessment: candidate.timing_assessment,
        timing_assessment_reason: candidate.timing_assessment_reason,
        recommended_action: candidate.recommended_action,
        recommended_action_reason: candidate.recommended_action_reason,
      })
      .select('id')
      .single()

    if (!insertError && inserted && Array.isArray(candidate.organisations) && candidate.organisations.length > 0) {
      const orgRows = candidate.organisations.map((org: any) => ({
        opportunity_id: inserted.id,
        company_name: org.company_name ?? null,
        role: org.role ?? null,
        source_note: org.source_note ?? null,
        investigation_priority: org.investigation_priority ?? null,
        investigation_reason: org.investigation_reason ?? null,
      }))
      await admin.from('opportunity_organisations').insert(orgRows)
    }

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