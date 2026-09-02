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
    'Investigate Now': { label: 'ACT NOW', className: 'border-red-200 bg-red-50 text-red-800' },
    'Follow Up': { label: 'ACT NOW', className: 'border-red-200 bg-red-50 text-red-800' },
    'Research Project Team': { label: 'RESEARCH TEAM', className: 'border-blue-200 bg-blue-50 text-blue-800' },
    'Identify Key Organisations': { label: 'IDENTIFY CONTACTS', className: 'border-blue-200 bg-blue-50 text-blue-800' },
    'Monitor Project': { label: 'MONITOR', className: 'border-slate-200 bg-slate-50 text-slate-600' },
  }
  return map[action] ?? null
}