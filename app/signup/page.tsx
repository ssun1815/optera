import Link from 'next/link'
import { Header } from '@/app/components/Header'
import { signup } from './actions'

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
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
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-medium text-[var(--color-navy-900)]">Create your account</h1>
            <p className="mt-1 text-sm text-[var(--color-ink)]/60">Start your first month for $99.</p>

            {params.error && (
              <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                {params.error}
              </p>
            )}

            <form action={signup} className="mt-6 space-y-4">
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
              <div>
                <label htmlFor="password" className="text-sm text-[var(--color-ink)]">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  className="mt-1 w-full rounded-md border border-[var(--color-navy-900)]/20 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="text-sm text-[var(--color-ink)]">Confirm password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  minLength={6}
                  className="mt-1 w-full rounded-md border border-[var(--color-navy-900)]/20 px-3 py-2 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-[var(--color-amber)] px-4 py-2 text-sm font-medium text-[var(--color-navy-950)] hover:bg-[var(--color-amber-light)]"
              >
                Create account
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-[var(--color-ink)]/50">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="underline">Terms of Service</Link> and{' '}
              <Link href="/privacy" className="underline">Privacy Policy</Link>.
            </p>

            <p className="mt-6 text-center text-sm text-[var(--color-ink)]/60">
              Already have an account? <Link href="/login" className="text-[var(--color-navy-900)] underline">Log in</Link>
            </p>
          </div>
        </div>
      </main>
    </>
  )
}