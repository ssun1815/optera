import { createClient } from '@/app/lib/supabase/server'
import { createAdminClient } from '@/app/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { Header } from '@/app/components/Header'
import Link from 'next/link'
import { runDiscovery, approveCandidate, rejectCandidate } from './actions'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect('/dashboard')
  }

  const admin = createAdminClient()
  const { data: candidates } = await admin
    .from('opportunity_candidates')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  const headerRight = (
    <Link href="/dashboard" className="text-sm text-[var(--color-off-white)]/70 hover:text-[var(--color-off-white)]">
      View Dashboard
    </Link>
  )

  return (
    <>
      <Header right={headerRight} />
      <main className="min-h-screen bg-[var(--color-off-white)] px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium text-[var(--color-navy-900)]">
              Opportunity Review
            </h1>
            <form action={runDiscovery}>
              <button
                type="submit"
                className="rounded-md bg-[var(--color-amber)] px-4 py-2 text-sm font-medium text-[var(--color-navy-950)] hover:bg-[var(--color-amber-light)]"
              >
                Run Discovery
              </button>
            </form>
          </div>
          <p className="mt-1 text-sm text-[var(--color-ink)]/60">
            AI-drafted candidates awaiting your review. Nothing here is visible to customers until approved.
          </p>

          {(!candidates || candidates.length === 0) && (
            <p className="mt-8 text-sm text-[var(--color-ink)]/60">
              No pending candidates. Click Run Discovery to search for new ones.
            </p>
          )}

          <div className="mt-8 space-y-6">
            {candidates?.map((c) => (
              <div key={c.id} className="rounded-lg border border-[var(--color-navy-900)]/10 bg-white p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-medium text-[var(--color-navy-900)]">
                      {c.project_name || 'Untitled'}
                    </h2>
                    <p className="mt-1 text-sm text-[var(--color-ink)]/60">
                      {c.city}, {c.state} - {c.project_type}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-navy-950)] font-[family-name:var(--font-mono)] text-sm text-[var(--color-amber-light)]">
                    {c.opportunity_score ?? '-'}
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]/80">
                  {c.project_description}
                </p>

                <dl className="mt-4 grid grid-cols-2 gap-3 text-xs text-[var(--color-ink)]/70">
                  <div><dt className="text-[var(--color-ink)]/40">Company</dt><dd>{c.company_or_developer}</dd></div>
                  <div><dt className="text-[var(--color-ink)]/40">Stage</dt><dd>{c.project_stage}</dd></div>
                  <div><dt className="text-[var(--color-ink)]/40">Size</dt><dd>{c.estimated_size}</dd></div>
                  <div><dt className="text-[var(--color-ink)]/40">Value</dt><dd>{c.estimated_value}</dd></div>
                  <div className="col-span-2">
                    <dt className="text-[var(--color-ink)]/40">Reason for relevance</dt>
                    <dd>{c.reason_for_relevance}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-[var(--color-ink)]/40">Source</dt>
                    <dd>
                      {c.source_name} -{' '}
                      {c.source_url ? (
                        <a href={c.source_url} target="_blank" rel="noopener noreferrer" className="break-all text-[var(--color-navy-900)] underline">
                          {c.source_url}
                        </a>
                      ) : 'Not publicly available'}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-[var(--color-ink)]/40">Verification status</dt>
                    <dd>{c.verification_status}</dd>
                  </div>
                </dl>

                <div className="mt-4 flex gap-3">
                  <form action={approveCandidate.bind(null, c.id)}>
                    <button type="submit" className="rounded-md bg-[var(--color-navy-900)] px-4 py-1.5 text-sm font-medium text-white hover:bg-[var(--color-navy-700)]">
                      Approve and Publish
                    </button>
                  </form>
                  <form action={rejectCandidate.bind(null, c.id)}>
                    <button type="submit" className="rounded-md border border-[var(--color-navy-900)]/20 px-4 py-1.5 text-sm text-[var(--color-ink)] hover:bg-[var(--color-off-white-alt)]">
                      Reject
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}