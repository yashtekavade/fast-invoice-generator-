# CURRENT_STATE.md

> Update whenever you complete or start a task.

---

## Completed Work

- Scaffold Next.js project with TypeScript strict mode
- Remove `public/llms.txt`
- Align Prisma schema to ARCHITECTURE.md (includes India GST fields)

---

## Current Work

- [ ] Set up Supabase project (auth + storage bucket)
- [ ] Configure TailwindCSS + shadcn/ui
- [ ] Set up Sentry + PostHog

---

## Known Bugs

None yet.

---

## Blockers

None yet.

---

## Next Priorities (in order)

1. Auth flow (login, register, OAuth, protected routes)
2. Invoice CRUD API + Zod validation
3. Invoice builder UI (form + live preview)
4. India GST fields — GSTIN, place of supply, CGST/SGST/IGST calc
5. PDF preview with `@react-pdf` — including India GST template
6. PDF final generation with Puppeteer
7. Documenso signature request flow
8. Documenso webhook handler
9. Dashboard
10. Email notifications (Resend)
11. Client management (with GSTIN field)

---

## India GST — Key decisions made

- Default currency is INR
- Place of supply determines CGST+SGST vs IGST automatically
- Financial year = April 1 – March 31; invoice numbers reset per FY
- GSTIN validated client-side (Zod regex) + server-side (gst.service.ts)
- e-Invoice IRN field reserved in schema, not implemented in v1.0
- `IndiaTemplate` is a first-class PDF template alongside Minimal and Professional
