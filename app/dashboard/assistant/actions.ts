'use server'

import { createClient } from '@/app/lib/supabase/server'
import { anthropic } from '@/app/lib/anthropic'
import { redirect } from 'next/navigation'

export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

export async function askAssistant(history: ChatMessage[], question: string): Promise<string> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('status')
    .eq('user_id', user.id)
    .maybeSingle()

  if (subscription?.status !== 'active') {
    return 'You need an active subscription to use the assistant.'
  }

  const { data: opportunities } = await supabase
    .from('opportunities')
    .select('project_name, city, state, project_type, estimated_size, estimated_value, project_stage, opportunity_score, reason_for_relevance, recommended_action, timing_assessment')
    .order('opportunity_score', { ascending: false })

  const dataContext = (opportunities ?? [])
    .map((o) => `- ${o.project_name} (${o.city}, ${o.state}) | Type: ${o.project_type} | Score: ${o.opportunity_score}/10 | Stage: ${o.project_stage} | Size: ${o.estimated_size} | Value: ${o.estimated_value} | Why it matters: ${o.reason_for_relevance} | Recommended action: ${o.recommended_action} | Timing: ${o.timing_assessment}`)
    .join('\n')

  const systemPrompt = `You are Optera's assistant, helping a commercial HVAC contractor in the Dallas-Fort Worth area understand and compare opportunities in their subscribed database.

Here is the current, complete list of opportunities in the database:
${dataContext || 'No opportunities are currently in the database.'}

Rules:
- Only answer using the data provided above. Never invent project names, figures, or details not present in this list.
- If asked about something not covered by this data, say so honestly rather than guessing.
- When comparing opportunities, reference them by name and cite the specific facts (score, size, stage) that inform your comparison.
- Never claim or imply that pursuing any opportunity will guarantee a contract, sale, or lead. Optera provides researched intelligence, not guarantees.
- Keep answers concise and practical, written for a busy business owner, not a technical audience.`

  const recentHistory = history.slice(-6)

  const messages = [
    ...recentHistory.map((m) => ({ role: m.role, content: m.content })),
    { role: 'user' as const, content: question },
  ]

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system: systemPrompt,
    messages,
  })

  const textBlock = response.content.find((block: any) => block.type === 'text')
  return textBlock && 'text' in textBlock ? textBlock.text : "I couldn't generate a response. Please try again."
}