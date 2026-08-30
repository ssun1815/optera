import { createClient } from '@/app/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Header } from '@/app/components/Header'
import { OpportunityCard } from '@/app/components/OpportunityCard'
import { logout } from '../actions'
import Link from 'next/link'

export default async function SavedPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('status')
    .eq('user_id', user.id)
    .maybeSingle()

  if (subscription?.status !== 'active') {
    redirect('/dashboard')
  }

  const { data: savedRows } = await supabase
    .from('saved_opportunities')
    .select('opportunity_id, opportunities(*)')
    .eq('user_id', user.id)

  const savedOpportunities = (savedRows ?? [])
    .map((row: any) => row.opportunities)
    .filter(Boolean)

  const headerRight = (
    <div className="flex items-center gap-6">
      <Link href="/dashboard" className="text-sm text-[var(--color-off-white)]/70 hover:text-[var(--color-off-white)]">
        Opportunities
      </Link>
      <form action={logout}>
        <button type="submit" className="text-sm text-[var(--color-off-white)]/70 underline hover:text-[var(--color-off-white)]">
          Log out
        </button>
      </form>
    </div>
  )

  return (
    <>
      <Header right={headerRight} />
      <main className="min-h-screen bg-[var(--color-off-white)] px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-medium text-[var(--color-navy-900)]">Saved Opportunities</h1>

          {savedOpportunities.length === 0 && (
            <p className="mt-8 text-sm text-[var(--color-ink)]/60">
              You haven't saved any opportunities yet. Click "Save" on any opportunity to bookmark it here.
            </p>
          )}

          <div className="mt-8 space-y-4">
            {savedOpportunities.map((opp: any) => (
              <OpportunityCard key={opp.id} opp={opp} isSaved={true} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}