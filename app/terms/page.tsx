import Link from 'next/link'
import { Header } from '@/app/components/Header'

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-off-white)] px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <Link href="/" className="text-sm text-[var(--color-ink)]/60 hover:text-[var(--color-ink)]">
            &larr; Back to home
          </Link>
          <h1 className="mt-4 text-3xl font-medium text-[var(--color-navy-900)]">Terms of Service</h1>
          <p className="mt-2 text-sm text-[var(--color-ink)]/50">Last updated: [DATE]</p>

          <div className="mt-8 space-y-8 text-sm leading-relaxed text-[var(--color-ink)]/90">
            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">1. Acceptance of Terms</h2>
              <p className="mt-2">
                By creating an account or subscribing to Optrace ("Optrace," "we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the service.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">2. Description of Service</h2>
              <p className="mt-2">
                Optrace is a B2B commercial opportunity intelligence platform that identifies publicly available information about commercial and industrial developments in the Dallas-Fort Worth, Texas metropolitan area and organises it into a database intended for commercial HVAC contractors.
              </p>
              <p className="mt-2 font-medium">
                Optrace does not guarantee contracts, sales, or leads. Optrace provides researched commercial opportunity intelligence that customers must independently investigate and pursue. Opportunity scores and recommendations reflect Optrace's analysis of publicly available information and are not a prediction or guarantee of any outcome.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">3. Subscriptions and Payment</h2>
              <p className="mt-2">
                Optrace is offered on a subscription basis. The current pricing is $99 USD for the first month and $149 USD per month thereafter, billed automatically until cancelled. Pricing may change in the future; you will be notified of any change before it takes effect on your account.
              </p>
              <p className="mt-2">
                Payments are processed by Stripe, a third-party payment processor. Optrace does not store your full card details.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">4. Cancellation</h2>
              <p className="mt-2">
                You may cancel your subscription at any time. Cancellation will take effect at the end of your current billing period. Optrace does not provide refunds for partial billing periods except where required by law.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">5. Acceptable Use</h2>
              <p className="mt-2">
                You agree not to resell, redistribute, scrape, or systematically republish Optrace's database or content without prior written permission. Your account is for use by your own organisation.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">6. Accuracy of Information</h2>
              <p className="mt-2">
                Optrace makes reasonable efforts to verify information against credible public sources before including it in the database, and clearly distinguishes confirmed facts from analysis. However, Optrace cannot guarantee the complete accuracy, completeness, or timeliness of third-party information, and is not liable for decisions made based on information provided through the service.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">7. Intellectual Property</h2>
              <p className="mt-2">
                All content, design, and organisation of the Optrace platform is the property of Optrace. This does not extend to the underlying public facts about third-party projects referenced in the database.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">8. Limitation of Liability</h2>
              <p className="mt-2">
                To the maximum extent permitted by law, Optrace shall not be liable for any indirect, incidental, or consequential damages arising from use of the service, including any business decisions made based on information provided.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">9. Termination</h2>
              <p className="mt-2">
                Optrace reserves the right to suspend or terminate accounts that violate these terms, engage in abusive behaviour, or misuse the service.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">10. Changes to These Terms</h2>
              <p className="mt-2">
                Optrace may update these Terms from time to time. Continued use of the service after changes take effect constitutes acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">11. Governing Law</h2>
              <p className="mt-2 rounded-md bg-amber-50 p-3 text-amber-900">
                [PLACEHOLDER: This section should specify which jurisdiction's law governs this agreement. Given Optrace is based outside the US but sells to Texas-based customers, this is a real legal decision that should be made with proper advice before launch, not guessed.]
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">12. Contact</h2>
              <p className="mt-2">
                Questions about these Terms can be directed to [CONTACT EMAIL].
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}