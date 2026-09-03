import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/app/lib/stripe'
import { createAdminClient } from '@/app/lib/supabase/admin'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    console.error('Stripe webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createAdminClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.supabase_user_id

      if (!userId) {
        console.error('checkout.session.completed missing metadata.supabase_user_id:', session.id)
        break
      }

      const { error } = await supabase.from('subscriptions').upsert({
        user_id: userId,
        stripe_customer_id:
          typeof session.customer === 'string' ? session.customer : session.customer?.id,
        stripe_subscription_id:
          typeof session.subscription === 'string' ? session.subscription : session.subscription?.id,
        status: 'active',
        updated_at: new Date().toISOString(),
      })

      if (error) {
        console.error('Failed to upsert subscription on checkout.session.completed:', error)
      }
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription

      const { error } = await supabase
        .from('subscriptions')
        .update({
          status: subscription.status,
          updated_at: new Date().toISOString(),
        })
        .eq('stripe_subscription_id', subscription.id)

      if (error) {
        console.error('Failed to update subscription on customer.subscription.updated:', error)
      }
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription

      const { error } = await supabase
        .from('subscriptions')
        .update({
          status: 'canceled',
          updated_at: new Date().toISOString(),
        })
        .eq('stripe_subscription_id', subscription.id)

      if (error) {
        console.error('Failed to update subscription on customer.subscription.deleted:', error)
      }
      break
    }

    default:
      // Unhandled event type - acknowledge with 200 so Stripe doesn't retry forever.
      break
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
