
# TASKS.md

> Statuses: `[ ]` todo · `[~]` in progress · `[x]` done

---

## Phase 0 — Project Setup

- [x] `chore:` Init Next.js 14 with TypeScript strict
- [ ] `chore:` Configure TailwindCSS + shadcn/ui
- [x] `chore:` Set up Prisma + connect to Supabase PostgreSQL
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

- [ ] `feat:` Prisma migrations for all models (including India fields)
- [ ] `feat:` `GET /api/invoices` — list user invoices (paginated)
- [ ] `feat:` `POST /api/invoices` — create invoice
- [ ] `feat:` `GET /api/invoices/:id`
- [ ] `feat:` `PUT /api/invoices/:id`
- [ ] `feat:` `DELETE /api/invoices/:id` — draft only
- [ ] `feat:` Zod schema for invoice (base + India GST extension)
- [ ] `feat:` `InvoiceService` — totals, tax, discount, GST breakdown
- [ ] `test:` Unit tests for `InvoiceService`

---

## Phase 3 — Invoice Builder UI

- [ ] `feat:` Invoice builder page (`/invoices/new`, `/invoices/:id/edit`)
- [ ] `feat:` `InvoiceForm` — React Hook Form + Zod
- [ ] `feat:` `LineItemRow` — add / remove / reorder
- [ ] `feat:` `CurrencyInput` (INR default, ₹ symbol)
- [ ] `feat:` `ClientSelector`
- [ ] `feat:` Tax and discount fields
- [ ] `feat:` Invoice number auto-generation (FY-aware: `INV-2025-26-0001`)
- [ ] `feat:` Due date picker
- [ ] `feat:` Live total calculation (subtotal, tax, total)
- [ ] `feat:` India mode toggle — switches form to GST fields

---

## Phase 4 — India GST Compliance

- [ ] `feat:` `GSTService` — CGST/SGST/IGST calculation based on place of supply
- [ ] `feat:` GSTIN validation — Zod regex + `gst.service.ts` server check
- [ ] `feat:` `GSTINInput` shared component with format hint + validation feedback
- [ ] `feat:` Place of supply selector (Indian states dropdown, state codes)
- [ ] `feat:` HSN/SAC code field per line item (with common codes lookup)
- [ ] `feat:` Reverse charge toggle on invoice
- [ ] `feat:` PAN field on User settings + invoice
- [ ] `feat:` Tax amount in words (Indian number system: lakh, crore)
- [ ] `feat:` Financial year logic for invoice number sequencing
- [ ] `feat:` India GST summary table in invoice preview (CGST/SGST/IGST rows)
- [ ] `feat:` GSTIN + PAN fields on Client model + form
- [ ] `test:` Unit tests for `GSTService` (intra-state vs inter-state, all rates)

---

## Phase 5 — PDF

- [ ] `feat:` `MinimalTemplate` — react-pdf component
- [ ] `feat:` `ProfessionalTemplate` — react-pdf component
- [ ] `feat:` `IndiaTemplate` — GST-compliant template with all mandatory fields
- [ ] `feat:` Template picker in invoice builder
- [ ] `feat:` `PDFPreviewPanel` — live preview inside builder
- [ ] `feat:` `POST /api/pdf/generate` — Puppeteer render + upload to Supabase Storage
- [ ] `feat:` `PdfService` — upload + signed download URL
- [ ] `feat:` Download button on invoice detail

---

## Phase 6 — Signatures (Documenso)

- [ ] `feat:` `SignatureService` — Documenso API wrapper
- [ ] `feat:` `POST /api/signatures/send`
- [ ] `feat:` `POST /api/webhooks/documenso` — handle completed event
- [ ] `feat:` Webhook HMAC verification
- [ ] `feat:` `RequestSignatureButton` component
- [ ] `feat:` `SignatureStatusBadge` component
- [ ] `feat:` Invoice status auto-update on webhook
- [ ] `feat:` Download signed PDF
- [ ] `test:` e2e — signature request + mock webhook

---

## Phase 7 — Dashboard

- [ ] `feat:` Dashboard page (`/dashboard`)
- [ ] `feat:` Invoice list with filters (status, date)
- [ ] `feat:` Stat cards (total billed, paid, outstanding, overdue)
- [ ] `feat:` `InvoiceStatusBadge` component
- [ ] `feat:` Search by invoice number or client name

---

## Phase 8 — Clients

- [ ] `feat:` Client list page
- [ ] `feat:` Create / edit client form (includes GSTIN + state code)
- [ ] `feat:` `GET /api/clients`, `POST`, `PUT /api/clients/:id`, `DELETE`

---

## Phase 9 — Email

- [ ] `feat:` `EmailService` using Resend
- [ ] `feat:` Invoice sent email template (React Email)
- [ ] `feat:` Invoice signed notification email
- [ ] `feat:` Payment reminder (manual trigger)

---

## Phase 10 — Polish + Ship

- [ ] `feat:` Settings page — profile, GSTIN, PAN, Documenso config
- [ ] `feat:` Mobile-responsive audit
- [ ] `feat:` Empty states for all list pages
- [ ] `feat:` Error boundaries
- [ ] `chore:` Rate limiting on PDF + signature routes
- [ ] `chore:` Docker Compose self-host setup
- [ ] `chore:` Full e2e test suite
- [ ] `docs:` README — self-hosting, env vars, GST setup guide

---

## Backlog (post v1.0)

- [ ] e-Invoice IRN generation via IRP API
- [ ] Recurring invoices
- [ ] Stripe payment link
- [ ] Multi-currency with live exchange rates
- [ ] Custom invoice branding
- [ ] Public API with API key management
- [ ] Team / multi-user workspace

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