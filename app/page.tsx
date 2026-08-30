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

  return (
    <main>
      <Header right={navRight} />

      <section className="bg-[var(--color-navy-950)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
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

          <div className="rounded-lg bg-[var(--color-off-white)] p-6 shadow-2xl md:justify-self-end md:max-w-sm">
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
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              "Warehouses and distribution centers",
              "Manufacturing and industrial facilities",
              "Data centers",
              "Hotels and hospitality",
              "Healthcare facilities",
              "Office developments",
            ].map((type) => (
              <div key={type} className="flex items-start gap-3 rounded-md bg-[var(--color-off-white)] p-4">
                <span className="mt-1 h-2 w-2 flex-shrink-0 bg-[var(--color-amber)]" />
                <span className="text-sm text-[var(--color-ink)]">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-2xl font-medium text-[var(--color-navy-900)]">
          Simple pricing
        </h2>
        <div className="mt-10 max-w-md rounded-lg border border-[var(--color-navy-900)]/10 bg-[var(--color-off-white)] p-8 shadow-sm">
          <p className="font-[family-name:var(--font-mono)] text-4xl text-[var(--color-navy-900)]">
            $99
            <span className="text-base text-[var(--color-ink)]/50"> first month</span>
          </p>
          <p className="mt-1 text-sm text-[var(--color-ink)]/60">
            then $149/month
          </p>
          <ul className="mt-6 space-y-2 text-sm text-[var(--color-ink)]/80">
            <li>Full DFW commercial opportunity database</li>
            <li>New verified opportunities added regularly</li>
            <li>Cancel anytime, no long-term contract</li>
          </ul>
          <Link
            href="/signup"
            className="mt-8 block rounded-md bg-[var(--color-amber)] px-6 py-3 text-center text-sm font-medium text-[var(--color-navy-950)] transition hover:bg-[var(--color-amber-light)]"
          >
            Get started
          </Link>
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
          <p className="mt-6 text-xs text-[var(--color-off-white)]/30">
            (c) 2026 Optera.
          </p>
        </div>
      </footer>
    </main>
  )
}
