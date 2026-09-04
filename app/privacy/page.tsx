import Link from 'next/link'
import { Header } from '@/app/components/Header'

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-off-white)] px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="text-sm text-[var(--color-ink)]/60 hover:text-[var(--color-ink)]">
            &larr; Back to home
          </Link>
          <h1 className="mt-4 text-3xl font-semibold text-[var(--color-navy-900)]">Privacy Policy</h1>
          <p className="mt-2 text-sm text-[var(--color-slate-500)]">Last updated: [DATE]</p>

          <div className="mt-10 space-y-10 text-sm leading-relaxed text-[var(--color-slate-700)]">

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">1. Introduction</h2>
              <p className="mt-3">
                This Privacy Policy explains how Optrace ("Optrace," "we," "us," or "our") collects, uses, discloses,
                and protects information in connection with your access to and use of our website and subscription
                service (together, the "service"). Optrace is currently operated as a sole proprietorship based in
                the United Kingdom.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">2. Information We Collect</h2>
              <p className="mt-3">We collect the following categories of information:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li><span className="font-medium text-[var(--color-navy-900)]">Account information:</span> your email address and password (stored in encrypted/hashed form by our authentication provider, Supabase);</li>
                <li><span className="font-medium text-[var(--color-navy-900)]">Payment information:</span> processed directly by Stripe, our payment processor; we do not receive or store your full card number;</li>
                <li><span className="font-medium text-[var(--color-navy-900)]">Content you provide:</span> personal notes you attach to saved opportunities within the service;</li>
                <li><span className="font-medium text-[var(--color-navy-900)]">Usage information:</span> information about how you interact with the service, such as pages visited and features used, collected to operate and improve the service;</li>
                <li><span className="font-medium text-[var(--color-navy-900)]">Communications:</span> correspondence you send to us, such as support requests sent to hello@useoptrace.com; and</li>
                <li><span className="font-medium text-[var(--color-navy-900)]">Technical information:</span> standard technical data such as IP address, browser type, and device information, collected automatically as part of operating a website and web application.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">3. How We Use Your Information</h2>
              <p className="mt-3">We use the information we collect to:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>Provide, operate, and maintain the service, including authenticating your account and managing your subscription;</li>
                <li>Process payments and communicate with you about billing;</li>
                <li>Respond to your support requests and other communications;</li>
                <li>Send you service-related communications, such as email confirmations, password reset emails, and important notices about the service;</li>
                <li>Monitor and analyse usage to improve and maintain the security of the service; and</li>
                <li>Comply with our legal obligations.</li>
              </ul>
              <p className="mt-3">
                We do not sell your personal information to third parties, and we do not use your personal
                information for third-party advertising purposes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">4. Data Sources for Opportunity Content</h2>
              <p className="mt-3">
                Separately from the account information described above, the commercial opportunity content within
                Optrace's database is compiled from publicly available sources such as news articles, press
                releases, and public announcements concerning commercial and industrial development projects. This
                process concerns publicly reported information about companies and projects, not personal data
                about private individuals, and is not addressed further in this Privacy Policy, which concerns your
                personal information as a user of the service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">5. Cookies and Tracking Technologies</h2>
              <p className="mt-3">
                Optrace uses cookies that are strictly necessary for the operation of the service, such as cookies
                used to maintain your logged-in session. We do not currently use third-party advertising or
                cross-site tracking cookies. If this changes in the future, we will update this Policy and, where
                required by law, obtain your consent.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">6. Third-Party Service Providers</h2>
              <p className="mt-3">
                We rely on the following third-party service providers to operate Optrace, each of which processes
                certain information as our service provider or under its own applicable privacy terms:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li><span className="font-medium text-[var(--color-navy-900)]">Supabase</span> — database hosting and authentication;</li>
                <li><span className="font-medium text-[var(--color-navy-900)]">Stripe</span> — payment processing;</li>
                <li><span className="font-medium text-[var(--color-navy-900)]">Vercel</span> — website and application hosting;</li>
                <li><span className="font-medium text-[var(--color-navy-900)]">Resend</span> — transactional email delivery (account confirmation, password reset, and related service emails); and</li>
                <li><span className="font-medium text-[var(--color-navy-900)]">Anthropic</span> — artificial intelligence services used to assist in researching and drafting opportunity content, and to power the in-service conversational assistant.</li>
              </ul>
              <p className="mt-3">
                Each of these providers is contractually or by policy restricted from using information they
                process on our behalf for their own independent purposes, except as necessary to provide their
                service to us.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">7. Data Sharing and Disclosure</h2>
              <p className="mt-3">
                Other than sharing with the service providers described above, we disclose personal information
                only: where required to comply with applicable law, regulation, legal process, or governmental
                request; to protect the rights, property, or safety of Optrace, our users, or others; or in
                connection with a merger, acquisition, or sale of assets, in which case we will notify you before
                your information becomes subject to a different privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">8. International Data Transfers</h2>
              <p className="mt-3">
                Optrace is operated from the United Kingdom, and our service providers may process and store
                information in the United States or other countries. Where personal information is transferred
                internationally, we take steps intended to ensure it receives an adequate level of protection,
                including relying on service providers that maintain appropriate safeguards such as standard
                contractual clauses where applicable.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">9. Data Security</h2>
              <p className="mt-3">
                We use industry-standard technical and organisational measures designed to protect your personal
                information, including encrypted connections (HTTPS/TLS), encrypted storage of passwords, and
                database-level access controls that restrict opportunity data to authenticated, paying subscribers.
                No method of transmission or storage is completely secure, and we cannot guarantee absolute
                security.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">10. Data Retention</h2>
              <p className="mt-3">
                We retain your account information for as long as your account remains active. If you cancel your
                subscription, we may retain your account information for a reasonable period afterward for
                record-keeping, tax, and legal compliance purposes, after which it will be deleted or anonymised
                upon request, except where we are required or permitted by law to retain it longer.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">11. Your Privacy Rights</h2>
              <p className="mt-3">
                Depending on your location, you may have rights in relation to your personal information, which may
                include the right to: request access to the personal information we hold about you; request
                correction of inaccurate information; request deletion of your information; request a copy of your
                information in a portable format; and object to or restrict certain processing of your information.
              </p>
              <p className="mt-3">
                You can exercise these rights by contacting us at{' '}
                <a href="mailto:hello@useoptrace.com" className="text-[var(--color-navy-900)] underline">hello@useoptrace.com</a>.
                We will respond to your request within a reasonable timeframe and in accordance with applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">12. UK and EU Data Subject Rights (GDPR)</h2>
              <p className="mt-3">
                As Optrace is operated from the United Kingdom, individuals located in the UK or European Economic
                Area have rights under the UK GDPR and/or EU GDPR as applicable, including the rights described in
                Section 11 above, as well as the right to lodge a complaint with a supervisory authority, such as
                the UK Information Commissioner's Office (ICO), if you believe we have not handled your personal
                information appropriately.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">13. California Privacy Rights</h2>
              <p className="mt-3">
                If you are a California resident, you may have additional rights under the California Consumer
                Privacy Act, as amended by the California Privacy Rights Act (collectively, "CCPA"), including the
                right to know what personal information we collect, the right to request deletion, and the right to
                opt out of the sale or sharing of personal information. Optrace does not sell or share personal
                information as those terms are defined under the CCPA. You may exercise any applicable rights by
                contacting us at{' '}
                <a href="mailto:hello@useoptrace.com" className="text-[var(--color-navy-900)] underline">hello@useoptrace.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">14. Texas Data Privacy and Security Act</h2>
              <p className="mt-3">
                As our primary customer base is located in Texas, we note that the Texas Data Privacy and Security
                Act (TDPSA) may apply to certain businesses processing Texas residents' personal data. Given
                Optrace's current scale of operations, we believe the small business exemption under the TDPSA is
                likely applicable; we will monitor this as the business grows and update our practices as necessary
                to remain compliant.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">15. Children's Privacy</h2>
              <p className="mt-3">
                Optrace is a business-to-business service not directed to, or intended for use by, individuals
                under the age of 18. We do not knowingly collect personal information from children. If you believe
                a child has provided us with personal information, please contact us and we will take steps to
                delete it.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">16. Do Not Track</h2>
              <p className="mt-3">
                Some browsers offer a "Do Not Track" signal. There is currently no industry-standard interpretation
                of these signals, and Optrace does not currently respond differently to browsers with this signal
                enabled.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">17. Changes to This Policy</h2>
              <p className="mt-3">
                We may update this Privacy Policy from time to time. If we make material changes, we will notify
                active subscribers, such as by email or a notice within the service, before the changes take
                effect.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">18. Contact Us</h2>
              <p className="mt-3">
                Questions about this Privacy Policy, or requests relating to your personal information, can be
                directed to{' '}
                <a href="mailto:hello@useoptrace.com" className="text-[var(--color-navy-900)] underline">hello@useoptrace.com</a>.
              </p>
            </section>

          </div>
        </div>
      </main>
    </>
  )
}