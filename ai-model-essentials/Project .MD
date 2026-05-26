# PROJECT.md

## Product

**InvoiceFlow** — An open-source, production-grade invoice generator with built-in digital signature support via [Documenso](https://github.com/documenso/documenso).

Free for self-hosters. Clean, minimal UI. Batteries included.

---

## Target Users

- Freelancers and consultants who need fast, professional invoicing
- Small businesses that want a self-hosted alternative to FreshBooks / Invoice Ninja
- Developers who want to extend or white-label an invoice tool
- Open-source contributors who want a real-world Next.js + Supabase reference project

---

## Core Features

### MVP (v1.0)
- [ ] Auth (email + OAuth via Supabase)
- [ ] Invoice builder — line items, tax, discount, currency
- [ ] Invoice templates — Minimal, Professional, Modern
- [ ] PDF generation (react-pdf or Puppeteer)
- [ ] Invoice status lifecycle: Draft → Sent → Signed → Paid → Overdue
- [ ] Documenso integration — send invoice PDF for digital signature
- [ ] Signature webhook — auto-update invoice status when signed
- [ ] Email delivery (Resend)
- [ ] Client management — save recurring client details
- [ ] Dashboard — invoice list, summary stats

### Post-MVP (v1.x)
- [ ] Recurring invoices
- [ ] Payment link (Stripe)
- [ ] Multi-currency
- [ ] Custom branding per invoice
- [ ] Community template registry
- [ ] API access for power users
- [ ] Multi-user / team workspaces

---

## Tech Stack

| Layer | Tool |
|---|---|
| Frontend | Next.js 14 (App Router), TailwindCSS, shadcn/ui, Framer Motion |
| Forms | React Hook Form + Zod |
| State | Zustand (client state only) |
| Backend | Next.js API routes (server actions where possible) |
| ORM | Prisma |
| Database | PostgreSQL (via Supabase) |
| Auth | Supabase Auth |
| Storage | Supabase Storage (PDF files) |
| PDF | react-pdf (preview) + Puppeteer (final render) |
| Signatures | Documenso API (self-hosted or cloud) |
| Email | Resend |
| Deploy | Vercel |
| Monitoring | Sentry (errors), PostHog (analytics) |
| Testing | Playwright (e2e), Vitest (unit) |

---

## Coding Standards

- TypeScript strict mode — zero `any`
- Feature-based folder structure under `features/`
- Business logic lives in `services/` and `features/*/api/` — never in components
- All forms validated with Zod schemas
- Every API route validates input server-side (never trust the client)
- Mobile-first responsive UI
- Loading and error states on every async operation
- Accessible components (aria labels, keyboard nav, focus management)
- Commits follow conventional commits: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`

---

## Documenso Integration Strategy

InvoiceFlow integrates Documenso as an **optional signing layer**. Users can:

1. Generate a PDF invoice
2. Click "Request Signature" — this calls our `/api/signatures/send` route
3. The route uploads the PDF to Documenso via its API and creates a document
4. The client receives an email from Documenso with the signing link
5. On signature completion, Documenso calls our `/api/webhooks/documenso` endpoint
6. We update the invoice status to `SIGNED` and notify the sender

Self-hosters can point `DOCUMENSO_API_URL` at their own instance. Cloud users use the Documenso SaaS API.

---

## Open Source Differentiators

1. 100% open source (MIT license)
2. Self-hostable in one `docker-compose up`
3. Community invoice templates
4. Documenso (also open source) for signatures — no proprietary lock-in
5. Clean, documented codebase designed for contribution