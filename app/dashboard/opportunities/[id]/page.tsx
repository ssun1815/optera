import { createClient } from '@/app/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { logout } from '../../actions'
import { Header } from '@/app/components/Header'
import Link from 'next/link'

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
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

  const { data: opp, error } = await supabase
    .from('opportunities')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error || !opp) {
    notFound()
  }

  const logoutButton = (
    <form action={logout}>
      <button type="submit" className="text-sm text-[var(--color-off-white)]/70 underline hover:text-[var(--color-off-white)]">
        Log out
      </button>
    </form>
  )

  return (
    <>
      <Header right={logoutButton} />
      <main className="min-h-screen bg-[var(--color-off-white)] px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <Link href="/dashboard" className="text-sm text-[var(--color-ink)]/60 hover:text-[var(--color-ink)]">
            &larr; Back to opportunities
          </Link>

          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-medium text-[var(--color-navy-900)]">
                {opp.project_name}
              </h1>
              <p className="mt-1 text-sm text-[var(--color-ink)]/60">
                {opp.location}
              </p>
            </div>
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-navy-950)] font-[family-name:var(--font-mono)] text-lg text-[var(--color-amber-light)]">
              {opp.opportunity_score}
            </div>
          </div>

          <section className="mt-8 rounded-lg border border-[var(--color-navy-900)]/10 bg-white p-6">
            <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--color-ink)]/50">
              Overview
            </h2>
            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-[var(--color-ink)]/50">Company / Developer</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">{opp.company_or_developer || 'Not publicly available'}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-ink)]/50">Project Type</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">{opp.project_type || 'Not publicly available'}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-ink)]/50">City / State</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">{opp.city}, {opp.state}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-ink)]/50">Project Stage</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">{opp.project_stage || 'Not publicly available'}</dd>
              </div>
            </dl>
            <div className="mt-4">
              <dt className="text-sm text-[var(--color-ink)]/50">Description</dt>
              <dd className="mt-1 text-sm leading-relaxed text-[var(--color-ink)]">{opp.project_description}</dd>
            </div>
          </section>

          <section className="mt-6 rounded-lg border border-[var(--color-navy-900)]/10 bg-white p-6">
            <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--color-ink)]/50">
              Project Details
            </h2>
            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-[var(--color-ink)]/50">Estimated Size</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">{opp.estimated_size || 'Not publicly available'}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-ink)]/50">Estimated Value</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">{opp.estimated_value || 'Not publicly available'}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-ink)]/50">Announcement Date</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">{opp.announcement_date || 'Not publicly available'}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-ink)]/50">Date Discovered</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">{opp.date_discovered || 'Not publicly available'}</dd>
              </div>
            </dl>
          </section>

          <section className="mt-6 rounded-lg border border-[var(--color-navy-900)]/10 bg-white p-6">
            <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--color-ink)]/50">
              Optera Analysis
            </h2>
            <div className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-[var(--color-ink)]/50">HVAC Relevance</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">{opp.hvac_relevance}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-ink)]/50">Reason for Relevance</dt>
                <dd className="mt-0.5 leading-relaxed text-[var(--color-ink)]">{opp.reason_for_relevance}</dd>
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-lg border border-[var(--color-navy-900)]/10 bg-white p-6">
            <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--color-ink)]/50">
              Source
            </h2>
            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-[var(--color-ink)]/50">Source</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">{opp.source_name}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-ink)]/50">Source Date</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">{opp.source_date || 'Not publicly available'}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[var(--color-ink)]/50">Source URL</dt>
                <dd className="mt-0.5">
                  {opp.source_url ? (
                    <a href={opp.source_url} target="_blank" rel="noopener noreferrer" className="break-all text-[var(--color-navy-900)] underline">
                      {opp.source_url}
                    </a>
                  ) : (
                    <span className="text-[var(--color-ink)]">Not publicly available</span>
                  )}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[var(--color-ink)]/50">Verification Status</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">{opp.verification_status}</dd>
              </div>
            </dl>
          </section>
        </div>
      </main>
    </>
  )
}