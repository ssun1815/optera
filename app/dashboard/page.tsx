import { createClient } from '@/app/lib/supabase/server'
import { stripe } from '@/app/lib/stripe'
import { redirect } from 'next/navigation'
import { logout, createCheckoutSession } from './actions'
import { Header } from '@/app/components/Header'
import { OpportunityCard } from '@/app/components/OpportunityCard'
import Link from 'next/link'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{
    checkout?: string
    session_id?: string
    category?: string
    city?: string
    minScore?: string
    highPriorityOnly?: string
  }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const params = await searchParams

  if (params.checkout === 'success' && params.session_id) {
    const session = await stripe.checkout.sessions.retrieve(params.session_id)
    if (session.status === 'complete') {
      await supabase.from('subscriptions').upsert({
        user_id: user.id,
        stripe_customer_id:
          typeof session.customer === 'string' ? session.customer : session.customer?.id,
        stripe_subscription_id:
          typeof session.subscription === 'string' ? session.subscription : session.subscription?.id,
        status: 'active',
        updated_at: new Date().toISOString(),
      })
    }
  }

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('status')
    .eq('user_id', user.id)
    .maybeSingle()

  const isSubscribed = subscription?.status === 'active'
  const isAdmin = user.email === process.env.ADMIN_EMAIL

  const headerRight = (
    <div className="flex items-center gap-6">
      <Link href="/dashboard/assistant" className="text-sm text-[var(--color-off-white)]/70 hover:text-[var(--color-off-white)]">
        Assistant
      </Link>
      <Link href="/dashboard/saved" className="text-sm text-[var(--color-off-white)]/70 hover:text-[var(--color-off-white)]">
        Saved
      </Link>
      {isAdmin && (
        <Link href="/admin" className="text-sm text-[var(--color-off-white)]/70 hover:text-[var(--color-off-white)]">
          Admin
        </Link>
      )}
      <form action={logout}>
        <button type="submit" className="text-sm text-[var(--color-off-white)]/70 underline hover:text-[var(--color-off-white)]">
          Log out
        </button>
      </form>
    </div>
  )

  if (!isSubscribed) {
    return (
      <>
        <Header right={headerRight} />
        <main className="flex min-h-screen items-center justify-center bg-[var(--color-off-white)] px-6">
          <div className="w-full max-w-sm rounded-lg bg-white p-8 text-center shadow-sm">
            <h1 className="text-xl font-medium text-[var(--color-navy-900)]">
              Subscribe to view opportunities
            </h1>
            <p className="mt-2 text-sm text-[var(--color-ink)]/60">
              $99 for your first month, then $149/month. Cancel anytime.
            </p>
            <form action={createCheckoutSession} className="mt-6">
              <button
                type="submit"
                className="w-full rounded-md bg-[var(--color-amber)] px-4 py-2 text-sm font-medium text-[var(--color-navy-950)] hover:bg-[var(--color-amber-light)]"
              >
                Subscribe now
              </button>
            </form>
          </div>
        </main>
      </>
    )
  }

  const { data: savedRows } = await supabase
    .from('saved_opportunities')
    .select('opportunity_id')
    .eq('user_id', user.id)

  const savedIds = new Set(savedRows?.map((r) => r.opportunity_id))

  const { data: priorityOpps } = await supabase
    .from('opportunities')
    .select('*')
    .order('opportunity_score', { ascending: false })
    .limit(5)

  const category = params.category ?? ''
  const city = params.city ?? ''
  const highPriorityOnly = params.highPriorityOnly === 'true'
  const minScore = highPriorityOnly ? '9' : (params.minScore ?? '')

  const { data: cityRows } = await supabase.from('opportunities').select('city')
  const cities = Array.from(new Set(cityRows?.map((r) => r.city).filter(Boolean))).sort()

  let query = supabase
    .from('opportunities')
    .select('*')
    .order('opportunity_score', { ascending: false })

  if (category) query = query.ilike('project_type', `%${category}%`)
  if (city) query = query.eq('city', city)
  if (minScore) query = query.gte('opportunity_score', Number(minScore))

  const { data: opportunities, error } = await query

  const hasFilters = Boolean(category || city || params.minScore || highPriorityOnly)

  return (
    <>
      <Header right={headerRight} />
      <main className="min-h-screen bg-[var(--color-off-white)] px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <div>
            <p className="text-sm text-[var(--color-ink)]/60">Dallas-Fort Worth, Texas</p>
            <h1 className="mt-1 text-2xl font-medium text-[var(--color-navy-900)]">
              Here's what's happening in your market.
            </h1>
          </div>

          {priorityOpps && priorityOpps.length > 0 && (
            <section className="mt-10">
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">Priority for You</h2>
              <div className="mt-4 space-y-4">
                {priorityOpps.map((opp) => (
                  <OpportunityCard key={opp.id} opp={opp} isSaved={savedIds.has(opp.id)} />
                ))}
              </div>
            </section>
          )}

          <section className="mt-12">
            <h2 className="text-lg font-medium text-[var(--color-navy-900)]">Explore Opportunities</h2>

            <form method="GET" className="mt-4 flex flex-wrap items-end gap-4 rounded-lg border border-[var(--color-navy-900)]/10 bg-white p-4">
              <div>
                <label htmlFor="category" className="block text-xs text-[var(--color-ink)]/60">Category</label>
                <select id="category" name="category" defaultValue={category} className="mt-1 rounded-md border border-[var(--color-navy-900)]/20 px-2 py-1.5 text-sm">
                  <option value="">All categories</option>
                  <option value="Warehouse">Warehouses & Distribution</option>
                  <option value="Manufacturing">Manufacturing & Industrial</option>
                  <option value="Data Center">Data Centers</option>
                  <option value="Hotel">Hotels & Hospitality</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Office">Office Developments</option>
                </select>
              </div>
              <div>
                <label htmlFor="city" className="block text-xs text-[var(--color-ink)]/60">City</label>
                <select id="city" name="city" defaultValue={city} className="mt-1 rounded-md border border-[var(--color-navy-900)]/20 px-2 py-1.5 text-sm">
                  <option value="">All cities</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="minScore" className="block text-xs text-[var(--color-ink)]/60">Min. score</label>
                <select id="minScore" name="minScore" defaultValue={params.minScore ?? ''} disabled={highPriorityOnly} className="mt-1 rounded-md border border-[var(--color-navy-900)]/20 px-2 py-1.5 text-sm disabled:opacity-50">
                  <option value="">Any score</option>
                  <option value="9">9+</option>
                  <option value="8">8+</option>
                  <option value="7">7+</option>
                </select>
              </div>
              <label className="flex items-center gap-2 pb-2 text-sm text-[var(--color-ink)]">
                <input type="checkbox" name="highPriorityOnly" value="true" defaultChecked={highPriorityOnly} className="rounded" />
                High Priority Only
              </label>
              <button
                type="submit"
                className="rounded-md bg-[var(--color-navy-900)] px-4 py-1.5 text-sm font-medium text-[var(--color-off-white)] hover:bg-[var(--color-navy-700)]"
              >
                Apply
              </button>
              {hasFilters && (
                <Link href="/dashboard" className="text-sm text-[var(--color-ink)]/60 underline">
                  Clear filters
                </Link>
              )}
            </form>

            {error && (
              <p className="mt-8 text-sm text-red-700">
                Could not load opportunities: {error.message}
              </p>
            )}

            {!error && opportunities?.length === 0 && (
              <p className="mt-8 text-sm text-[var(--color-ink)]/60">
                No opportunities match those filters.
              </p>
            )}

            <div className="mt-6 space-y-4">
              {opportunities?.map((opp) => (
                <OpportunityCard key={opp.id} opp={opp} isSaved={savedIds.has(opp.id)} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}