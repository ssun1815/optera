'use server'

import { createClient } from '@/app/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get('email') as string
  const supabase = await createClient()

  await supabase.auth.resetPasswordForEmail(email)

  redirect('/forgot-password/check-email')
}