import { Header } from '@/app/components/Header'

export default function CheckEmailPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-off-white)] px-6">
        <div className="max-w-sm text-center">
          <h1 className="text-xl font-medium text-[var(--color-navy-900)]">Check your email</h1>
          <p className="mt-2 text-sm text-[var(--color-ink)]/70">
            If an account exists with that email, we've sent a link to reset your password.
          </p>
        </div>
      </main>
    </>
  )
}