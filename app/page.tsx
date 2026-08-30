import Link from 'next/link'
import { Header } from '@/app/components/Header'

export default function Home() {
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
      <Link
        href="/signup"
        className="rounded-md bg-[var(--color-amber)] px-4 py-2 text-sm font-medium text-[var(--color-navy-950)] transition hover:bg-[var(--color-amber-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-amber-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy-950)]"
      >
        Start now
      </Link>
    </>
  )

  const trackItems = [
    {
      title: "Warehouses & Distribution",
      body: "Large-format logistics facilities with significant dock and mechanical needs.",
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
      a: "The $99 first month is an introductory offer designed to make it easy to try Optera and see the value before committing to the standard rate.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. There's no long-term contract. Cancel from your account at any time and you won't be billed again.",
    },
    {
      q: "How is my payment handled?",
      a: "All payments are processed securely by Stripe. Optera never stores your full card details.",
    },
    {
      q: "How often is the database updated?",
      a: "New opportunities are researched and added on an ongoing basis as they're identified and verified.",
    },
  ]

  return (
    <main>
      <Header right={navRight} />

      <section className="relative overflow-hidden bg-[var(--color-navy-950)]">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <g stroke="var(--color-off-white)" strokeOpacity="0.14" strokeWidth="1" fill="none">
            <line x1="150" y1="120" x2="340" y2="80" />
            <line x1="150" y1="120" x2="120" y2="340" />
            <line x1="150" y1="120" x2="60" y2="220" />
            <line x1="340" y1="80" x2="500" y2="200" />
            <line x1="340" y1="80" x2="720" y2="180" />
            <line x1="500" y1="200" x2="300" y2="280" />
            <line x1="500" y1="200" x2="600" y2="320" />
            <line x1="300" y1="280" x2="120" y2="340" />
            <line x1="300" y1="280" x2="250" y2="460" />
            <line x1="300" y1="280" x2="430" y2="420" />
            <line x1="120" y1="340" x2="60" y2="220" />
            <line x1="120" y1="340" x2="250" y2="460" />
            <line x1="250" y1="460" x2="430" y2="420" />
            <line x1="250" y1="460" x2="180" y2="540" />
            <line x1="250" y1="460" x2="360" y2="600" />
            <line x1="430" y1="420" x2="600" y2="320" />
            <line x1="430" y1="420" x2="500" y2="560" />
            <line x1="600" y1="320" x2="720" y2="180" />
            <line x1="600" y1="320" x2="880" y2="480" />
            <line x1="600" y1="320" x2="700" y2="520" />
            <line x1="720" y1="180" x2="850" y2="260" />
            <line x1="720" y1="180" x2="950" y2="120" />
            <line x1="850" y1="260" x2="950" y2="120" />
            <line x1="850" y1="260" x2="880" y2="480" />
            <line x1="850" y1="260" x2="1080" y2="220" />
            <line x1="950" y1="120" x2="1080" y2="220" />
            <line x1="1080" y1="220" x2="1150" y2="380" />
            <line x1="1080" y1="220" x2="1020" y2="400" />
            <line x1="1020" y1="400" x2="880" y2="480" />
            <line x1="1020" y1="400" x2="1150" y2="380" />
            <line x1="880" y1="480" x2="700" y2="520" />
            <line x1="700" y1="520" x2="500" y2="560" />
            <line x1="500" y1="560" x2="360" y2="600" />
            <line x1="360" y1="600" x2="180" y2="540" />
          </g>

          <circle cx="150" cy="120" r="2.5" fill="var(--color-off-white)" fillOpacity="0.4" />
          <circle cx="340" cy="80" r="2.5" fill="var(--color-off-white)" fillOpacity="0.4" />
          <circle cx="500" cy="200" r="2.5" fill="var(--color-off-white)" fillOpacity="0.4" />
          <circle cx="120" cy="340" r="2.5" fill="var(--color-off-white)" fillOpacity="0.4" />
          <circle cx="60" cy="220" r="2.5" fill="var(--color-off-white)" fillOpacity="0.4" />
          <circle cx="600" cy="320" r="2.5" fill="var(--color-off-white)" fillOpacity="0.4" />
          <circle cx="720" cy="180" r="2.5" fill="var(--color-off-white)" fillOpacity="0.4" />
          <circle cx="850" cy="260" r="2.5" fill="var(--color-off-white)" fillOpacity="0.4" />
          <circle cx="950" cy="120" r="2.5" fill="var(--color-off-white)" fillOpacity="0.4" />
          <circle cx="1080" cy="220" r="2.5" fill="var(--color-off-white)" fillOpacity="0.4" />
          <circle cx="1150" cy="380" r="2.5" fill="var(--color-off-white)" fillOpacity="0.4" />
          <circle cx="1020" cy="400" r="2.5" fill="var(--color-off-white)" fillOpacity="0.4" />
          <circle cx="700" cy="520" r="2.5" fill="var(--color-off-white)" fillOpacity="0.4" />
          <circle cx="500" cy="560" r="2.5" fill="var(--color-off-white)" fillOpacity="0.4" />
          <circle cx="360" cy="600" r="2.5" fill="var(--color-off-white)" fillOpacity="0.4" />

          <g>
            <circle cx="430" cy="420" r="16" fill="none" stroke="var(--color-amber)" strokeWidth="0.5" opacity="0.25" />
            <circle cx="430" cy="420" r="9" fill="none" stroke="var(--color-amber)" strokeWidth="1" opacity="0.45" />
            <circle cx="430" cy="420" r="4.5" fill="var(--color-amber)" />
          </g>
          <g>
            <circle cx="880" cy="480" r="16" fill="none" stroke="var(--color-amber)" strokeWidth="0.5" opacity="0.25" />
            <circle cx="880" cy="480" r="9" fill="none" stroke="var(--color-amber)" strokeWidth="1" opacity="0.45" />
            <circle cx="880" cy="480" r="4.5" fill="var(--color-amber)" />
          </g>
          <g>
            <circle cx="180" cy="540" r="16" fill="none" stroke="var(--color-amber)" strokeWidth="0.5" opacity="0.25" />
            <circle cx="180" cy="540" r="9" fill="none" stroke="var(--color-amber)" strokeWidth="1" opacity="0.45" />
            <circle cx="180" cy="540" r="4.5" fill="var(--color-amber)" />
          </g>
        </svg>

        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-amber-light)]">
              DALLAS-FORT WORTH - COMMERCIAL HVAC
            </p>
            <h1 className="mt-4 text-4xl font-light leading-tight text-[var(--color-off-white)] md:text-5xl">
              Find commercial opportunities before your competitors.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-off-white)]/70">
              Optera tracks new commercial and industrial developments across
              DFW - warehouses, distribution centers, data centers, hotels,
              and more - and turns public signals into a curated list of HVAC
              opportunities worth your time.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="rounded-md bg-[var(--color-amber)] px-6 py-3 text-sm font-medium text-[var(--color-navy-950)] transition hover:bg-[var(--color-amber-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-amber-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy-950)]"
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

          <div className="relative rounded-lg bg-[var(--color-off-white)] p-6 shadow-2xl md:justify-self-end md:max-w-sm">
            <div className="flex items-center justify-between">
              <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-widest text-[var(--color-amber)]">
                REAL SIGNAL - VERIFIED
              </p>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-navy-950)] font-[family-name:var(--font-mono)] text-sm text-[var(--color-amber-light)]">
                9
              </div>
            </div>
            <h3 className="mt-3 text-lg font-medium text-[var(--color-ink)]">
              Circle T Data Center
            </h3>
            <p className="mt-1 text-sm text-[var(--color-ink)]/60">
              Westlake, TX - Data Center
            </p>
            <dl className="mt-4 space-y-2 border-t border-[var(--color-navy-900)]/10 pt-4 font-[family-name:var(--font-mono)] text-xs text-[var(--color-ink)]/70">
              <div className="flex justify-between">
                <dt>Size</dt>
                <dd>Up to 1.2M sq ft</dd>
              </div>
              <div className="flex justify-between">
                <dt>Stage</dt>
                <dd>Site plans approved</dd>
              </div>
              <div className="flex justify-between">
                <dt>Capacity</dt>
                <dd>300MW</dd>
              </div>
              <div className="flex justify-between">
                <dt>Source</dt>
                <dd>DCD, Aug 2026</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-2xl font-medium text-[var(--color-navy-900)]">
          How Optera works
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Detect",
              body: "We monitor construction news, development announcements, and public project information across DFW every day.",
            },
            {
              step: "02",
              title: "Verify and score",
              body: "Every opportunity is checked against credible public sources and scored 1 to 10 for HVAC relevance.",
            },
            {
              step: "03",
              title: "Deliver",
              body: "Curated, verified opportunities land in your dashboard - no noise, no manual searching.",
            },
          ].map((item) => (
            <div key={item.step}>
              <p className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-amber)]">
                {item.step}
              </p>
              <h3 className="mt-2 text-lg font-medium text-[var(--color-navy-900)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]/70">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="what-we-track" className="bg-[var(--color-off-white-alt)] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-medium text-[var(--color-navy-900)]">
            What we track
          </h2>
          <p className="mt-2 max-w-lg text-sm text-[var(--color-ink)]/60">
            Six categories of commercial and industrial development, each scored specifically for HVAC relevance.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {trackItems.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-[var(--color-navy-900)]/10 bg-[var(--color-off-white)] p-6 transition hover:border-[var(--color-navy-900)]/20 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-amber)]/10 text-[var(--color-amber)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="mt-4 text-sm font-medium text-[var(--color-navy-900)]">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink)]/60">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-2xl font-medium text-[var(--color-navy-900)]">
          Simple pricing
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-start">
          <div className="rounded-lg border border-[var(--color-navy-900)]/10 bg-[var(--color-off-white)] p-8 shadow-sm">
            <p className="font-[family-name:var(--font-mono)] text-4xl text-[var(--color-navy-900)]">
              $99
              <span className="text-base text-[var(--color-ink)]/50"> first month</span>
            </p>
            <p className="mt-1 text-sm text-[var(--color-ink)]/60">
              then $149/month
            </p>
            <ul className="mt-6 space-y-3 text-sm text-[var(--color-ink)]/80">
              {[
                "Full DFW commercial opportunity database",
                "New verified opportunities added regularly",
                "Save opportunities and track your pipeline",
                "Cancel anytime, no long-term contract",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-amber)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="mt-8 block rounded-md bg-[var(--color-amber)] px-6 py-3 text-center text-sm font-medium text-[var(--color-navy-950)] transition hover:bg-[var(--color-amber-light)]"
            >
              Get started
            </Link>
          </div>

          <div className="space-y-6">
            {faqs.map((item) => (
              <div key={item.q} className="border-b border-[var(--color-navy-900)]/10 pb-6 last:border-0">
                <h3 className="text-sm font-medium text-[var(--color-navy-900)]">{item.q}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink)]/70">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[var(--color-navy-950)] py-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-[family-name:var(--font-mono)] text-sm tracking-widest text-[var(--color-off-white)]">
            OPTERA
          </p>
          <p className="mt-3 max-w-md text-xs leading-relaxed text-[var(--color-off-white)]/50">
            Optera provides researched commercial opportunity intelligence for
            Dallas-Fort Worth HVAC contractors. It does not guarantee
            contracts, sales, or leads.
          </p>
          <div className="mt-6 flex items-center gap-4 text-xs text-[var(--color-off-white)]/50">
            <Link href="/terms" className="hover:text-[var(--color-off-white)]">Terms of Service</Link>
            <span>·</span>
            <Link href="/privacy" className="hover:text-[var(--color-off-white)]">Privacy Policy</Link>
          </div>
          <p className="mt-6 text-xs text-[var(--color-off-white)]/30">
            (c) 2026 Optera.
          </p>
        </div>
      </footer>
    </main>
  )
}
