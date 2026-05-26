# TASKS.md

> Statuses: `[ ]` todo · `[~]` in progress · `[x]` done

---

## Phase 0 — Project Setup

- [ ] `chore:` Init Next.js 14 with TypeScript strict
- [ ] `chore:` Configure TailwindCSS + shadcn/ui
- [ ] `chore:` Set up Prisma + connect to Supabase PostgreSQL
- [ ] `chore:` Configure Supabase Auth
- [ ] `chore:` Create Supabase Storage bucket: `invoices`
- [ ] `chore:` Set up Sentry DSN
- [ ] `chore:` Set up PostHog key
- [ ] `chore:` Configure Vercel environment variables
- [ ] `chore:` Set up Playwright for e2e
- [ ] `docs:` Write README with self-hosting instructions

---

## Phase 1 — Auth

- [ ] `feat:` Login page (`/login`)
- [ ] `feat:` Register page (`/register`)
- [ ] `feat:` Forgot password / reset flow
- [ ] `feat:` Google OAuth button
- [ ] `feat:` Auth middleware — protect `/dashboard/**`
- [ ] `feat:` Sync Supabase Auth user → Prisma User on signup
- [ ] `test:` e2e — register + login + logout

---

## Phase 2 — Invoice Core

- [ ] `feat:` Prisma migrations for all models
- [ ] `feat:` `GET /api/invoices` — list user invoices (paginated)
- [ ] `feat:` `POST /api/invoices` — create invoice
- [ ] `feat:` `GET /api/invoices/:id` — get single invoice
- [ ] `feat:` `PUT /api/invoices/:id` — update invoice
- [ ] `feat:` `DELETE /api/invoices/:id` — delete draft invoice
- [ ] `feat:` Zod schema for invoice creation/update
- [ ] `feat:` `InvoiceService` — business logic (calculate totals, tax, discount)
- [ ] `test:` Unit tests for `InvoiceService`

---

## Phase 3 — Invoice Builder UI

- [ ] `feat:` Invoice builder page (`/invoices/new`, `/invoices/:id/edit`)
- [ ] `feat:` `InvoiceForm` component — React Hook Form + Zod
- [ ] `feat:` `LineItemRow` — add / remove / reorder line items
- [ ] `feat:` `CurrencyInput` shared component
- [ ] `feat:` `ClientSelector` — select saved client or enter ad-hoc
- [ ] `feat:` Tax and discount fields
- [ ] `feat:` Invoice number auto-generation
- [ ] `feat:` Due date picker
- [ ] `feat:` Live total calculation (subtotal, tax, discount, total)

---

## Phase 4 — PDF

- [ ] `feat:` `MinimalTemplate` — react-pdf component
- [ ] `feat:` `ProfessionalTemplate` — react-pdf component
- [ ] `feat:` `ModernTemplate` — react-pdf component
- [ ] `feat:` Template picker in invoice builder
- [ ] `feat:` `PDFPreviewPanel` — live PDF preview inside builder
- [ ] `feat:` `POST /api/pdf/generate` — Puppeteer render + upload to Supabase Storage
- [ ] `feat:` `PdfService` — upload + get signed download URL
- [ ] `feat:` Download button on invoice detail page

---

## Phase 5 — Signatures (Documenso)

- [ ] `feat:` `SignatureService` — Documenso API client wrapper
- [ ] `feat:` `POST /api/signatures/send` — create Documenso document + send
- [ ] `feat:` `POST /api/webhooks/documenso` — handle signature completed event
- [ ] `feat:` Webhook HMAC verification
- [ ] `feat:` `RequestSignatureButton` component
- [ ] `feat:` `SignatureStatusBadge` component
- [ ] `feat:` Invoice status auto-update on signature webhook
- [ ] `feat:` Download signed PDF on invoice detail
- [ ] `test:` e2e — signature request + mock webhook

---

## Phase 6 — Dashboard

- [ ] `feat:` Dashboard page (`/dashboard`)
- [ ] `feat:` Invoice list table with filters (status, date)
- [ ] `feat:` Summary stat cards (total billed, paid, outstanding, overdue)
- [ ] `feat:` `InvoiceStatusBadge` shared component
- [ ] `feat:` Search invoices by number or client name

---

## Phase 7 — Clients

- [ ] `feat:` Client list page
- [ ] `feat:` Create / edit client form
- [ ] `feat:` `GET /api/clients`, `POST /api/clients`, `PUT /api/clients/:id`, `DELETE /api/clients/:id`

---

## Phase 8 — Email

- [ ] `feat:` `EmailService` using Resend
- [ ] `feat:` Invoice sent email template (React Email)
- [ ] `feat:` Invoice signed notification email
- [ ] `feat:` Payment reminder email (manual trigger)

---

## Phase 9 — Polish

- [ ] `feat:` Settings page — profile, branding, Documenso config
- [ ] `feat:` Mobile-responsive audit of all pages
- [ ] `feat:` Framer Motion transitions on page nav and modals
- [ ] `feat:` Empty states for all list pages
- [ ] `feat:` Error boundaries
- [ ] `chore:` Rate limiting on PDF + signature API routes
- [ ] `chore:` Full e2e test suite

---

## Backlog (Post v1.0)

- [ ] Recurring invoices
- [ ] Stripe payment link on invoice
- [ ] Multi-currency with live exchange rates
- [ ] Custom invoice branding (logo, colors)
- [ ] Community template registry
- [ ] Public API with API key management
- [ ] Team / multi-user workspace
- [ ] Docker Compose self-host setup