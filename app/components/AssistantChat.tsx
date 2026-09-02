'use client'

import { useState, useTransition } from 'react'
import ReactMarkdown from 'react-markdown'
import { askAssistant, type ChatMessage } from '@/app/dashboard/assistant/actions'

export function AssistantChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const question = input.trim()
    if (!question) return

    const newHistory = [...messages, { role: 'user' as const, content: question }]
    setMessages(newHistory)
    setInput('')

    startTransition(async () => {
      const answer = await askAssistant(messages, question)
      setMessages([...newHistory, { role: 'assistant' as const, content: answer }])
    })
  }

  return (
    <div className="flex h-[70vh] flex-col rounded-lg border border-[var(--color-navy-900)]/10 bg-white">
      <div className="flex-1 space-y-4 overflow-y-auto p-6">
        {messages.length === 0 && (
          <p className="text-sm text-[var(--color-ink)]/50">
            Ask about opportunities in your database - for example, "Which opportunity has the biggest HVAC scope?" or "Compare the data center opportunities."
          </p>
        )}
        {messages.map((m, i) =>
          m.role === 'user' ? (
            <div key={i} className="text-right">
              <div className="inline-block max-w-[85%] rounded-lg bg-[var(--color-navy-900)] px-4 py-2 text-sm leading-relaxed text-white">
                {m.content}
              </div>
            </div>
          ) : (
            <div key={i} className="rounded-lg bg-[var(--color-off-white-alt)] px-4 py-3">
              <ReactMarkdown
                components={{
                  h1: ({ ...props }) => <h3 className="mt-2 text-base font-semibold text-[var(--color-navy-900)] first:mt-0" {...props} />,
                  h2: ({ ...props }) => <h4 className="mt-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-amber)] first:mt-0" {...props} />,
                  h3: ({ ...props }) => <h4 className="mt-2 text-sm font-medium text-[var(--color-navy-900)] first:mt-0" {...props} />,
                  p: ({ ...props }) => <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink)] first:mt-0" {...props} />,
                  ul: ({ ...props }) => <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-[var(--color-ink)]" {...props} />,
                  ol: ({ ...props }) => <ol className="mt-1.5 list-decimal space-y-1 pl-5 text-sm text-[var(--color-ink)]" {...props} />,
                  li: ({ ...props }) => <li {...props} />,
                  strong: ({ ...props }) => <strong className="font-semibold text-[var(--color-navy-900)]" {...props} />,
                  hr: () => <hr className="my-3 border-[var(--color-navy-900)]/10" />,
                }}
              >
                {m.content}
              </ReactMarkdown>
            </div>
          )
        )}
        {isPending && (
          <div className="text-left">
            <div className="inline-block rounded-lg bg-[var(--color-off-white-alt)] px-4 py-2 text-sm text-[var(--color-ink)]/50">
              Thinking...
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 border-t border-[var(--color-navy-900)]/10 p-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your opportunities..."
          disabled={isPending}
          className="flex-1 rounded-md border border-[var(--color-navy-900)]/20 px-3 py-2 text-sm disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isPending || !input.trim()}
          className="rounded-md bg-[var(--color-amber)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-amber-light)] disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  )
}