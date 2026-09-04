import Link from 'next/link'
import { Header } from '@/app/components/Header'

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-off-white)] px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="text-sm text-[var(--color-ink)]/60 hover:text-[var(--color-ink)]">
            &larr; Back to home
          </Link>
          <h1 className="mt-4 text-3xl font-semibold text-[var(--color-navy-900)]">Terms of Service</h1>
          <p className="mt-2 text-sm text-[var(--color-slate-500)]">Last updated: [DATE]</p>

          <div className="mt-10 space-y-10 text-sm leading-relaxed text-[var(--color-slate-700)]">

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">1. Introduction and Acceptance of Terms</h2>
              <p className="mt-3">
                These Terms of Service ("Terms") govern your access to and use of Optrace, a commercial opportunity
                intelligence platform operated as a sole proprietorship under the trading name Optrace ("Optrace,"
                "we," "us," or "our"). By creating an account, accessing the Optrace website, or subscribing to the
                service, you ("you," "your," or "Customer") agree to be bound by these Terms. If you are entering
                into these Terms on behalf of a company or other legal entity, you represent that you have the
                authority to bind that entity, in which case "you" refers to that entity.
              </p>
              <p className="mt-3">
                If you do not agree to these Terms in full, you must not access or use the service. These Terms
                apply to all visitors, users, and others who access or use Optrace.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">2. Description of Service</h2>
              <p className="mt-3">
                Optrace identifies publicly available information about commercial and industrial developments in
                the Dallas-Fort Worth, Texas metropolitan area and organises that information into a database of
                researched, scored, and analysed commercial opportunities, intended primarily for use by commercial
                HVAC contractors and related businesses.
              </p>
              <p className="mt-3">
                The service includes, without limitation: a searchable and filterable database of commercial
                opportunities; individual opportunity records containing project details, scoring, analysis, and
                source information; the ability to save opportunities and record personal notes; and an AI-assisted
                conversational assistant that answers questions using only the data in your subscribed database.
              </p>
              <p className="mt-3 font-medium text-[var(--color-navy-900)]">
                Optrace does not guarantee contracts, sales, or leads of any kind. Optrace provides researched
                commercial opportunity intelligence that you must independently investigate, verify to your own
                satisfaction, and pursue at your own discretion. Any scoring, prioritisation, or recommended action
                shown within the service reflects Optrace's own analysis of publicly available information and is
                not a prediction, warranty, or guarantee of any business outcome.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">3. Eligibility</h2>
              <p className="mt-3">
                Optrace is a business-to-business ("B2B") service intended for use by individuals acting in a
                business capacity. You must be at least 18 years old and have the legal capacity to enter into a
                binding contract to use the service. By using Optrace, you represent and warrant that you meet
                these requirements.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">4. Account Registration and Security</h2>
              <p className="mt-3">
                To use Optrace, you must create an account using a valid email address and a password meeting our
                stated security requirements. You are responsible for maintaining the confidentiality of your
                account credentials and for all activity that occurs under your account, whether or not you
                authorised that activity.
              </p>
              <p className="mt-3">
                You agree to notify us immediately at{' '}
                <a href="mailto:hello@useoptrace.com" className="text-[var(--color-navy-900)] underline">hello@useoptrace.com</a>{' '}
                if you become aware of any unauthorised use of your account or any other breach of security. We are
                not liable for any loss or damage arising from your failure to safeguard your account credentials.
              </p>
              <p className="mt-3">
                Accounts are intended for use by a single individual or a single organisation's authorised
                personnel. You agree not to share your account credentials with any third party outside your own
                organisation, and not to allow use of your account by any competitor of Optrace.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">5. Subscription Plans and Pricing</h2>
              <p className="mt-3">
                Optrace is offered on a recurring subscription basis. The current introductory pricing is $99 USD
                for the first calendar month of a new subscription, and $149 USD per month thereafter, billed
                automatically on a recurring monthly basis until cancelled in accordance with Section 8.
              </p>
              <p className="mt-3">
                We reserve the right to change our pricing at any time. If we change the pricing for your existing
                subscription, we will provide you with reasonable advance notice by email before the change takes
                effect on your account, and continued use of the service after that date constitutes acceptance of
                the new pricing.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">6. Payment Terms and Billing</h2>
              <p className="mt-3">
                All payments are processed by Stripe, Inc., a third-party payment processor. By subscribing, you
                authorise Optrace, through Stripe, to charge your provided payment method on a recurring basis for
                the applicable subscription fee until your subscription is cancelled. Optrace does not receive,
                process, or store your full payment card details; these are handled directly by Stripe in
                accordance with its own terms and applicable payment card industry standards.
              </p>
              <p className="mt-3">
                You are responsible for keeping your payment method up to date. If a payment fails, we may retry
                the charge, suspend your access to the service, or both, until payment is successfully collected.
                You are responsible for any taxes, duties, or similar governmental charges applicable to your
                subscription, other than taxes based on Optrace's own income.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">7. Cancellation and Refunds</h2>
              <p className="mt-3">
                You may cancel your subscription at any time through your account settings or by contacting{' '}
                <a href="mailto:hello@useoptrace.com" className="text-[var(--color-navy-900)] underline">hello@useoptrace.com</a>.
                Cancellation will take effect at the end of your current paid billing period, and you will retain
                access to the service until that date.
              </p>
              <p className="mt-3">
                Except where required by applicable law, fees already paid are non-refundable, including for
                partial billing periods, unused access, or early cancellation. We may, at our sole discretion,
                issue refunds on a case-by-case basis, and doing so does not obligate us to do so in any other
                instance.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">8. Acceptable Use Policy</h2>
              <p className="mt-3">You agree not to, and not to permit any third party to:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>Access or use the service other than for your own genuine business purposes;</li>
                <li>Resell, redistribute, sublicense, rent, lease, or otherwise make the service or its content available to any third party outside your own organisation;</li>
                <li>Systematically scrape, crawl, copy, extract, or republish the contents of the Optrace database, in whole or in part, by automated or manual means, except for your own internal business use;</li>
                <li>Reverse engineer, decompile, or attempt to derive the source code, underlying methodology, or scoring logic of the service;</li>
                <li>Use the service to build a competing product or service;</li>
                <li>Interfere with or disrupt the integrity or performance of the service, including through introduction of malicious code;</li>
                <li>Attempt to gain unauthorised access to the service, other accounts, or related systems or networks;</li>
                <li>Use the service in violation of any applicable law or regulation; or</li>
                <li>Misrepresent your identity or affiliation when using the service.</li>
              </ul>
              <p className="mt-3">
                We reserve the right to investigate and take appropriate action against anyone who, in our sole
                discretion, violates this policy, including suspending or terminating the offending account.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">9. Data Accuracy and Verification Standards</h2>
              <p className="mt-3">
                Optrace compiles opportunity information from publicly available sources and makes reasonable
                efforts to verify that information against credible sources before it is made available to
                subscribers, including maintaining a human review process for content drafted with the assistance
                of artificial intelligence tools (see Section 10). Where specific information is not publicly
                available, records will indicate this rather than presenting estimated or invented figures as fact.
              </p>
              <p className="mt-3">
                Notwithstanding these efforts, Optrace cannot guarantee that all information in the service is
                complete, current, or free of error, since it is drawn from third-party public sources beyond our
                control. You are responsible for independently verifying any information before relying on it for
                a business decision.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">10. AI-Generated Content Disclosure</h2>
              <p className="mt-3">
                Optrace uses artificial intelligence tools, including large language models, to assist in
                identifying, drafting, and scoring potential opportunities from publicly available sources. Content
                drafted with the assistance of these tools is reviewed by a human before being published to the
                customer-facing database. The conversational assistant feature within the service also uses
                artificial intelligence to answer questions, and is instructed to answer only using data present in
                your subscribed database, without inventing information beyond that data.
              </p>
              <p className="mt-3">
                As with any AI-assisted process, occasional errors are possible. You should treat any output from
                the assistant feature, like the rest of the service, as a starting point for your own investigation
                rather than as a guaranteed fact.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">11. No Guarantee of Results</h2>
              <p className="mt-3">
                You acknowledge and agree that Optrace is an information and research tool, and that Optrace does
                not participate in, broker, or guarantee any outcome of any business relationship, bid, contract,
                or transaction you may pursue as a result of using the service. Any decision to contact, engage
                with, or do business with any organisation identified through the service is made entirely at your
                own discretion and risk.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">12. Intellectual Property Rights</h2>
              <p className="mt-3">
                The Optrace name, logo, website design, software, database structure, scoring methodology, and all
                content and materials we create (including our own analysis, summaries, and recommendations) are
                the property of Optrace and are protected by applicable intellectual property laws. Nothing in
                these Terms grants you any right, title, or interest in the Optrace name, brand, or underlying
                technology, other than the limited right to access and use the service as set out in these Terms.
              </p>
              <p className="mt-3">
                This does not extend to the underlying public facts referenced within the database (such as project
                names, locations, or publicly reported figures), which are not owned by Optrace and remain in the
                public domain to the extent permitted by law.
              </p>
              <p className="mt-3">
                Subject to your compliance with these Terms, we grant you a limited, non-exclusive,
                non-transferable, revocable licence to access and use the service for your own internal business
                purposes during the term of your subscription.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">13. Your Content</h2>
              <p className="mt-3">
                The service allows you to create personal notes attached to opportunities you save ("Your
                Content"). You retain all rights to Your Content. By submitting Your Content, you grant us a
                limited licence to store, process, and display Your Content back to you as part of operating the
                service. We do not access, review, or use Your Content for any purpose other than providing the
                service to you and complying with applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">14. Third-Party Services</h2>
              <p className="mt-3">
                The service relies on and integrates with third-party service providers, including but not limited
                to Stripe (payment processing), Supabase (database and authentication), Vercel (hosting), Resend
                (transactional email delivery), and Anthropic (artificial intelligence services). Your use of the
                service is also subject to the applicable terms of these providers where you interact with them
                directly (for example, when entering payment details with Stripe). We are not responsible for the
                acts, omissions, or availability of these third-party providers.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">15. Disclaimers and Warranties</h2>
              <p className="mt-3 uppercase">
                The service is provided "as is" and "as available," without warranties of any kind, whether express,
                implied, or statutory, including but not limited to implied warranties of merchantability, fitness
                for a particular purpose, title, and non-infringement. We do not warrant that the service will be
                uninterrupted, timely, secure, or error-free, or that any information obtained through the service
                will be accurate or reliable.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">16. Limitation of Liability</h2>
              <p className="mt-3">
                To the maximum extent permitted by applicable law, in no event shall Optrace, its owner, or its
                affiliates be liable for any indirect, incidental, special, consequential, or punitive damages,
                including without limitation loss of profits, revenue, business opportunity, data, or goodwill,
                arising out of or in connection with your access to or use of, or inability to access or use, the
                service, whether based on warranty, contract, tort, or any other legal theory, even if we have been
                advised of the possibility of such damages.
              </p>
              <p className="mt-3">
                To the maximum extent permitted by applicable law, Optrace's total aggregate liability to you for
                all claims arising out of or relating to these Terms or the service shall not exceed the total
                amount paid by you to Optrace in the twelve (12) months preceding the event giving rise to the
                claim.
              </p>
              <p className="mt-3">
                Nothing in these Terms limits or excludes liability that cannot lawfully be limited or excluded,
                including liability for death or personal injury caused by negligence, or fraud.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">17. Indemnification</h2>
              <p className="mt-3">
                You agree to indemnify and hold harmless Optrace and its owner from and against any claims,
                liabilities, damages, losses, and expenses, including reasonable legal fees, arising out of or in
                any way connected with your access to or use of the service, your violation of these Terms, or your
                violation of any rights of a third party.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">18. Termination</h2>
              <p className="mt-3">
                We may suspend or terminate your access to the service, with or without notice, if we reasonably
                believe you have violated these Terms, engaged in fraudulent or abusive conduct, or if required to
                do so by law. You may terminate your account at any time in accordance with Section 7.
              </p>
              <p className="mt-3">
                Upon termination, your right to access the service ceases immediately. Sections of these Terms
                that by their nature should survive termination (including but not limited to intellectual
                property, disclaimers, limitation of liability, and indemnification) shall survive.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">19. Governing Law and Dispute Resolution</h2>
              <p className="mt-3 rounded-md bg-amber-50 p-4 text-amber-900">
                [PLACEHOLDER — REQUIRES YOUR CONFIRMATION, IDEALLY WITH REAL LEGAL ADVICE]<br /><br />
                As a starting point: given Optrace is currently operated as a UK sole trader, a common and
                defensible default for a small business in your position is to specify the laws of England and
                Wales as governing law, with the courts of England and Wales having jurisdiction. This is a
                reasonable default precisely because you are the smaller party without significant negotiating
                leverage over individual contractor customers, and it keeps you within a legal system you already
                operate under. However, this is a genuine decision with real consequences (including how easily you
                could enforce these Terms against a US-based customer, and vice versa), and it should be revisited
                once you register a US entity, as previously discussed. Do not treat this placeholder as finalised
                legal language — confirm it, or replace it, with a qualified advisor before relying on it.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">20. Force Majeure</h2>
              <p className="mt-3">
                Neither party shall be liable for any failure or delay in performance under these Terms resulting
                from circumstances beyond that party's reasonable control, including but not limited to acts of
                God, natural disasters, war, terrorism, labour disputes, internet or utility failures, or
                governmental action.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">21. Changes to These Terms</h2>
              <p className="mt-3">
                We may revise these Terms from time to time. If we make material changes, we will provide
                reasonable notice, such as by email to the address associated with your account or by posting a
                notice within the service, prior to the change taking effect. Your continued use of the service
                after the effective date of any revised Terms constitutes your acceptance of those Terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">22. Severability</h2>
              <p className="mt-3">
                If any provision of these Terms is found to be unenforceable or invalid under applicable law, that
                provision will be limited or eliminated to the minimum extent necessary so that these Terms will
                otherwise remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">23. Entire Agreement</h2>
              <p className="mt-3">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and
                Optrace regarding your use of the service, and supersede any prior agreements between you and
                Optrace relating to the service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">24. Assignment</h2>
              <p className="mt-3">
                You may not assign or transfer these Terms, by operation of law or otherwise, without our prior
                written consent. We may assign these Terms, at our sole discretion, without restriction, including
                in connection with a merger, acquisition, or sale of assets.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">25. Notices</h2>
              <p className="mt-3">
                We may provide notices to you via the email address associated with your account, or by posting a
                notice within the service. Notices to us should be sent to{' '}
                <a href="mailto:hello@useoptrace.com" className="text-[var(--color-navy-900)] underline">hello@useoptrace.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-navy-900)]">26. Contact</h2>
              <p className="mt-3">
                Questions about these Terms can be directed to{' '}
                <a href="mailto:hello@useoptrace.com" className="text-[var(--color-navy-900)] underline">hello@useoptrace.com</a>.
              </p>
            </section>

          </div>
        </div>
      </main>
    </>
  )
}