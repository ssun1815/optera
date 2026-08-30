'use server'

import { createClient } from '@/app/lib/supabase/server'
import { stripe } from '@/app/lib/stripe'
import { redirect } from 'next/navigation'

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function createCheckoutSession() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: user.email,
    line_items: [{ price: 'price_1U9rcT94VLhQsbbhaWnDvq9P', quantity: 1 }],
    discounts: [{ coupon: 'CHsgYo7K' }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
    metadata: {
      supabase_user_id: user.id,
    },
  })

  if (session.url) {
    redirect(session.url)
  }
}