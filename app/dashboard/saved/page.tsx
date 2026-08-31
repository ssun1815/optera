import { createClient } from '@/app/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Header } from '@/app/components/Header'
import { OpportunityCard } from '@/app/components/OpportunityCard'
import { logout } from '../actions'
import { updateNote } from '../save-actions'
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
    .select('opportunity_id, notes, opportunities(*)')
    .eq('user_id', user.id)

  const savedItems = (savedRows ?? [])
    .filter((row: any) => row.opportunities)
    .map((row: any) => ({ opportunity: row.opportunities, notes: row.notes as string | null }))

  const headerRight = (
    <div className="flex items-center gap-6">
      <Link href="/dashboard" className="text-sm text-[var(--color-off-white)]/70 hover:text-[var(--color-off-white)]">
        Opportunities
      </Link>
      <Link href="/dashboard/assistant" className="text-sm text-[var(--color-off-white)]/70 hover:text-[var(--color-off-white)]">
        Assistant
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

          {savedItems.length === 0 && (
            <p className="mt-8 text-sm text-[var(--color-ink)]/60">
              You haven't saved any opportunities yet. Click "Save" on any opportunity to bookmark it here.
            </p>
          )}

          <div className="mt-8 space-y-6">
            {savedItems.map(({ opportunity, notes }) => (
              <div key={opportunity.id}>
                <OpportunityCard opp={opportunity} isSaved={true} />
                <form action={updateNote.bind(null, opportunity.id)} className="mt-2 rounded-lg border border-[var(--color-navy-900)]/10 bg-white p-4">
                  <label htmlFor={`notes-${opportunity.id}`} className="text-xs font-medium text-[var(--color-ink)]/50">
                    Your notes (private, only visible to you)
                  </label>
                  <textarea
                    id={`notes-${opportunity.id}`}
                    name="notes"
                    defaultValue={notes ?? ''}
                    rows={2}
                    placeholder="e.g. Called the GC on 8/30, waiting on a callback about MEP bidding..."
                    className="mt-1 w-full rounded-md border border-[var(--color-navy-900)]/20 px-3 py-2 text-sm"
                  />
                  <button
                    type="submit"
                    className="mt-2 rounded-md bg-[var(--color-navy-900)] px-3 py-1 text-xs font-medium text-white hover:bg-[var(--color-navy-700)]"
                  >
                    Save note
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}