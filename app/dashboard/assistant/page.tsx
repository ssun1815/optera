import { createClient } from '@/app/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Header } from '@/app/components/Header'
import { AssistantChat } from '@/app/components/AssistantChat'
import { logout } from '../actions'
import Link from 'next/link'

export default async function AssistantPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('status')
    .eq('user_id', user.id)
    .maybeSingle()

  if (subscription?.status !== 'active') {
    redirect('/dashboard')
  }

  const headerRight = (
    <div className="flex items-center gap-6">
      <Link href="/dashboard" className="text-sm text-[var(--color-off-white)]/70 hover:text-[var(--color-off-white)]">
        Opportunities
      </Link>
      <Link href="/dashboard/saved" className="text-sm text-[var(--color-off-white)]/70 hover:text-[var(--color-off-white)]">
        Saved
      </Link>
      <form action={logout}>
        <button type="submit" className="text-sm text-[var(--color-off-white)]/70 underline hover:text-[var(--color-off-white)]">
          Log out
        </button>
      </form>
    </div>
  )

  return (
    <>
      <Header right={headerRight} />
      <main className="min-h-screen bg-[var(--color-off-white)] px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-medium text-[var(--color-navy-900)]">Ask Optrace</h1>
          <p className="mt-1 text-sm text-[var(--color-ink)]/60">
            Ask questions about opportunities in your database, or ask Optrace to compare a few for you.
          </p>
          <div className="mt-6">
            <AssistantChat />
          </div>
        </div>
      </main>
    </>
  )
}