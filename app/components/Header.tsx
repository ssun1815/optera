import Link from 'next/link'
import type { ReactNode } from 'react'

export function Header({ right }: { right?: ReactNode }) {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-navy-950)]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-[family-name:var(--font-mono)] text-lg tracking-widest text-[var(--color-off-white)]"
        >
          OPTRACE
        </Link>
        {right}
      </nav>
    </header>
  )
}