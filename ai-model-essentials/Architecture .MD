# ARCHITECTURE.md

> Final, settled architecture decisions. Do not change without a new entry in DECISIONS.md first.

---

## Folder Structure


repo/ ├── app/ │ ├── (auth)/ # login, register, forgot-password │ ├── (dashboard)/ │ │ ├── invoices/ │ │ ├── clients/ │ │ └── settings/ │ ├── api/ │ │ ├── auth/ │ │ ├── invoices/ │ │ ├── pdf/ │ │ ├── signatures/ │ │ └── webhooks/ │ │ └── documenso/ │ └── layout.tsx │ ├── features/ │ ├── auth/ │ ├── invoices/ │ │ ├── components/ │ │ ├── hooks/ │ │ ├── api/ │ │ ├── validations/ # invoiceSchema.ts + indiaInvoiceSchema.ts │ │ └── types/ │ ├── clients/ │ ├── signatures/ │ ├── pdf/ │ │ ├── templates/ # MinimalTemplate, ProfessionalTemplate, IndiaTemplate │ │ └── hooks/ │ └── dashboard/ │ ├── components/ │ ├── ui/ # shadcn/ui re-exports │ ├── layout/ │ └── shared/ │ ├── services/ │ ├── invoice.service.ts │ ├── pdf.service.ts │ ├── signature.service.ts │ ├── email.service.ts │ ├── gst.service.ts # GST calculation + GSTIN validation │ └── storage.service.ts │ ├── lib/ │ ├── supabase/ │ ├── prisma.ts │ ├── documenso.ts │ ├── constants.ts # includes GST_RATES, HSN_CODES map │ └── utils.ts │ ├── hooks/ ├── prisma/ │ ├── schema.prisma │ └── migrations/ ├── styles/ ├── tests/unit/ └── e2e/playwright/ 

---

## Data Models

