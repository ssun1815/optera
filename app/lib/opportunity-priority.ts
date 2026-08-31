export function actionPriorityRank(action: string | null): number {
  const order: Record<string, number> = {
    'Investigate Now': 1,
    'Follow Up': 2,
    'Research Project Team': 3,
    'Identify Key Organisations': 4,
    'Monitor Project': 5,
  }
  return action && order[action] ? order[action] : 6
}

export function urgencyBadge(action: string | null): { label: string; className: string } | null {
  if (!action) return null
  const map: Record<string, { label: string; className: string }> = {
    'Investigate Now': { label: 'ACT NOW', className: 'border-red-200 bg-red-50 text-red-700' },
    'Follow Up': { label: 'ACT NOW', className: 'border-red-200 bg-red-50 text-red-700' },
    'Research Project Team': { label: 'RESEARCH TEAM', className: 'border-[var(--color-amber)]/30 bg-[var(--color-amber)]/10 text-[var(--color-amber)]' },
    'Identify Key Organisations': { label: 'IDENTIFY CONTACTS', className: 'border-[var(--color-amber)]/30 bg-[var(--color-amber)]/10 text-[var(--color-amber)]' },
    'Monitor Project': { label: 'MONITOR', className: 'border-[var(--color-navy-900)]/10 bg-[var(--color-off-white-alt)] text-[var(--color-ink)]/60' },
  }
  return map[action] ?? null
}