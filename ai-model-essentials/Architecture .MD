# ARCHITECTURE.md

> This file contains final, settled architecture decisions. Do not change these without creating a new entry in DECISIONS.md first.

---

## Folder Structure

```
repo/
├── app/                        # Next.js App Router pages and layouts
│   ├── (auth)/                 # Route group: login, register, forgot-password
│   ├── (dashboard)/            # Route group: protected app pages
│   │   ├── invoices/
│   │   ├── clients/
│   │   └── settings/
│   ├── api/                    # API routes
│   │   ├── auth/
│   │   ├── invoices/
│   │   ├── pdf/
│   │   ├── signatures/
│   │   └── webhooks/
│   │       └── documenso/
│   └── layout.tsx
│
├── features/                   # Feature modules (business logic + UI per domain)
│   ├── auth/
│   │   ├── components/         # LoginForm, RegisterForm, OAuthButtons
│   │   ├── hooks/              # useSession, useAuth
│   │   ├── api/                # server actions or route handlers
│   │   ├── validations/        # loginSchema, registerSchema (Zod)
│   │   └── types/
│   ├── invoices/
│   │   ├── components/         # InvoiceForm, InvoiceList, InvoicePreview, LineItemRow
│   │   ├── hooks/              # useInvoice, useInvoiceList
│   │   ├── api/                # invoice server actions
│   │   ├── validations/        # invoiceSchema (Zod)
│   │   └── types/              # Invoice, LineItem, InvoiceStatus
│   ├── clients/
│   ├── signatures/
│   │   ├── components/         # SignatureStatusBadge, RequestSignatureButton
│   │   ├── hooks/              # useSignatureStatus
│   │   └── types/
│   ├── pdf/
│   │   ├── templates/          # MinimalTemplate, ProfessionalTemplate, ModernTemplate
│   │   └── hooks/              # usePdfPreview
│   └── dashboard/
│
├── components/                 # Shared, domain-agnostic UI components
│   ├── ui/                     # shadcn/ui re-exports and overrides
│   ├── layout/                 # AppShell, Sidebar, TopBar
│   └── shared/                 # StatusBadge, CurrencyInput, DatePicker
│
├── services/                   # Pure business logic, no framework dependencies
│   ├── invoice.service.ts
│   ├── pdf.service.ts
│   ├── signature.service.ts    # Documenso API client
│   ├── email.service.ts        # Resend client
│   └── storage.service.ts      # Supabase Storage client
│
├── lib/                        # Config, utilities, constants
│   ├── supabase/               # supabase client (server + client)
│   ├── prisma.ts               # Prisma client singleton
│   ├── documenso.ts            # Documenso API client config
│   ├── constants.ts
│   └── utils.ts
│
├── hooks/                      # Shared React hooks (not feature-specific)
│   ├── use-toast.ts
│   └── use-media-query.ts
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── styles/
│   └── globals.css
│
├── tests/
│   └── unit/
│
└── e2e/
    └── playwright/
```

---

## Data Models

```prisma
// prisma/schema.prisma

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  avatarUrl     String?
  plan          Plan      @default(FREE)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  invoices      Invoice[]
  clients       Client[]
}

model Client {
  id            String    @id @default(cuid())
  userId        String
  name          String
  email         String
  company       String?
  address       String?
  taxId         String?
  createdAt     DateTime  @default(now())

  user          User      @relation(fields: [userId], references: [id])
  invoices      Invoice[]
}

model Invoice {
  id            String          @id @default(cuid())
  userId        String
  clientId      String?
  number        String
  status        InvoiceStatus   @default(DRAFT)
  currency      String          @default("USD")
  issueDate     DateTime
  dueDate       DateTime
  notes         String?
  taxRate       Float?
  discountRate  Float?
  pdfUrl        String?
  totalAmount   Float
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt

  user          User            @relation(fields: [userId], references: [id])
  client        Client?         @relation(fields: [clientId], references: [id])
  lineItems     LineItem[]
  signature     Signature?
}

model LineItem {
  id            String    @id @default(cuid())
  invoiceId     String
  description   String
  quantity      Float
  unitPrice     Float
  taxRate       Float?

  invoice       Invoice   @relation(fields: [invoiceId], references: [id], onDelete: Cascade)
}

model Signature {
  id                String            @id @default(cuid())
  invoiceId         String            @unique
  documensoDocId    String?
  signingUrl        String?
  status            SignatureStatus   @default(PENDING)
  signedAt          DateTime?
  signedPdfUrl      String?
  createdAt         DateTime          @default(now())

  invoice           Invoice           @relation(fields: [invoiceId], references: [id])
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
```

---

## Documenso Integration

**Flow:**

```
User clicks "Request Signature"
  → POST /api/signatures/send
    → SignatureService.createSigningRequest(invoiceId)
      1. Fetch invoice + PDF from Supabase Storage
      2. POST /api/documents to Documenso (upload PDF)
      3. POST /api/documents/:id/send to Documenso (set recipients, trigger email)
      4. Store documensoDocId + signingUrl in Signature model
      5. Update Invoice.status = SIGNING
      6. Return signing URL to client

Documenso calls POST /api/webhooks/documenso
  → Verify webhook signature (HMAC)
  → If event = document.completed:
      1. Download signed PDF from Documenso
      2. Upload to Supabase Storage
      3. Update Signature.status = COMPLETED
      4. Update Signature.signedPdfUrl
      5. Update Invoice.status = SIGNED
      6. Send notification email to invoice owner
```

**Env vars needed:**
```
DOCUMENSO_API_URL=https://app.documenso.com   # or self-hosted URL
DOCUMENSO_API_KEY=...
DOCUMENSO_WEBHOOK_SECRET=...
```

---

## PDF Generation Strategy

Two-stage approach:
1. **Preview (client-side):** `@react-pdf/renderer` renders a `<PDFViewer>` inside the invoice builder for instant feedback
2. **Final render (server-side):** `/api/pdf/generate` uses Puppeteer to render the invoice page at a fixed URL and produce a production-quality PDF, stored in Supabase Storage

Reason: `@react-pdf` is fast and good for preview; Puppeteer gives pixel-perfect output with full CSS support for the final document.

---

## Auth Strategy

Supabase Auth handles:
- Email + password
- Google OAuth
- Magic link

Session is managed by Supabase client. Server components read session via `supabase.auth.getUser()`. Protected routes use a middleware check in `middleware.ts`.

Prisma `User` model is synced from Supabase Auth via a `auth.users` trigger or a signup API route — Supabase is the source of truth for identity, Prisma is for application data.

---

## State Management

- Server state: React Server Components + SWR/TanStack Query for client-side fetching
- Form state: React Hook Form (local)
- Global UI state: Zustand (sidebar open/close, current invoice draft, toast queue)
- No Zustand for server data — that lives in the query cache

---

## API Design Principles

- All POST/PUT/PATCH bodies validated with Zod before touching the DB
- Errors returned as `{ error: string, code: string }` with appropriate HTTP status
- Auth checked on every protected route via `requireAuth()` helper
- Rate limiting on `/api/pdf` and `/api/signatures/send` (Upstash Redis or Vercel KV)