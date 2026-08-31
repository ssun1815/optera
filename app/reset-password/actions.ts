'use server'

import { createClient } from '@/app/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function updatePassword(formData: FormData) {
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    redirect(`/reset-password?error=${encodeURIComponent('Passwords do not match.')}`)
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/login?error=${encodeURIComponent('Your reset link expired. Please request a new one.')}`)
  }

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    redirect(`/reset-password?error=${encodeURIComponent(error.message)}`)
  }

  redirect('/dashboard')
}