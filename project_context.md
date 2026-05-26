# Fast Invoice Generator - Project Context

## Overview

This document serves as the long-term context and roadmap for the "Fast Invoice Generator" project. It is intended to persist across different IDEs and AI models to provide continuity.

This project is built from the ground up to be an industry-leading, premium, and privacy-first invoice generator. The goal is to provide a seamless, local, browser-first experience that surpasses existing market solutions through superior aesthetics, performance, and advanced local-storage features.

## Tech Stack

- **Core Framework:** Vite + React (Fast, lightweight client-side application)
- **Styling:** Vanilla CSS (Custom design system for a unique, premium aesthetic)
- **PDF Generation:** `@react-pdf/renderer` (for robust, customizable PDFs)
- **Form Handling & Validation:** `react-hook-form` + `zod`
- **Storage:** LocalStorage / IndexedDB (for privacy-focused data retention)

## Key Features & Roadmap

### Phase 1: Core Foundation

- [ ] Split-pane Live PDF Preview side-by-side with a modern editor.
- [ ] Instant PDF download without any server processing.
- [ ] Gorgeous Default & Minimalist Templates.
- [ ] Multi-currency and flexible tax/VAT calculations.

### Phase 2: Advanced Local Features

- [ ] **Address Book (Client Management):** Save and auto-complete client details to save time on recurring invoices.
- [ ] **Item Catalog:** Save frequently billed items/services and their prices.
- [ ] **Invoice History:** A dashboard to view past generated invoices, track unpaid/paid status locally, and duplicate them.
- [ ] **Drafts / Auto-save:** Ensure no data is lost if the browser tab is closed.

### Phase 3: Next-Level Capabilities

- [ ] **Custom Branding:** Upload logos and choose brand colors that reflect on the PDF.
- [ ] **Export/Import Data:** Allow users to backup their local database to a JSON file.
- [ ] **QR Code Integration:** Easily add payment links or UPI QR codes directly onto the invoice.

## Notes for AI Models

- When contributing to this project, read this file to understand the current progress and long-term goals.
- Prioritize visual excellence and a premium user experience with modern UI/UX design (vibrant accents, smooth transitions, glassmorphism).
- Keep the application serverless for generating PDFs; all logic should run securely in the user's browser.
- **Do not use Tailwind CSS** unless explicitly requested by the user. Maintain the custom Vanilla CSS design system to ensure the codebase remains unique.
