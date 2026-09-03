import Link from 'next/link'
import { Header } from '@/app/components/Header'

export default async function CheckEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const params = await searchParams
  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-off-white)] px-6 py-12">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-6 inline-block text-sm text-[var(--color-ink)]/60 hover:text-[var(--color-ink)]">
            &larr; Back to home
          </Link>
          <div className="rounded-md border border-[var(--color-border)] bg-white p-8 text-center shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
            <h1 className="text-2xl font-medium text-[var(--color-navy-900)]">Check your email</h1>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]/70">
              {params.email ? (
                <>
                  We sent a confirmation link to{' '}
                  <span className="font-medium text-[var(--color-ink)]">{params.email}</span>.
                  Click it to activate your account.
                </>
              ) : (
                'We sent you a confirmation link. Click it to activate your account.'
              )}
            </p>

            <div className="mt-6 space-y-2">
              <a
                href="https://mail.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-md bg-[var(--color-amber)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-amber-light)]"
              >
                Open Gmail
              </a>
              <a
                href="https://outlook.live.com/mail"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-ink)] hover:bg-slate-50"
              >
                Open Outlook
              </a>
            </div>

            <p className="mt-6 text-center text-sm text-[var(--color-ink)]/60">
              Wrong email? <Link href="/signup" className="text-[var(--color-navy-900)] underline">Sign up again</Link>
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
