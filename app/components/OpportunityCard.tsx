import Link from 'next/link'
import { toggleSaveOpportunity } from '@/app/dashboard/save-actions'
import { urgencyBadge } from '@/app/lib/opportunity-priority'

type Opportunity = {
  id: string
  project_name: string | null
  city: string | null
  state: string | null
  project_type: string | null
  estimated_size: string | null
  opportunity_score: number | null
  lifecycle_stage: string | null
  recommended_action: string | null
  reason_for_relevance: string | null
  date_discovered: string | null
}

function priorityLabel(score: number | null) {
  if (score === null) return null
  if (score >= 9) return { label: 'HIGH PRIORITY', bg: 'bg-[var(--color-amber)]', text: 'text-[var(--color-navy-950)]' }
  if (score >= 7) return { label: 'STRONG OPPORTUNITY', bg: 'bg-[var(--color-navy-700)]', text: 'text-white' }
  return { label: 'POSSIBLE OPPORTUNITY', bg: 'bg-[var(--color-ink)]/70', text: 'text-white' }
}

function daysAgo(dateStr: string | null) {
  if (!dateStr) return null
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24))
  if (diff <= 0) return 'Today'
  if (diff === 1) return '1 day ago'
  return `${diff} days ago`
}

export function OpportunityCard({ opp, isSaved = false }: { opp: Opportunity; isSaved?: boolean }) {
  const priority = priorityLabel(opp.opportunity_score)
  const urgency = urgencyBadge(opp.recommended_action)
  const discovered = daysAgo(opp.date_discovered)

  return (
    <div className="rounded-xl border border-[var(--color-navy-900)]/8 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {priority && (
              <span className={`inline-block rounded px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] tracking-wider ${priority.bg} ${priority.text}`}>
                {priority.label}
              </span>
            )}
            {urgency && (
              <span className={`inline-block rounded border px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] tracking-wider ${urgency.className}`}>
                {urgency.label}
              </span>
            )}
          </div>
          <h2 className="mt-2 text-lg font-medium text-[var(--color-navy-900)]">
            {opp.project_name}
          </h2>
          <p className="mt-1 text-sm text-[var(--color-ink)]/60">
            {opp.city}, {opp.state} · {opp.project_type}
          </p>
        </div>
        <div className="flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-full bg-[var(--color-navy-950)] font-[family-name:var(--font-mono)] text-[var(--color-amber-light)]">
          <span className="text-sm leading-none">{opp.opportunity_score}</span>
          <span className="text-[8px] leading-none text-[var(--color-off-white)]/50">/10</span>
        </div>
      </div>

      {opp.estimated_size && (
        <p className="mt-3 font-[family-name:var(--font-mono)] text-xs text-[var(--color-ink)]/60">
          {opp.estimated_size}
        </p>
      )}

      <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]/80">
        {opp.reason_for_relevance}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-[var(--color-navy-900)]/10 pt-4">
        <span className="text-xs text-[var(--color-ink)]/55">
          {discovered ? `Discovered ${discovered}` : ''}
        </span>
        <div className="flex items-center gap-3">
          <form action={toggleSaveOpportunity.bind(null, opp.id, isSaved)}>
            <button
              type="submit"
              className={`rounded-md border px-3 py-1.5 text-sm font-medium transition ${
                isSaved
                  ? 'border-[var(--color-amber)] bg-[var(--color-amber)]/10 text-[var(--color-amber)]'
                  : 'border-[var(--color-navy-900)]/20 text-[var(--color-ink)] hover:bg-[var(--color-off-white-alt)]'
              }`}
            >
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </form>
          <Link
            href={`/dashboard/opportunities/${opp.id}`}
            className="rounded-md bg-[var(--color-navy-900)] px-4 py-1.5 text-sm font-medium text-white hover:bg-[var(--color-navy-700)]"
          >
            View Intelligence
          </Link>
        </div>
      </div>
    </div>
  )
}