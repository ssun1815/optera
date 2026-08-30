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