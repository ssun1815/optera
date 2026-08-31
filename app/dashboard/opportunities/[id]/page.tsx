import { createClient } from '@/app/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { logout } from '../../actions'
import { toggleSaveOpportunity, updateNote } from '../../save-actions'
import { Header } from '@/app/components/Header'
import Link from 'next/link'

const STAGES = [
  { key: 'announced', label: 'ANNOUNCED' },
  { key: 'planning', label: 'PLANNING' },
  { key: 'design', label: 'DESIGN' },
  { key: 'permitting', label: 'PERMITTING' },
  { key: 'construction', label: 'CONSTRUCTION' },
  { key: 'completed', label: 'COMPLETED' },
]

function priorityLabel(score: number | null) {
  if (score === null) return null
  if (score >= 9) return { label: 'HIGH PRIORITY', color: 'bg-[var(--color-amber)]' }
  if (score >= 7) return { label: 'STRONG OPPORTUNITY', color: 'bg-[var(--color-navy-700)]' }
  return { label: 'POSSIBLE OPPORTUNITY', color: 'bg-[var(--color-ink)]/40' }
}

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

  const { data: organisations } = await supabase
    .from('opportunity_organisations')
    .select('*')
    .eq('opportunity_id', id)
    .order('investigation_priority', { ascending: true })

    const { data: savedRow } = await supabase
    .from('saved_opportunities')
    .select('opportunity_id, notes')
    .eq('user_id', user.id)
    .eq('opportunity_id', id)
    .maybeSingle()

  const isSaved = Boolean(savedRow)
  const priority = priorityLabel(opp.opportunity_score)
  const currentStageIndex = STAGES.findIndex((s) => s.key === opp.lifecycle_stage)

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

          {/* TOP SECTION */}
          <div className="mt-4 rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                {priority && (
                  <span className={`inline-block rounded px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] tracking-wider text-white ${priority.color}`}>
                    {priority.label}
                  </span>
                )}
                <h1 className="mt-2 text-2xl font-medium text-[var(--color-navy-900)]">
                  {opp.project_name}
                </h1>
                <p className="mt-1 text-sm text-[var(--color-ink)]/60">
                  {opp.location}
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink)]/60">
                  {opp.project_type} · {opp.project_stage}
                </p>
              </div>
              <div className="flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-full bg-[var(--color-navy-950)] font-[family-name:var(--font-mono)] text-[var(--color-amber-light)]">
                <span className="text-lg leading-none">{opp.opportunity_score}</span>
                <span className="text-[9px] leading-none text-[var(--color-off-white)]/50">/10</span>
              </div>
            </div>
                        <form action={toggleSaveOpportunity.bind(null, opp.id, isSaved)} className="mt-4">
              <button
                type="submit"
                className={`rounded-md border px-4 py-1.5 text-sm font-medium transition ${
                  isSaved
                    ? 'border-[var(--color-amber)] bg-[var(--color-amber)]/10 text-[var(--color-amber)]'
                    : 'border-[var(--color-navy-900)]/20 text-[var(--color-ink)] hover:bg-[var(--color-off-white-alt)]'
                }`}
              >
                {isSaved ? 'Saved' : 'Save Opportunity'}
              </button>
            </form>

            {isSaved && (
              <form action={updateNote.bind(null, opp.id)} className="mt-4 border-t border-[var(--color-navy-900)]/10 pt-4">
                <label htmlFor="notes" className="text-xs font-medium text-[var(--color-ink)]/50">
                  Your notes (private, only visible to you)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  defaultValue={savedRow?.notes ?? ''}
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
            )}
          </div>

          {/* WHY OPTRACE FLAGGED THIS */}
          <section className="mt-6 rounded-lg border border-[var(--color-navy-900)]/10 bg-white p-6">
            <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--color-amber)]">
              Why Optrace Flagged This
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]">
              {opp.reason_for_relevance}
            </p>
          </section>

          {/* RECOMMENDED ACTION */}
          {opp.recommended_action && (
            <section className="mt-6 rounded-lg border border-[var(--color-navy-900)]/10 bg-white p-6">
              <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--color-ink)]/50">
                Recommended Action
              </h2>
              <p className="mt-2 text-lg font-medium text-[var(--color-navy-900)]">
                {opp.recommended_action}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]/80">
                {opp.recommended_action_reason}
              </p>
            </section>
          )}

          {/* PROJECT SNAPSHOT */}
          <section className="mt-6 rounded-lg border border-[var(--color-navy-900)]/10 bg-white p-6">
            <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--color-ink)]/50">
              Project Snapshot
            </h2>
            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-[var(--color-ink)]/50">Company / Developer</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">{opp.company_or_developer || 'Not publicly available'}</dd>
              </div>
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
                <dt className="text-[var(--color-ink)]/50">Project Stage</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">{opp.project_stage || 'Not publicly available'}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-ink)]/50">Opportunity Score</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">{opp.opportunity_score} / 10</dd>
              </div>
            </dl>
            <div className="mt-4">
              <dt className="text-sm text-[var(--color-ink)]/50">Description</dt>
              <dd className="mt-1 text-sm leading-relaxed text-[var(--color-ink)]">{opp.project_description}</dd>
            </div>
          </section>

          {/* PROJECT TIMELINE */}
          <section className="mt-6 rounded-lg border border-[var(--color-navy-900)]/10 bg-white p-6">
            <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--color-ink)]/50">
              Project Timeline
            </h2>
            {currentStageIndex >= 0 ? (
              <>
                <div className="mt-6 flex items-center">
                  {STAGES.map((stage, i) => (
                    <div key={stage.key} className="flex flex-1 items-center last:flex-none">
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            i <= currentStageIndex ? 'bg-[var(--color-amber)]' : 'bg-[var(--color-navy-900)]/15'
                          }`}
                        />
                        <span
                          className={`mt-2 text-center font-[family-name:var(--font-mono)] text-[9px] tracking-wide ${
                            i === currentStageIndex ? 'font-bold text-[var(--color-navy-900)]' : 'text-[var(--color-ink)]/40'
                          }`}
                        >
                          {stage.label}
                        </span>
                        {i === currentStageIndex && (
                          <span className="mt-1 rounded bg-[var(--color-navy-950)] px-1.5 py-0.5 text-[8px] text-[var(--color-amber-light)]">
                            YOU ARE HERE
                          </span>
                        )}
                      </div>
                      {i < STAGES.length - 1 && (
                        <div className={`h-px flex-1 ${i < currentStageIndex ? 'bg-[var(--color-amber)]' : 'bg-[var(--color-navy-900)]/15'}`} />
                      )}
                    </div>
                  ))}
                </div>
                {opp.timing_assessment && (
                  <div className="mt-8 border-t border-[var(--color-navy-900)]/10 pt-4">
                    <p className="text-sm font-medium text-[var(--color-navy-900)]">
                      Optrace Timing Assessment: {opp.timing_assessment}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink)]/70">
                      {opp.timing_assessment_reason}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <p className="mt-3 text-sm text-[var(--color-ink)]/60">
                Not enough information is currently available to place this project on the lifecycle timeline.
              </p>
            )}
          </section>

          {/* ORGANISATIONS INVOLVED */}
          <section className="mt-6 rounded-lg border border-[var(--color-navy-900)]/10 bg-white p-6">
            <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--color-ink)]/50">
              Organisations Involved
            </h2>
            {organisations && organisations.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {organisations.map((org) => (
                  <li key={org.id} className="border-b border-[var(--color-navy-900)]/5 pb-3 last:border-0">
                    <p className="text-sm font-medium text-[var(--color-navy-900)]">
                      {org.company_name} <span className="font-normal text-[var(--color-ink)]/50">— {org.role}</span>
                    </p>
                    {org.source_note && (
                      <p className="mt-0.5 text-xs text-[var(--color-ink)]/50">{org.source_note}</p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-[var(--color-ink)]/60">Not yet publicly identified.</p>
            )}
          </section>

          {/* WHO TO APPROACH */}
          {organisations && organisations.length > 0 && (
            <section className="mt-6 rounded-lg border border-[var(--color-navy-900)]/10 bg-white p-6">
              <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--color-amber)]">
                Optrace Recommendation: Who to Approach
              </h2>
              <ol className="mt-4 space-y-4">
                {organisations.map((org, i) => (
                  <li key={org.id} className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-navy-950)] font-[family-name:var(--font-mono)] text-xs text-[var(--color-amber-light)]">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-[var(--color-navy-900)]">
                        {org.role} — {org.company_name}
                      </p>
                      <p className="mt-0.5 text-sm text-[var(--color-ink)]/70">{org.investigation_reason}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-xs italic text-[var(--color-ink)]/40">
                These rankings are Optrace's analysis based on available information and do not guarantee that contacting any organisation will result in a contract.
              </p>
            </section>
          )}

          {/* SOURCE */}
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