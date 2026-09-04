import Link from 'next/link'
import { toggleSaveOpportunity } from '@/app/dashboard/save-actions'
import { priorityLabel, urgencyBadge } from '@/app/lib/opportunity-priority'

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

const columnHeaderClass = 'px-3 py-2 text-xs font-medium uppercase tracking-wide text-[var(--color-slate-500)]'

export function OpportunityTable({
  opportunities,
  savedIds,
}: {
  opportunities: Opportunity[]
  savedIds: Set<string>
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-[var(--color-border)] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] bg-slate-50">
            <th className="w-10 px-3 py-2" aria-label="Save" />
            <th className={columnHeaderClass}>Project</th>
            <th className={columnHeaderClass}>City, State</th>
            <th className={columnHeaderClass}>Type</th>
            <th className={columnHeaderClass}>Score</th>
            <th className={columnHeaderClass}>Priority</th>
            <th className={columnHeaderClass}>Urgency</th>
            <th className={columnHeaderClass}>Stage</th>
            <th className={columnHeaderClass}>Size</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border)]">
          {opportunities.map((opp) => {
            const isSaved = savedIds.has(opp.id)
            const priority = priorityLabel(opp.opportunity_score)
            const urgency = urgencyBadge(opp.recommended_action)

            return (
              <tr key={opp.id} className="hover:bg-slate-50">
                <td className="px-3 py-2">
                  <form action={toggleSaveOpportunity.bind(null, opp.id, isSaved)}>
                    <button
                      type="submit"
                      aria-label={isSaved ? 'Remove from saved' : 'Save'}
                      className={`rounded p-1 transition ${
                        isSaved
                          ? 'text-[var(--color-amber)] hover:bg-[var(--color-amber)]/10'
                          : 'text-[var(--color-slate-500)] hover:bg-slate-100 hover:text-[var(--color-ink)]'
                      }`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={isSaved ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 3.5h12a.5.5 0 0 1 .5.5v16.5l-6.5-4-6.5 4V4a.5.5 0 0 1 .5-.5Z" />
                      </svg>
                    </button>
                  </form>
                </td>
                <td className="px-3 py-2">
                  <Link
                    href={`/dashboard/opportunities/${opp.id}`}
                    className="font-medium text-[var(--color-navy-900)] hover:underline"
                  >
                    {opp.project_name}
                  </Link>
                </td>
                <td className="px-3 py-2 text-[var(--color-slate-700)]">
                  {opp.city}, {opp.state}
                </td>
                <td className="px-3 py-2 text-[var(--color-slate-700)]">{opp.project_type}</td>
                <td className="px-3 py-2">
                  {opp.opportunity_score !== null && (
                    <span className="tabular-nums-feature rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-[var(--color-ink)]">
                      {opp.opportunity_score}
                    </span>
                  )}
                </td>
                <td className="px-3 py-2">
                  {priority && (
                    <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${priority.className}`}>
                      {priority.label}
                    </span>
                  )}
                </td>
                <td className="px-3 py-2">
                  {urgency && (
                    <span className={`inline-block rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${urgency.className}`}>
                      {urgency.label}
                    </span>
                  )}
                </td>
                <td className="px-3 py-2 text-[var(--color-slate-700)]">{opp.lifecycle_stage}</td>
                <td className="tabular-nums-feature px-3 py-2 text-[var(--color-slate-700)]">{opp.estimated_size}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
