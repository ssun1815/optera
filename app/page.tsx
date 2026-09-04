import Link from 'next/link'
import { Header } from '@/app/components/Header'
import { createAdminClient } from '@/app/lib/supabase/admin'

const STAGES = [
  { key: 'announced', label: 'ANNOUNCED' },
  { key: 'planning', label: 'PLANNING' },
  { key: 'design', label: 'DESIGN' },
  { key: 'permitting', label: 'PERMITTING' },
  { key: 'construction', label: 'CONSTRUCTION' },
  { key: 'completed', label: 'COMPLETED' },
]

// Mirrors the detail page's local priority badge exactly (app/dashboard/opportunities/[id]/page.tsx),
// not the shared chip from app/lib/opportunity-priority.ts — this section reuses that page's look verbatim.
function recordPriorityLabel(score: number | null) {
  if (score === null) return null
  if (score >= 9) return { label: 'HIGH PRIORITY', color: 'bg-[var(--color-amber)]' }
  if (score >= 7) return { label: 'STRONG OPPORTUNITY', color: 'bg-[var(--color-navy-700)]' }
  return { label: 'POSSIBLE OPPORTUNITY', color: 'bg-[var(--color-ink)]/40' }
}

function truncate(text: string, max: number) {
  if (text.length <= max) return text
  return `${text.slice(0, max).trimEnd()}…`
}

