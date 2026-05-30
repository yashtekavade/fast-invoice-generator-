```markdown
# PROJECT.md

## Product

**InvoiceFlow** — A free, open-source invoice generator with digital signature support and full Indian GST compliance.

Self-hostable. MIT licensed. No lock-in. Built for freelancers, consultants, and small businesses in India and globally.

---

## Target Users

- Indian freelancers and consultants who need GST-compliant invoices fast
- Small businesses wanting a self-hosted alternative to Zoho Invoice / FreshBooks
- Developers who want a clean Next.js + Supabase reference project to extend or contribute to

---

## Core Features (v1.0 — what we're building)

### Invoice builder
- [ ] Auth (email + OAuth via Supabase)
- [ ] Invoice builder — line items, tax, discount, currency (INR default)
- [ ] Invoice templates — Minimal, Professional, India GST
- [ ] PDF generation
- [ ] Invoice status lifecycle: Draft → Sent → Signed → Paid → Overdue
- [ ] Client management

### India GST compliance
- [ ] GSTIN field + format validation (seller + buyer)
- [ ] PAN field on invoices
- [ ] CGST / SGST / IGST auto-calculation based on place of supply
- [ ] HSN / SAC code per line item
- [ ] Reverse charge mechanism flag
- [ ] Tax amount in words (Indian number format)
- [ ] Invoice numbering per financial year (Apr–Mar)
- [ ] India GST invoice template (all mandatory fields)

### Digital signature (optional layer)
- [ ] Documenso integration — request signature on invoice PDF
- [ ] Webhook — auto-update invoice status when signed
- [ ] Download signed PDF

### Platform
- [ ] Dashboard — invoice list, summary stats
- [ ] Email notifications (Resend)
- [ ] Settings — profile, GSTIN, PAN, Documenso config

---

## What's NOT in v1.0

These are explicitly out of scope to keep v1.0 shippable:

- Recurring invoices
- Stripe payment links
- Multi-user / team workspaces
- e-Invoice IRN generation (schema fields reserved, API not implemented)
- Community template registry
- Public API

---

## Tech Stack

| Layer | Tool |
|---|---|
| Frontend | Next.js 14 (App Router), TailwindCSS, shadcn/ui |
| Forms | React Hook Form + Zod |
| State | Zustand (client only) |
| Backend | Next.js API routes + server actions |
| ORM | Prisma |
| Database | PostgreSQL via Supabase |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| PDF | react-pdf (preview) + Puppeteer (final) |
| Signatures | Documenso (optional, self-hosted or cloud) |
| Email | Resend |
| Deploy | Vercel |
| Monitoring | Sentry + PostHog |
| Testing | Playwright (e2e), Vitest (unit) |

---

## Coding Standards

- TypeScript strict — zero `any`
- Feature-based folder structure under `features/`
- Business logic in `services/` only — never in components
- All forms validated with Zod
- Every API route validates server-side
- Mobile-first responsive UI
- Loading + error states on every async op
- Accessible (aria, keyboard nav, focus management)
- Conventional commits: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`

---

## Open Source Goals

- MIT license
- Self-hostable via `docker-compose up`
- Clean, documented codebase — built to be contributed to
- Documenso for signatures — no proprietary lock-in
- India GST compliance baked in — not an afterthought
