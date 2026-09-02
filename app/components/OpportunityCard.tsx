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
  if (score >= 9) return { label: 'HIGH PRIORITY', className: 'bg-[var(--color-amber)] text-white' }
  if (score >= 7) return { label: 'STRONG OPPORTUNITY', className: 'bg-[var(--color-navy-700)] text-white' }
  return { label: 'POSSIBLE OPPORTUNITY', className: 'bg-slate-500 text-white' }
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
    <div className="rounded-md border border-[var(--color-border)] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition-colors hover:border-slate-300">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-1.5">
            {priority && (
              <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${priority.className}`}>
                {priority.label}
              </span>
            )}
            {urgency && (
              <span className={`inline-block rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${urgency.className}`}>
                {urgency.label}
              </span>
            )}
          </div>
          <h2 className="mt-2 text-lg font-medium text-[var(--color-navy-900)]">
            {opp.project_name}
          </h2>
          <p className="mt-1 text-sm text-[var(--color-slate-500)]">
            {opp.city}, {opp.state} · {opp.project_type}
          </p>
        </div>
        <div className="flex-shrink-0 rounded border border-[var(--color-border)] bg-slate-50 px-2.5 py-1.5 text-center">
          <div className="tabular-nums-feature text-base font-semibold leading-none text-[var(--color-ink)]">
            {opp.opportunity_score}
          </div>
          <div className="mt-0.5 text-[9px] uppercase tracking-wide text-[var(--color-slate-500)]">/10</div>
        </div>
      </div>

      {opp.estimated_size && (
        <p className="tabular-nums-feature mt-3 text-xs text-[var(--color-slate-500)]">
          {opp.estimated_size}
        </p>
      )}

      <p className="mt-3 text-sm leading-relaxed text-[var(--color-slate-700)]">
        {opp.reason_for_relevance}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
        <span className="text-xs text-[var(--color-slate-500)]">
          {discovered ? `Discovered ${discovered}` : ''}
        </span>
        <div className="flex items-center gap-3">
          <form action={toggleSaveOpportunity.bind(null, opp.id, isSaved)}>
            <button
              type="submit"
              className={`rounded border px-3 py-1.5 text-sm font-medium transition ${
                isSaved
                  ? 'border-[var(--color-amber)] bg-[var(--color-amber)]/10 text-[var(--color-amber)]'
                  : 'border-[var(--color-border)] text-[var(--color-ink)] hover:bg-slate-50'
              }`}
            >
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </form>
          <Link
            href={`/dashboard/opportunities/${opp.id}`}
            className="rounded bg-[var(--color-navy-900)] px-4 py-1.5 text-sm font-medium text-white hover:bg-[var(--color-navy-700)]"
          >
            View Intelligence
          </Link>
        </div>
      </div>
    </div>
  )
}