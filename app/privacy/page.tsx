import Link from 'next/link'
import { Header } from '@/app/components/Header'

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-off-white)] px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <Link href="/" className="text-sm text-[var(--color-ink)]/60 hover:text-[var(--color-ink)]">
            &larr; Back to home
          </Link>
          <h1 className="mt-4 text-3xl font-medium text-[var(--color-navy-900)]">Privacy Policy</h1>
          <p className="mt-2 text-sm text-[var(--color-ink)]/50">Last updated: [DATE]</p>

          <div className="mt-8 space-y-8 text-sm leading-relaxed text-[var(--color-ink)]/90">
            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">1. Information We Collect</h2>
              <p className="mt-2">
                When you create an account, we collect your email address and password (stored securely via our authentication provider, Supabase). When you subscribe, payment details are collected and processed directly by Stripe; Optera does not receive or store your full card number.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">2. How We Use Information</h2>
              <p className="mt-2">
                We use your account information to provide access to the service, manage your subscription, and communicate important updates about your account. We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">3. Data Sources for Opportunity Content</h2>
              <p className="mt-2">
                The commercial opportunity information in Optera's database is compiled from publicly available sources such as news articles, press releases, and public government filings. This process does not involve collecting personal data about private individuals; it concerns publicly announced commercial and industrial projects and the organisations involved in them.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">4. Third-Party Services</h2>
              <p className="mt-2">
                Optera relies on the following third-party services, each of which processes data under their own privacy terms: Supabase (authentication and database hosting), Stripe (payment processing), Vercel (website hosting), and Anthropic (AI-assisted research used to help identify new opportunities from public sources).
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">5. Data Security</h2>
              <p className="mt-2">
                We use industry-standard practices to protect your account information, including encrypted connections and database-level access controls restricting data to authenticated, paying subscribers.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">6. Data Retention</h2>
              <p className="mt-2">
                We retain your account information for as long as your account is active. If you cancel your subscription, your account information may be retained for a reasonable period afterward for record-keeping, then deleted upon request.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">7. Your Rights</h2>
              <p className="mt-2">
                You may request access to, correction of, or deletion of your personal account information at any time by contacting us at [CONTACT EMAIL].
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">8. Cookies</h2>
              <p className="mt-2">
                Optera uses essential cookies required for authentication and session management. We do not currently use third-party advertising or tracking cookies.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">9. Children's Privacy</h2>
              <p className="mt-2">
                Optera is a business-to-business service not intended for use by individuals under 18.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">10. Changes to This Policy</h2>
              <p className="mt-2">
                We may update this Privacy Policy from time to time. Material changes will be communicated to active subscribers.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-[var(--color-navy-900)]">11. Contact</h2>
              <p className="mt-2">
                Questions about this Privacy Policy can be directed to [CONTACT EMAIL].
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}