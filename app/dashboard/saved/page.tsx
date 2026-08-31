import { createClient } from '@/app/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Header } from '@/app/components/Header'
import { OpportunityCard } from '@/app/components/OpportunityCard'
import { NotesLog } from '@/app/components/NotesLog'
import { FloatingAssistantButton } from '@/app/components/FloatingAssistantButton'
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

  const savedItems = (savedRows ?? [])
    .filter((row: any) => row.opportunities)
    .map((row: any) => row.opportunities)

  const { data: allNotes } = await supabase
    .from('opportunity_notes')
    .select('id, opportunity_id, content, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const notesByOpportunity = new Map<string, { id: string; content: string; created_at: string }[]>()
  for (const note of allNotes ?? []) {
    const list = notesByOpportunity.get(note.opportunity_id) ?? []
    list.push(note)
    notesByOpportunity.set(note.opportunity_id, list)
  }

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
          <Link href="/dashboard" className="text-sm text-[var(--color-ink)]/60 hover:text-[var(--color-ink)]">
            &larr; Back to opportunities
          </Link>
          <h1 className="mt-4 text-2xl font-medium text-[var(--color-navy-900)]">Saved Opportunities</h1>

          {savedItems.length === 0 && (
            <p className="mt-8 text-sm text-[var(--color-ink)]/60">
              You haven't saved any opportunities yet. Click "Save" on any opportunity to bookmark it here.
            </p>
          )}

          <div className="mt-8 space-y-6">
            {savedItems.map((opportunity: any) => (
              <div key={opportunity.id} className="space-y-2">
                <OpportunityCard opp={opportunity} isSaved={true} />
                <NotesLog opportunityId={opportunity.id} notes={notesByOpportunity.get(opportunity.id) ?? []} />
              </div>
            ))}
          </div>
        </div>
      </main>
      <FloatingAssistantButton />
    </>
  )
}