export default async function Home() {
  const supabase = createAdminClient()
  const { data: topOpportunities } = await supabase
    .from('opportunities')
    .select('*')
    .order('opportunity_score', { ascending: false })
    .limit(3)

  const heroPreview = topOpportunities ?? []
  const featured = topOpportunities?.[0] ?? null

  const { data: organisations } = featured
    ? await supabase
        .from('opportunity_organisations')
        .select('*')
        .eq('opportunity_id', featured.id)
        .order('investigation_priority', { ascending: true })
    : { data: null }

  const featuredPriority = featured ? recordPriorityLabel(featured.opportunity_score) : null
  const featuredStageIndex = featured ? STAGES.findIndex((s) => s.key === featured.lifecycle_stage) : -1
  const orgNames = (organisations ?? []).slice(0, 2).map((o) => o.company_name).filter(Boolean)

  const navRight = (
    <>
      <div className="hidden items-center gap-8 md:flex">
        <a href="#see-it-in-action" className="text-sm text-[var(--color-off-white)]/80 hover:text-[var(--color-off-white)]">
          See it in action
        </a>
        <a href="#what-we-track" className="text-sm text-[var(--color-off-white)]/80 hover:text-[var(--color-off-white)]">
          What we track
        </a>
        <a href="#pricing" className="text-sm text-[var(--color-off-white)]/80 hover:text-[var(--color-off-white)]">
          Pricing
        </a>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="text-sm text-[var(--color-off-white)]/80 hover:text-[var(--color-off-white)]"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="rounded-md bg-[var(--color-amber)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-amber-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-amber-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy-950)]"
        >
          Start now
        </Link>
      </div>
    </>
  )

  const trackItems = [
    {
      title: "Warehouses & Distribution",
      body: "Large-format logistics facilities with significant dock and mechanical needs.",
      points: ["Distribution centers", "Cold storage facilities", "Cross-dock terminals"],
      icon: (
        <>
          <polyline points="3,10 12,4 21,10" />
          <rect x="4" y="10" width="16" height="10" />
          <rect x="10" y="14" width="4" height="6" />
        </>
      ),
    },
    {
      title: "Manufacturing & Industrial",
      body: "Production and cleanroom facilities, often with specialized HVAC requirements.",
      points: ["Cleanroom manufacturing", "Heavy industrial plants", "Production expansions"],
      icon: (
        <>
          <rect x="3" y="12" width="18" height="8" />
          <polyline points="6,12 6,8 10,10 10,7 14,9 14,12" />
          <line x1="17" y1="12" x2="17" y2="6" />
          <circle cx="17" cy="5" r="1" fill="currentColor" stroke="none" />
        </>
      ),
    },
    {
      title: "Data Centers",
      body: "High-density compute facilities requiring intensive, precise cooling infrastructure.",
      points: ["Hyperscale campuses", "Colocation facilities", "Edge data centers"],
      icon: (
        <>
          <rect x="4" y="4" width="16" height="4" />
          <rect x="4" y="10" width="16" height="4" />
          <rect x="4" y="16" width="16" height="4" />
          <circle cx="7" cy="6" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="7" cy="12" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="7" cy="18" r="0.8" fill="currentColor" stroke="none" />
        </>
      ),
    },
    {
      title: "Hotels & Hospitality",
      body: "New-build and renovated properties with central plant and guest room HVAC needs.",
      points: ["Hotel developments", "Resort properties", "Convention centers"],
      icon: (
        <>
          <line x1="3" y1="19" x2="3" y2="9" />
          <line x1="21" y1="19" x2="21" y2="13" />
          <rect x="3" y="13" width="18" height="6" />
          <rect x="5" y="9" width="6" height="4" />
        </>
      ),
    },
    {
      title: "Healthcare Facilities",
      body: "Hospitals and clinical buildings with complex, mission-critical mechanical systems.",
      points: ["Hospitals", "Emergency care centers", "Medical office buildings"],
      icon: (
        <>
          <rect x="10" y="4" width="4" height="16" />
          <rect x="4" y="10" width="16" height="4" />
        </>
      ),
    },
    {
      title: "Office Developments",
      body: "New towers and major renovations with multi-tenant HVAC infrastructure.",
      points: ["Class A office towers", "Corporate campuses", "Major renovations"],
      icon: (
        <>
          <rect x="5" y="3" width="14" height="18" />
          <rect x="8" y="6" width="2" height="2" />
          <rect x="14" y="6" width="2" height="2" />
          <rect x="8" y="11" width="2" height="2" />
          <rect x="14" y="11" width="2" height="2" />
          <rect x="8" y="16" width="2" height="2" />
          <rect x="14" y="16" width="2" height="2" />
        </>
      ),
    },
  ]

  const intelligenceFeatures = featured
    ? [
        {
          title: "Opportunity Scoring",
          body: "Every opportunity receives a score from 1-10 based on facility type, scale, project stage, timing, and source credibility.",
          icon: (
            <>
              <path d="M4 18a8 8 0 1 1 16 0" />
              <line x1="12" y1="18" x2="16" y2="13" />
            </>
          ),
          example: (
            <span className="tabular-nums-feature inline-block rounded bg-slate-100 px-2.5 py-1 text-xs font-semibold text-[var(--color-ink)]">
              {featured.opportunity_score}/10
            </span>
          ),
        },
        {
          title: "Why It Matters",
          body: "Optrace explains, in plain language, why a specific project is relevant to a commercial HVAC contractor.",
          icon: (
            <>
              <path d="M4 5h16v10H10l-4 4v-4H4V5Z" />
            </>
          ),
          example: featured.reason_for_relevance ? (
            <p className="text-xs italic leading-relaxed text-[var(--color-slate-700)]">
              &ldquo;{truncate(featured.reason_for_relevance, 110)}&rdquo;
            </p>
          ) : null,
        },
        {
          title: "Project Timing",
          body: "Every opportunity is placed on a lifecycle: Announced, Planning, Design, Permitting, Construction.",
          icon: (
            <>
              <circle cx="12" cy="12" r="8" />
              <polyline points="12 7 12 12 16 14" />
            </>
          ),
          example: (
            <div className="flex items-center gap-1">
              {STAGES.slice(0, -1).map((stage, i) => (
                <span
                  key={stage.key}
                  className={`h-1.5 flex-1 rounded-full ${i <= featuredStageIndex ? 'bg-[var(--color-amber)]' : 'bg-slate-200'}`}
                />
              ))}
            </div>
          ),
        },
        {
          title: "Project Team Intelligence",
          body: "Where publicly available, Optrace identifies the developer, general contractor, and engineering firms involved.",
          icon: (
            <>
              <circle cx="8" cy="9" r="3" />
              <path d="M2.5 19c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" />
              <circle cx="17" cy="9" r="2.3" />
              <path d="M14.5 13.8c2.5.3 4.5 2.5 4.5 5.2" />
            </>
          ),
          example:
            orgNames.length > 0 ? (
              <p className="text-xs font-medium text-[var(--color-slate-700)]">{orgNames.join(' · ')}</p>
            ) : (
              <p className="text-xs text-[var(--color-slate-500)]">Not yet publicly identified.</p>
            ),
        },
        {
          title: "Recommended Action",
          body: "Optrace recommends what to do next: investigate now, research the project team, identify key organisations, or monitor.",
          icon: (
            <>
              <line x1="5" y1="21" x2="5" y2="4" />
              <path d="M5 5h13l-3 4 3 4H5" />
            </>
          ),
          example: featured.recommended_action ? (
            <span className="inline-block rounded bg-[var(--color-navy-900)] px-2.5 py-1 text-xs font-medium text-white">
              {featured.recommended_action}
            </span>
          ) : null,
        },
      ]
    : []

  const faqs = [
    {
      q: "Why is the first month different?",
      a: "The $99 first month is an introductory offer designed to make it easy to try Optrace and see the value before committing to the standard rate.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. There's no long-term contract. Cancel from your account at any time and you won't be billed again.",
    },
    {
      q: "How is my payment handled?",
      a: "All payments are processed securely by Stripe. Optrace never stores your full card details.",
    },
    {
      q: "How often is the database updated?",
      a: "New opportunities are researched and added on an ongoing basis as they're identified and verified.",
    },
  ]

  return (
    <main>
      <Header right={navRight} />

      <section className="relative overflow-hidden bg-[var(--color-navy-950)] bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]">
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pt-20 pb-24 md:grid-cols-2 md:items-center md:pt-28 md:pb-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-amber-light)]">
              Commercial Opportunity Intelligence · Dallas-Fort Worth
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-serif)] text-4xl italic leading-tight text-[var(--color-off-white)] md:text-5xl">
              Know which commercial projects are actually worth pursuing.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-off-white)]/70">
              Optrace doesn&apos;t just find construction projects in DFW - it scores every
              opportunity, explains why it matters to a commercial HVAC contractor, and tells
              you what to investigate next.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="rounded-md bg-[var(--color-amber)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-amber-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-amber-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy-950)]"
              >
                Start your first month - $99
              </Link>
              <a
                href="#see-it-in-action"
                className="rounded-md border border-[var(--color-off-white)]/20 px-6 py-3 text-sm font-medium text-[var(--color-off-white)] transition hover:border-[var(--color-off-white)]/40"
              >
                See it in action
              </a>
            </div>
          </div>

          <div className="relative md:justify-self-end md:max-w-md">
            <div
              className="absolute -bottom-3 -right-3 h-full w-full rounded-md border border-[var(--color-border)] bg-white opacity-50"
              aria-hidden="true"
            />

            <div className="relative rounded-md border border-[var(--color-border)] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
              <div className="flex items-center gap-1.5 rounded-t-md border-b border-[var(--color-border)] bg-slate-50 px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                <span className="ml-2 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-slate-500)]">
                  optrace.com/dashboard
                </span>
              </div>

              <div className="divide-y divide-[var(--color-border)]">
                {heroPreview.map((opp) => (
                  <div key={opp.id} className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-[var(--color-ink)]">{opp.project_name}</p>
                      <span className="tabular-nums-feature flex-shrink-0 rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-[var(--color-ink)]">
                        {opp.opportunity_score}/10
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[var(--color-slate-500)]">
                      {opp.city}, {opp.state} · {opp.project_type} · {opp.project_stage}
                    </p>
                    {opp.reason_for_relevance && (
                      <p className="mt-1.5 text-xs italic leading-relaxed text-[var(--color-slate-500)]">
                        &ldquo;{truncate(opp.reason_for_relevance, 90)}&rdquo;
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {featured && (
        <section id="see-it-in-action" className="bg-[var(--color-off-white-alt)] py-24">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-amber)]">
                See Optrace in Action
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[var(--color-navy-900)] md:text-3xl">
                This is what you actually get.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base text-[var(--color-slate-500)]">
                Not a project listing. A complete intelligence record - built from public
                information, verified, scored, and interpreted specifically for HVAC relevance.
              </p>
            </div>

            <div className="mt-10">
              {/* TOP SECTION - reused from app/dashboard/opportunities/[id]/page.tsx, Save button omitted */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {featuredPriority && (
                      <span className={`inline-block rounded px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] tracking-wider text-white ${featuredPriority.color}`}>
                        {featuredPriority.label}
                      </span>
                    )}
                    <h3 className="mt-2 text-2xl font-medium text-[var(--color-navy-900)]">
                      {featured.project_name}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--color-ink)]/60">
                      {featured.location}
                    </p>
                    <p className="mt-1 text-sm text-[var(--color-ink)]/60">
                      {featured.project_type} · {featured.project_stage}
                    </p>
                  </div>
                  <div className="flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-full bg-[var(--color-navy-950)] font-[family-name:var(--font-mono)] text-[var(--color-amber-light)]">
                    <span className="text-lg leading-none">{featured.opportunity_score}</span>
                    <span className="text-[9px] leading-none text-[var(--color-off-white)]/50">/10</span>
                  </div>
                </div>
              </div>

              {/* WHY OPTRACE FLAGGED THIS */}
              <section className="mt-6 rounded-lg border border-[var(--color-navy-900)]/10 bg-white p-6">
                <h3 className="text-sm font-medium uppercase tracking-wide text-[var(--color-amber)]">
                  Why Optrace Flagged This
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]">
                  {featured.reason_for_relevance}
                </p>
              </section>

              {/* RECOMMENDED ACTION */}
              {featured.recommended_action && (
                <section className="mt-6 rounded-lg border border-[var(--color-navy-900)]/10 bg-white p-6">
                  <h3 className="text-sm font-medium uppercase tracking-wide text-[var(--color-ink)]/50">
                    Recommended Action
                  </h3>
                  <p className="mt-2 text-lg font-medium text-[var(--color-navy-900)]">
                    {featured.recommended_action}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]/80">
                    {featured.recommended_action_reason}
                  </p>
                </section>
              )}

              {/* PROJECT TIMELINE */}
              <section className="mt-6 rounded-lg border border-[var(--color-navy-900)]/10 bg-white p-6">
                <h3 className="text-sm font-medium uppercase tracking-wide text-[var(--color-ink)]/50">
                  Project Timeline
                </h3>
                {featuredStageIndex >= 0 ? (
                  <>
                    <div className="mt-6 flex items-center">
                      {STAGES.map((stage, i) => (
                        <div key={stage.key} className="flex flex-1 items-center last:flex-none">
                          <div className="flex flex-col items-center">
                            <div
                              className={`h-3 w-3 rounded-full ${
                                i <= featuredStageIndex ? 'bg-[var(--color-amber)]' : 'bg-[var(--color-navy-900)]/15'
                              }`}
                            />
                            <span
                              className={`mt-2 text-center font-[family-name:var(--font-mono)] text-[9px] tracking-wide ${
                                i === featuredStageIndex ? 'font-bold text-[var(--color-navy-900)]' : 'text-[var(--color-ink)]/40'
                              }`}
                            >
                              {stage.label}
                            </span>
                            {i === featuredStageIndex && (
                              <span className="mt-1 rounded bg-[var(--color-navy-950)] px-1.5 py-0.5 text-[8px] text-[var(--color-amber-light)]">
                                YOU ARE HERE
                              </span>
                            )}
                          </div>
                          {i < STAGES.length - 1 && (
                            <div className={`h-px flex-1 ${i < featuredStageIndex ? 'bg-[var(--color-amber)]' : 'bg-[var(--color-navy-900)]/15'}`} />
                          )}
                        </div>
                      ))}
                    </div>
                    {featured.timing_assessment && (
                      <div className="mt-8 border-t border-[var(--color-navy-900)]/10 pt-4">
                        <p className="text-sm font-medium text-[var(--color-navy-900)]">
                          Optrace Timing Assessment: {featured.timing_assessment}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink)]/70">
                          {featured.timing_assessment_reason}
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
                <h3 className="text-sm font-medium uppercase tracking-wide text-[var(--color-ink)]/50">
                  Organisations Involved
                </h3>
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
                  <h3 className="text-sm font-medium uppercase tracking-wide text-[var(--color-amber)]">
                    Optrace Recommendation: Who to Approach
                  </h3>
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
                    These rankings are Optrace&apos;s analysis based on available information and do not
                    guarantee that contacting any organisation will result in a contract.
                  </p>
                </section>
              )}

              {/* SOURCE */}
              <section className="mt-6 rounded-lg border border-[var(--color-navy-900)]/10 bg-white p-6">
                <h3 className="text-sm font-medium uppercase tracking-wide text-[var(--color-ink)]/50">
                  Source
                </h3>
                <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-[var(--color-ink)]/50">Source</dt>
                    <dd className="mt-0.5 text-[var(--color-ink)]">{featured.source_name}</dd>
                  </div>
                  <div>
                    <dt className="text-[var(--color-ink)]/50">Source Date</dt>
                    <dd className="mt-0.5 text-[var(--color-ink)]">{featured.source_date || 'Not publicly available'}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-[var(--color-ink)]/50">Source URL</dt>
                    <dd className="mt-0.5">
                      {featured.source_url ? (
                        <a href={featured.source_url} target="_blank" rel="noopener noreferrer" className="break-all text-[var(--color-navy-900)] underline">
                          {featured.source_url}
                        </a>
                      ) : (
                        <span className="text-[var(--color-ink)]">Not publicly available</span>
                      )}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-[var(--color-ink)]/50">Verification Status</dt>
                    <dd className="mt-0.5 text-[var(--color-ink)]">{featured.verification_status}</dd>
                  </div>
                </dl>
              </section>
            </div>

            <p className="mt-6 text-center text-xs italic text-[var(--color-slate-500)]">
              This is a real, current opportunity in the Optrace database - not a mockup.
            </p>
          </div>
        </section>
      )}

      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold text-[var(--color-navy-900)]">
            What Optrace actually gives you
          </h2>
          <p className="mt-2 max-w-lg text-base text-[var(--color-slate-500)]">
            The information exists publicly. Finding it, verifying it, and figuring out whether
            it matters to your business is the part that takes hours.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-off-white-alt)] p-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-slate-500)]">
                Without Optrace
              </h3>
              <ol className="mt-4 space-y-3">
                {[
                  "Search dozens of sources",
                  "Find a project that might be relevant",
                  "Read multiple articles to understand it",
                  "Work out if it's actually worth your time",
                  "Research who's involved",
                  "Decide who's worth contacting",
                  "Decide whether to pursue it",
                ].map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-[var(--color-slate-500)]">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 text-[10px] font-semibold text-[var(--color-slate-700)]">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-md border border-[var(--color-amber)]/20 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-amber)]">
                With Optrace
              </h3>
              <ol className="mt-4 space-y-3">
                {[
                  "Relevant opportunity identified",
                  "Scored for HVAC relevance",
                  "Why it matters, explained",
                  "Stage and timing assessed",
                  "Organisations identified",
                  "Recommended action provided",
                  "Ready to review in your dashboard",
                ].map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-[var(--color-ink)]">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-amber)] text-[10px] font-semibold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-off-white-alt)] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold text-[var(--color-navy-900)]">
            Optrace isn&apos;t another database.
          </h2>
          <p className="mt-2 max-w-lg text-base text-[var(--color-slate-500)]">
            Databases give you information. Optrace interprets it.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { before: "A database gives you names.", after: "Optrace gives you context." },
              { before: "A database gives you projects.", after: "Optrace tells you which ones may be worth pursuing." },
              { before: "A database gives you information.", after: "Optrace turns it into intelligence." },
            ].map((item) => (
              <div
                key={item.before}
                className="rounded-md border border-[var(--color-border)] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded border border-slate-200 bg-slate-100 text-[var(--color-slate-500)]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <ellipse cx="12" cy="5" rx="7" ry="2.5" />
                      <path d="M5 5v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5" />
                      <path d="M5 11v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-slate-500)]">
                    Database
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-slate-500)]">{item.before}</p>

                <div className="my-4 flex items-center gap-2" aria-hidden="true">
                  <span className="h-px flex-1 bg-[var(--color-border)]" />
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0 text-[var(--color-amber)]"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  <span className="h-px flex-1 bg-[var(--color-border)]" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded border border-blue-100 bg-blue-50 text-[var(--color-amber)]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-amber)]">
                    Optrace
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-[var(--color-amber)]">{item.after}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {intelligenceFeatures.length > 0 && (
        <section className="bg-white py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-semibold text-[var(--color-navy-900)]">
              Intelligence Features
            </h2>
            <p className="mt-2 max-w-lg text-base text-[var(--color-slate-500)]">
              Every example below is pulled live from the same real opportunity shown above.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {intelligenceFeatures.map((item) => (
                <div
                  key={item.title}
                  className="rounded-md border border-[var(--color-border)] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded border border-blue-100 bg-blue-50 text-[var(--color-amber)]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        {item.icon}
                      </svg>
                    </div>
                    <h3 className="text-sm font-medium text-[var(--color-navy-900)]">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-slate-500)]">{item.body}</p>
                  {item.example && (
                    <div className="mt-4 border-t border-[var(--color-border)] pt-4">
                      {item.example}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="what-we-track" className="bg-[var(--color-off-white-alt)] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold text-[var(--color-navy-900)]">
            What we track
          </h2>
          <p className="mt-2 max-w-lg text-sm text-[var(--color-slate-500)]">
            Six categories of commercial and industrial development, each scored specifically for HVAC relevance.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {trackItems.map((item) => (
              <div
                key={item.title}
                className="rounded-md border border-[var(--color-border)] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded border border-blue-100 bg-blue-50 text-[var(--color-amber)]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium text-[var(--color-navy-900)]">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-slate-500)]">{item.body}</p>
                <div className="mt-4 space-y-1.5 border-t border-[var(--color-border)] pt-4">
                  {item.points.map((point) => (
                    <div key={point} className="flex items-center gap-2 text-xs text-[var(--color-slate-700)]">
                      <svg className="h-3 w-3 flex-shrink-0 text-[var(--color-amber)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-2xl font-semibold text-[var(--color-navy-900)]">
          Transparent Pricing
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-start">
          <div className="rounded-md border border-[var(--color-border)] bg-white p-8 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
            <p className="tabular-nums-feature text-4xl font-semibold text-[var(--color-navy-900)]">
              $99
              <span className="text-base font-normal text-[var(--color-slate-500)]"> first month</span>
            </p>
            <p className="mt-1 text-sm text-[var(--color-slate-500)]">
              then $149/month
            </p>
            <ul className="mt-6 space-y-3 text-sm text-[var(--color-slate-700)]">
              {[
                "Commercial opportunity intelligence for the DFW market",
                "Every opportunity scored, explained, and prioritised",
                "Recommended next action on every project",
                "Cancel anytime, no long-term contract",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-navy-700)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="mt-8 block rounded-md bg-[var(--color-amber)] px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-[var(--color-amber-light)]"
            >
              Get started
            </Link>
            <p className="mt-4 text-center text-xs text-[var(--color-slate-500)]">
              Billed monthly via Stripe · Cancel anytime · Instant DFW database access
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((item) => (
              <div key={item.q} className="border-b border-[var(--color-border)] pb-6 last:border-0">
                <h3 className="text-sm font-medium text-[var(--color-navy-900)]">{item.q}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-slate-700)]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-navy-950)] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-[family-name:var(--font-serif)] text-3xl italic leading-snug text-[var(--color-off-white)] md:text-4xl">
            Stop searching for projects. Start knowing which ones are worth pursuing.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-md bg-[var(--color-amber)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-amber-light)]"
            >
              Start your first month - $99
            </Link>
            <Link
              href="/login"
              className="rounded-md border border-[var(--color-off-white)]/20 px-6 py-3 text-sm font-medium text-[var(--color-off-white)] transition hover:border-[var(--color-off-white)]/40"
            >
              Log in
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[var(--color-navy-950)] py-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-[family-name:var(--font-mono)] text-sm tracking-widest text-[var(--color-off-white)]">
            OPTRACE
          </p>
          <p className="mt-3 max-w-md text-xs leading-relaxed text-[var(--color-off-white)]/50">
            Optrace provides researched commercial opportunity intelligence for
            Dallas-Fort Worth HVAC contractors. It does not guarantee
            contracts, sales, or leads.
          </p>
          <div className="mt-6 flex items-center gap-4 text-xs text-[var(--color-off-white)]/50">
            <Link href="/terms" className="hover:text-[var(--color-off-white)]">Terms of Service</Link>
            <span>·</span>
            <Link href="/privacy" className="hover:text-[var(--color-off-white)]">Privacy Policy</Link>
          </div>
          <p className="mt-6 text-xs text-[var(--color-off-white)]/30">
            (c) 2026 Optrace.
          </p>
        </div>
      </footer>
    </main>
  )
}
