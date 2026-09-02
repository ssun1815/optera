@AGENTS.md

# Optrace

B2B SaaS commercial opportunity intelligence platform for HVAC contractors in Dallas-Fort Worth, Texas. Surfaces verified, scored commercial/industrial development projects (warehouses, data centers, healthcare, hotels, offices, manufacturing) as potential contracting opportunities.

Formerly named "Optera" - fully renamed to "Optrace" (check for any stray "Optera" references before shipping).

## Core Principle

Opportunities must be verified and never fabricated. This is a non-negotiable product value, not just a legal safety measure. Never invent statistics, permit numbers, customer testimonials, or capabilities the product doesn't actually have - even for marketing/demo purposes.

## Stack

Next.js (App Router), Supabase (Postgres + Auth), Stripe, Vercel, Tailwind CSS.

## Design System

- Colors defined as CSS variables in `app/globals.css` - primary accent is blue (`--color-amber`, kept the old variable name for continuity but it holds a blue hex value now), navy for dark surfaces, slate for neutrals/borders
- Fonts: Manrope (headings, via `next/font/google`), Inter (body), JetBrains Mono (data/technical labels), Newsreader serif italic (reserved ONLY for the biggest marketing headline moments - hero H1 and closing CTA - never used elsewhere)
- Radius: 4-6px (`rounded-md`), not large/rounded-xl - deliberately tightened from an earlier, more consumer-app-feeling version
- Cards: white background, 1px `--color-border` border, subtle shadow (`shadow-[0_1px_2px_rgba(15,23,42,0.05)]`) - not heavy floating drop-shadows
- Shared components: `app/components/Header.tsx`, `app/components/OpportunityCard.tsx`, `app/components/FloatingAssistantButton.tsx`, `app/components/NotesLog.tsx`

## Known Gotchas (learned the hard way this session)

1. **macOS filesystem is case-insensitive; Vercel's Linux build isn't.** A file saved as `header.tsx` when the import says `Header.tsx` will work locally and break silently in production. Double check casing on any new component file.
2. **New Supabase tables need explicit grants, not just RLS policies.** This project has "Automatically expose new tables" disabled (a deliberate security choice at project creation), so every new table needs `grant select/insert/update/delete on public.table_name to authenticated;` (and to `service_role` if the admin client touches it) or every query will silently fail with "permission denied."
3. **Vercel Hobby-tier cron jobs run at most once per day**, landing sometime within the scheduled hour, not to the exact minute.
4. **The AI discovery pipeline (`app/lib/discovery.ts`) sometimes prepends stray commentary or citation markup to its JSON response despite instructions.** The parser strips this defensively (finds the first `[` and last `]`), but if you change the prompt, keep an eye on this.
5. **Dynamic route folders need real nesting** - `app/dashboard/opportunities/[id]/` as an actual folder-in-folder structure, never a single folder literally named `opportunities[id]`.

## Current State (as of this writing)

Full customer journey works: landing page -> signup -> email confirmation -> Stripe subscription ($99 first month / $149/mo, sandbox mode) -> gated dashboard -> filtered opportunity list with priority sorting -> full intelligence detail pages (why flagged, recommended action, lifecycle timeline, organisations involved, who to approach) -> save + timestamped notes log -> AI assistant chat grounded only in real database content.

Admin-only AI research pipeline (`/admin`, gated by `ADMIN_EMAIL` env var) runs daily via Vercel Cron, drafts candidate opportunities into a staging table, and requires manual human approval before anything reaches the live customer-facing database.

Forgot-password flow is built (`/forgot-password`, `/reset-password`) but not yet functional - blocked on setting up custom SMTP (Resend), since Supabase's default email service won't let templates be edited without it. This needs to happen alongside buying a custom domain.

## Not Yet Done

- Custom domain purchase + DNS + updating `NEXT_PUBLIC_SITE_URL` and Supabase redirect URLs to match
- Custom SMTP (Resend) setup, then finish wiring the password reset email template
- Switching Stripe from sandbox to live mode (deliberately deferred until legal pages get a real review and the product is more stable)
- Table/card view toggle for the dashboard (currently card-only; discussed as a future enhancement, not yet built)