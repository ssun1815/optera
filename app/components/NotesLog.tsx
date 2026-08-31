import { addNote, deleteNote } from '@/app/dashboard/save-actions'

type Note = {
  id: string
  content: string
  created_at: string
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function NotesLog({ opportunityId, notes }: { opportunityId: string; notes: Note[] }) {
  return (
    <div className="rounded-lg border border-[var(--color-navy-900)]/10 bg-white p-5">
      <h3 className="font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wide text-[var(--color-ink)]/50">
        Your Notes
      </h3>

      <form action={addNote.bind(null, opportunityId)} className="mt-3">
        <textarea
          name="content"
          rows={2}
          required
          placeholder="e.g. Called the GC on 8/30, waiting on a callback about MEP bidding..."
          className="w-full rounded-md border border-[var(--color-navy-900)]/20 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="mt-2 rounded-md bg-[var(--color-navy-900)] px-3 py-1.5 text-xs font-medium text-white hover:bg-[var(--color-navy-700)]"
        >
          Add note
        </button>
      </form>

      {notes.length > 0 && (
        <ul className="mt-5 space-y-4 border-t border-[var(--color-navy-900)]/10 pt-4">
          {notes.map((note) => (
            <li key={note.id} className="border-l-2 border-[var(--color-amber)]/40 pl-3">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm leading-relaxed text-[var(--color-ink)]">{note.content}</p>
                <form action={deleteNote.bind(null, note.id, opportunityId)}>
                  <button
                    type="submit"
                    className="flex-shrink-0 text-xs text-[var(--color-ink)]/30 hover:text-red-600"
                  >
                    Remove
                  </button>
                </form>
              </div>
              <p className="mt-1 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-ink)]/40">
                {formatDate(note.created_at)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}