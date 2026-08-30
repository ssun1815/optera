export default function CheckEmailPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-off-white)] px-6">
      <div className="max-w-sm text-center">
        <h1 className="text-xl font-medium text-[var(--color-navy-900)]">Check your email</h1>
        <p className="mt-2 text-sm text-[var(--color-ink)]/70">
          We sent you a confirmation link. Click it to activate your account.
        </p>
      </div>
    </main>
  )
}