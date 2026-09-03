import Link from 'next/link'
import { Header } from '@/app/components/Header'
import { createAdminClient } from '@/app/lib/supabase/admin'
import { priorityLabel } from '@/app/lib/opportunity-priority'

export default async function Home() {
  const supabase = createAdminClient()
  const { data: previewData } = await supabase
    .from('opportunities')
    .select('id, project_name, city, state, project_type, opportunity_score, reason_for_relevance, recommended_action')
    .order('opportunity_score', { ascending: false })
    .limit(2)

  const livePreviewOpportunities = previewData ?? []

  const navRight = (
    <>
      <div className="hidden items-center gap-8 md:flex">
        <a href="#how-it-works" className="text-sm text-[var(--color-off-white)]/80 hover:text-[var(--color-off-white)]">
          How it works
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

  const previewOpportunities = [
    { name: "Circle T Data Center", location: "Westlake, TX", type: "Data Center", score: "9/10", stage: "Site plans approved" },
    { name: "ACS Group Fort Worth Campus", location: "Fort Worth, TX", type: "Data Center", score: "9/10", stage: "Under construction" },
    { name: "IAC Pleasant Run", location: "Lancaster, TX", type: "Warehouse", score: "7/10", stage: "Under construction" },
  ]

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
              Dallas-Fort Worth · Commercial HVAC
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-serif)] text-4xl italic leading-tight text-[var(--color-off-white)] md:text-5xl">
              Find commercial opportunities before your competitors.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-off-white)]/70">
              Optrace tracks new commercial and industrial developments across
              DFW - warehouses, distribution centers, data centers, hotels,
              and more - and turns public signals into a curated list of HVAC
              opportunities worth your time.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="rounded-md bg-[var(--color-amber)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-amber-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-amber-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy-950)]"
              >
                Start your first month - $99
              </Link>
              <a
                href="#how-it-works"
                className="rounded-md border border-[var(--color-off-white)]/20 px-6 py-3 text-sm font-medium text-[var(--color-off-white)] transition hover:border-[var(--color-off-white)]/40"
              >
                See how it works
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
                {previewOpportunities.map((opp) => (
                  <div key={opp.name} className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-[var(--color-ink)]">{opp.name}</p>
                      <span className="tabular-nums-feature rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-[var(--color-ink)]">
                        {opp.score}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[var(--color-slate-500)]">
                      {opp.location} · {opp.type} · {opp.stage}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-[var(--color-navy-900)]">
          How Optrace works
        </h2>
        <div className="relative mt-10 grid gap-6 md:grid-cols-3">
          <div
            className="pointer-events-none absolute inset-x-0 top-10 hidden h-px bg-[var(--color-border)] md:block"
            aria-hidden="true"
          />
          {[
            {
              title: "Detect",
              body: "We monitor construction news, development announcements, and public project information across DFW every day.",
              icon: (
                <>
                  <circle cx="10" cy="10" r="6" />
                  <line x1="14.5" y1="14.5" x2="20" y2="20" />
                </>
              ),
            },
            {
              title: "Verify and score",
              body: "Every opportunity is checked against credible public sources and scored 1 to 10 for HVAC relevance.",
              icon: (
                <>
                  <circle cx="12" cy="12" r="8" />
                  <polyline points="8.5 12.5 11 15 16 9" />
                </>
              ),
            },
            {
              title: "Deliver",
              body: "Curated, verified opportunities land in your dashboard - no noise, no manual searching.",
              icon: (
                <>
                  <polyline points="4 14 4 19 20 19 20 14" />
                  <line x1="12" y1="4" x2="12" y2="14" />
                  <polyline points="8 10 12 14 16 10" />
                </>
              ),
            },
          ].map((item) => (
            <div key={item.title} className="relative rounded-md border border-[var(--color-border)] bg-white p-6">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded border border-blue-100 bg-blue-50 text-[var(--color-amber)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {item.icon}
                </svg>
              </div>
              <h3 className="mt-2 text-lg font-medium text-[var(--color-navy-900)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-slate-700)]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {livePreviewOpportunities.length > 0 && (
        <section className="bg-white pt-16 pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-semibold text-[var(--color-navy-900)]">
              Real opportunities, right now
            </h2>
            <p className="mt-2 max-w-lg text-base text-[var(--color-slate-500)]">
              These are live opportunities pulled from the Optrace database today - not
              examples. Subscribers get the full, continuously updated list.
            </p>

            <div className="relative mt-10 overflow-hidden">
              <div className="grid gap-5 md:grid-cols-2">
                {livePreviewOpportunities.map((opp) => {
                  const priority = priorityLabel(opp.opportunity_score)
                  return (
                    <div
                      key={opp.id}
                      className="flex h-full flex-col rounded-md border border-[var(--color-border)] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          {priority && (
                            <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${priority.className}`}>
                              {priority.label}
                            </span>
                          )}
                          <h3 className="mt-2 text-lg font-medium text-[var(--color-navy-900)]">
                            {opp.project_name}
                          </h3>
                          <p className="mt-1 text-sm text-[var(--color-slate-500)]">
                            {opp.city}, {opp.state} · {opp.project_type}
                          </p>
                        </div>
                        <div className="flex-shrink-0 rounded border border-[var(--color-border)] bg-slate-50 px-2.5 py-1.5 text-center">
                          <div className="tabular-nums-feature text-base font-semibold leading-none text-[var(--color-ink)]">
                            {opp.opportunity_score}
                          </div>
                          <div className="mt-0.5 text-[9px] uppercase tracking-wide text-[var(--color-slate-500)]">/10</div>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--color-slate-700)]">
                        {opp.reason_for_relevance}
                      </p>
                      {opp.recommended_action && (
                        <div className="mt-auto border-t border-[var(--color-border)] pt-4">
                          <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-slate-500)]">
                            Recommended action
                          </span>
                          <p className="mt-1 text-sm text-[var(--color-slate-700)]">
                            {opp.recommended_action}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}

                <div
                  className="hidden rounded-md border border-[var(--color-border)] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.05)] md:block"
                  aria-hidden="true"
                >
                  <div className="h-4 w-24 rounded bg-slate-100" />
                  <div className="mt-3 h-5 w-2/3 rounded bg-slate-100" />
                  <div className="mt-2 h-4 w-1/2 rounded bg-slate-100" />
                </div>
                <div
                  className="hidden rounded-md border border-[var(--color-border)] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.05)] md:block"
                  aria-hidden="true"
                >
                  <div className="h-4 w-24 rounded bg-slate-100" />
                  <div className="mt-3 h-5 w-2/3 rounded bg-slate-100" />
                  <div className="mt-2 h-4 w-1/2 rounded bg-slate-100" />
                </div>
              </div>

              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent"
                aria-hidden="true"
              />
            </div>

            <div className="mt-4 flex flex-col items-center text-center">
              <Link
                href="/signup"
                className="rounded-md bg-[var(--color-amber)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-amber-light)]"
              >
                Subscribe to see all opportunities
              </Link>
              <p className="mt-4 max-w-md text-xs text-[var(--color-slate-500)]">
                Optrace is an independent research service. It is not affiliated with,
                endorsed by, or sponsored by the companies or projects named above.
              </p>
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
                "Full DFW commercial opportunity database",
                "New verified opportunities added regularly",
                "Save opportunities and track your pipeline",
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
            Find your next contract before your competitors even know it exists.
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