```prisma
model User {
  id          String   @id @default(cuid())
  email       String   @unique
  name        String?
  avatarUrl   String?
  plan        Plan     @default(FREE)
  // India fields
  gstin       String?  // 15-char GST Identification Number
  pan         String?  // 10-char PAN
  stateCode   String?  // 2-digit state code e.g. "27" for Maharashtra
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  invoices    Invoice[]
  clients     Client[]
}

model Client {
  id        String   @id @default(cuid())
  userId    String
  name      String
  email     String
  company   String?
  address   String?
  taxId     String?
  // India fields
  gstin     String?
  pan       String?
  stateCode String?  // for place-of-supply determination
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  invoices  Invoice[]
}

model Invoice {
  id              String        @id @default(cuid())
  userId          String
  clientId        String?
  number          String
  status          InvoiceStatus @default(DRAFT)
  currency        String        @default("INR")
  issueDate       DateTime
  dueDate         DateTime
  notes           String?
  taxRate         Float?        // legacy / non-GST fallback
  discountRate    Float?
  pdfUrl          String?
  totalAmount     Float
  // India GST fields
  isGstInvoice    Boolean       @default(false)
  placeOfSupply   String?       // state code of supply
  reverseCharge   Boolean       @default(false)
  cgstAmount      Float?
  sgstAmount      Float?
  igstAmount      Float?
  irnNumber       String?       // e-Invoice IRN (future)
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  user            User          @relation(fields: [userId], references: [id])
  client          Client?       @relation(fields: [clientId], references: [id])
  lineItems       LineItem[]
  signature       Signature?
}

model LineItem {
  id          String  @id @default(cuid())
  invoiceId   String
  description String
  quantity    Float
  unitPrice   Float
  taxRate     Float?
  // India fields
  hsnSacCode  String? // HSN (goods) or SAC (services) code
  cgstRate    Float?
  sgstRate    Float?
  igstRate    Float?
  invoice     Invoice @relation(fields: [invoiceId], references: [id], onDelete: Cascade)
}

model Signature {
  id              String          @id @default(cuid())
  invoiceId       String          @unique
  documensoDocId  String?
  signingUrl      String?
  status          SignatureStatus @default(PENDING)
  signedAt        DateTime?
  signedPdfUrl    String?
  createdAt       DateTime        @default(now())
  invoice         Invoice         @relation(fields: [invoiceId], references: [id])
}

enum InvoiceStatus {
  DRAFT
  SENT
  SIGNING
  SIGNED
  PAID
  OVERDUE
  CANCELLED
}

enum SignatureStatus {
  PENDING
  VIEWED
  COMPLETED
  REJECTED
}

enum Plan {
  FREE
  PRO
}


India GST Compliance
What a valid Indian GST invoice must contain
Field
Notes
Seller GSTIN
15-char alphanumeric
Buyer GSTIN
Required if registered
Invoice number
Sequential, unique per financial year
Place of supply
State code; determines CGST+SGST vs IGST
HSN/SAC code
Per line item; mandatory above ₹5 Cr turnover
Tax breakdown
CGST + SGST (intra-state) or IGST (inter-state)
Reverse charge
Boolean flag on invoice
Tax amount in words
e.g. "Rupees Two Thousand Only"
PAN of supplier
Optional but common

CGST / SGST / IGST logic
// services/gst.service.ts
type GSTSplit = { cgst: number; sgst: number; igst: number };

function calculateGST(amount: number, rate: number, intraState: boolean): GSTSplit {
  if (intraState) {
    return { cgst: (amount * rate) / 200, sgst: (amount * rate) / 200, igst: 0 };
  }
  return { cgst: 0, sgst: 0, igst: (amount * rate) / 100 };
}

Intra-state = seller's state code matches placeOfSupply. Inter-state = they differ.
GSTIN validation
GSTIN format: \d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}
First 2 digits = state code
Next 10 = PAN of taxpayer
13th char = entity number
14th = 'Z' always
15th = checksum
Validate client-side with Zod .regex() + server-side in gst.service.ts. Optionally call the GST public API to verify active status.
Standard GST rates
// lib/constants.ts
export const GST_RATES = [0, 5, 12, 18, 28] as const;
export type GSTRate = typeof GST_RATES[number];

Financial year logic
Indian FY runs April 1 – March 31. Invoice numbers reset per FY. Auto-generate as INV-2025-26-0001.
e-Invoice (IRN) — future
For businesses above ₹5 Cr, the government mandates e-invoicing via IRP (Invoice Registration Portal). The irnNumber field on Invoice is reserved for this. Not in MVP scope, but the field is there.

Documenso Integration
User clicks "Request Signature"
  → POST /api/signatures/send
    → SignatureService.createSigningRequest(invoiceId)
      1. Fetch invoice + PDF from Supabase Storage
      2. POST /api/documents to Documenso
      3. POST /api/documents/:id/send
      4. Store documensoDocId + signingUrl in Signature model
      5. Update Invoice.status = SIGNING

Documenso calls POST /api/webhooks/documenso
  → Verify HMAC
  → If document.completed:
      1. Download signed PDF
      2. Upload to Supabase Storage
      3. Update Signature.status = COMPLETED
      4. Update Invoice.status = SIGNED
      5. Send notification email

Env vars:
DOCUMENSO_API_URL=https://app.documenso.com
DOCUMENSO_API_KEY=...
DOCUMENSO_WEBHOOK_SECRET=...


PDF Generation
Two-stage:
Preview (client-side): @react-pdf/renderer inside the invoice builder
Final render (server-side): Puppeteer at /api/pdf/generate, stored in Supabase Storage
The India template (IndiaTemplate) renders the full GST breakdown table (CGST, SGST/IGST columns), HSN codes per line item, GSTIN of both parties, and tax amount in words.

Auth Strategy
Supabase Auth — email/password, Google OAuth, magic link. Prisma User synced on signup. Protected routes via middleware.ts.

State Management
Server state: RSC + TanStack Query
Form state: React Hook Form
Global UI: Zustand (sidebar, toast queue, draft invoice)

API Design
All bodies validated with Zod before DB
Errors: { error: string, code: string } + HTTP status
Auth checked on every protected route via requireAuth()
Rate limiting on /api/pdf and /api/signatures/send
