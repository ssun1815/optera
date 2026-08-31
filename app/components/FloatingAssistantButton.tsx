import Link from 'next/link'

export function FloatingAssistantButton() {
  return (
    <Link href="/dashboard/assistant" className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      <span className="rounded-lg bg-[var(--color-navy-950)] px-3 py-2 text-xs font-medium text-white shadow-lg">
        Ask a question
      </span>
      <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-amber)] text-[var(--color-navy-950)] shadow-lg transition hover:bg-[var(--color-amber-light)]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </span>
    </Link>
  )
}