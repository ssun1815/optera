'use server'

import { createClient } from '@/app/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleSaveOpportunity(opportunityId: string, isSaved: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  if (isSaved) {
    await supabase
      .from('saved_opportunities')
      .delete()
      .eq('user_id', user.id)
      .eq('opportunity_id', opportunityId)
  } else {
    await supabase
      .from('saved_opportunities')
      .insert({ user_id: user.id, opportunity_id: opportunityId })
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/saved')
  revalidatePath(`/dashboard/opportunities/${opportunityId}`)
}

export async function addNote(opportunityId: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const content = (formData.get('content') as string)?.trim()
  if (!content) return

  await supabase.from('opportunity_notes').insert({
    user_id: user.id,
    opportunity_id: opportunityId,
    content,
  })

  revalidatePath('/dashboard/saved')
  revalidatePath(`/dashboard/opportunities/${opportunityId}`)
}

export async function deleteNote(noteId: string, opportunityId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('opportunity_notes').delete().eq('id', noteId).eq('user_id', user.id)

  revalidatePath('/dashboard/saved')
  revalidatePath(`/dashboard/opportunities/${opportunityId}`)
}