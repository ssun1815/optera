import Link from 'next/link'
import { Header } from '@/app/components/Header'
import { login } from './actions'

export default async function LoginPage({
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
            <h1 className="text-2xl font-medium text-[var(--color-navy-900)]">Log in</h1>

            {params.error === 'confirm' && (
              <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                That confirmation link did not work. Please sign up again.
              </p>
            )}
            {params.error && params.error !== 'confirm' && (
              <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                Incorrect email or password.
              </p>
            )}

            <form action={login} className="mt-6 space-y-4">
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
                  className="mt-1 w-full rounded-md border border-[var(--color-navy-900)]/20 px-3 py-2 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-[var(--color-amber)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-amber-light)]"
              >
                Log in
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[var(--color-ink)]/60">
              Don&apos;t have an account? <Link href="/signup" className="text-[var(--color-navy-900)] underline">Sign up</Link>
            </p>
          </div>
        </div>
      </main>
    </>
  )
}