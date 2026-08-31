import Link from 'next/link'
import { Header } from '@/app/components/Header'
import { requestPasswordReset } from './actions'

export default function ForgotPasswordPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-off-white)] px-6 py-12">
        <div className="w-full max-w-sm">
          <Link href="/login" className="mb-6 inline-block text-sm text-[var(--color-ink)]/60 hover:text-[var(--color-ink)]">
            &larr; Back to log in
          </Link>
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-medium text-[var(--color-navy-900)]">Reset your password</h1>
            <p className="mt-1 text-sm text-[var(--color-ink)]/60">
              Enter your email and we'll send you a link to reset your password.
            </p>
            <form action={requestPasswordReset} className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className="text-sm text-[var(--color-ink)]">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-md border border-[var(--color-navy-900)]/20 px-3 py-2 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-[var(--color-amber)] px-4 py-2 text-sm font-medium text-[var(--color-navy-950)] hover:bg-[var(--color-amber-light)]"
              >
                Send reset link
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}