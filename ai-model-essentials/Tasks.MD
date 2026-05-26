# Project Tasks and Progress

## Completed

- [x] **Repository Cleanup** – removed obsolete test files, e2e folder, scrubs, and unused assets.
- [x] **Toaster Fix** – added proper import `import { Toaster } from "sonner"` and corrected CSS import to `import "sonner/dist/styles.css"` in `src/app/layout.tsx`.
- [x] **Environment Setup** – created `.env` with placeholder variables to bypass build‑time validation errors.
- [x] **Push to Remote** – initialized git, committed all files, and pushed to `https://github.com/yashtekavade/fast-invoice-generator-.git`.
- [x] **Run Dev Server** – started `npm run dev` successfully on port 3001 after fixing earlier errors.

## Upcoming (per implementation plan)

### Phase 0 – Repository Cleanup
- Remove remaining clutter like `.github/`, `docs/`, and any leftover sample data.
- Remove `public/llms.txt` (footprint of cloned repo).

### Phase 1 – Design Foundations
- Create design system (`src/styles/design.ts`).
- Update `globals.css` with glass‑morphism tokens.
- Build UI component library (Button, Card, Input, Modal, etc.).

### Phase 2 – UI Implementation
- Replace old pages with new stepper wizard.
- Integrate design system and animations.

### Phase 3 – Persistence & Enhancements
- Add auto‑save draft hook, refactor address‑book and item‑catalog hooks.

### Phase 4 – PDF
- Implement react‑pdf templates and preview panel.

### Phase 5 – Signatures (Documenso)
- Add signature service and related API routes.
