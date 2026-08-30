import { NextResponse } from 'next/server'
import { runDiscoveryLogic } from '@/app/lib/discovery'

export const maxDuration = 300

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await runDiscoveryLogic()
    return NextResponse.json({ success: true, ...result })
  } catch (err: any) {
    console.error('Cron discovery failed:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}