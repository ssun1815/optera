import { Header } from '@/app/components/Header'
import { PasswordInput } from '@/app/components/PasswordInput'
import { updatePassword } from './actions'

const PASSWORD_PATTERN = '(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}'
const PASSWORD_TITLE = 'Must be at least 8 characters, with at least one uppercase letter and one special character.'

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-off-white)] px-6 py-12">
        <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-medium text-[var(--color-navy-900)]">Set a new password</h1>

          {params.error && (
            <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {params.error}
            </p>
          )}

          <form action={updatePassword} className="mt-6 space-y-4">
            <div>
              <label htmlFor="password" className="text-sm text-[var(--color-ink)]">New password</label>
              <PasswordInput
                id="password"
                name="password"
                required
                pattern={PASSWORD_PATTERN}
                title={PASSWORD_TITLE}
                className="mt-1 w-full rounded-md border border-[var(--color-navy-900)]/20 px-3 py-2 text-sm"
              />
              <p className="mt-1 text-xs text-[var(--color-ink)]/50">
                At least 8 characters, with one uppercase letter and one special character.
              </p>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-sm text-[var(--color-ink)]">Confirm new password</label>
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                required
                pattern={PASSWORD_PATTERN}
                title={PASSWORD_TITLE}
                className="mt-1 w-full rounded-md border border-[var(--color-navy-900)]/20 px-3 py-2 text-sm"
              />
              <p className="mt-1 text-xs text-[var(--color-ink)]/50">
                At least 8 characters, with one uppercase letter and one special character.
              </p>
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-[var(--color-amber)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-amber-light)]"
            >
              Update password
            </button>
          </form>
        </div>
      </main>
    </>
  )
}