# AMCY Trader

High-end inventory, purchasing, customer checkout, and invoice software for AMCY Trader. The application runs on Next.js App Router and uses Firebase Authentication plus Firebase Realtime Database for the live business record.

## Included

- UID-locked administrator sign-in
- Firebase-issued JWT authentication with automatic refresh and a 180-day trusted-device session
- Realtime inventory, suppliers, stock movements, purchase orders, and audit history
- Premium customer checkout with product search, quantities, discount, payment type, cash received, and change due
- Transaction-safe stock deduction when a sale is completed
- Print-ready branded receipts with customer details and invoice notes
- Dedicated authenticated invoice vault in the `amcy-traders-invoices` Firebase project
- Searchable invoice history, full invoice detail view, archive status, retry sync, and reprinting
- Transaction-safe permanent product deletion with preserved historical invoices and stock movements
- Reports and CSV inventory export
- Responsive desktop and mobile business interface
- Flat, restrained operations-system visual language without decorative gradients, glass effects, floating ornaments, neon colors, or motion-heavy hover treatments
- Dedicated full-page product, stock movement, supplier, purchase-order, and invoice workflows with reliable Cancel and Back actions
- Branded selection controls, inline validation, optional product metadata, and iOS-style activity indicators
- Security DZ with JSON backup export and phrase + 10-second + final-approval safeguards for clearing selected realtime records
- Session-locked customer workspace with an additional 8-digit access key and no customer details exposed before unlock
- Dedicated customer accounts with credit limits, payment terms, risk ratings, account managers, balances, holds, payment history, linked invoices, and CSV statements
- Credit-control dashboard with utilization, available facilities, overdue ageing, account status filters, and receivables export
- Customer activity ledger with invoices, payments, manual debits and credits, due dates, notes, and downloadable account history
- Cash register opening and closing, live daily profit, operating expenses, and date-based finance exports
- Configurable tax, invoice numbering, and warehouse defaults
- Reserved and damaged stock, barcodes, variants, batches, expiry dates, and warehouse tracking
- Partial purchase receiving, supplier invoice references, and supplier payment balances
- Item-level invoice returns with automatic stock restoration, refund tracking, and invoice-vault resync
- Validated database restore plus automatic safety backup before every Security DZ deletion
- Mobile developer handoff page at `/amcy/developer-prompt.html` with copy and plain-text download controls

## Development

Requirements: Node.js 22.13 or newer and pnpm.

```bash
pnpm install
pnpm dev
```

For a production build:

```bash
pnpm build
```

## Firebase

1. Enable Email/Password in Firebase Authentication.
2. Create the administrator account and confirm its UID is `sAYmgRLwq4g1MIYQPRrT5CeiqJB3`.
3. Publish `firebase-realtime-database.rules.json` in Firebase Console → Realtime Database → Rules.
4. Open the app and sign in with that administrator's email and password.

## Invoice vault Firebase

The separate `amcy-traders-invoices` project stores invoice records only. Enable Email/Password Authentication there, create the same administrator login credentials, and publish `firebase-invoices-realtime-database.rules.json` in that project's Realtime Database rules. Its Firebase UID may differ from the main project because invoice records are securely namespaced under the authenticated invoice-project UID.

Vercel deployment is explicitly configured as a Next.js project through `vercel.json`.

All live business data is stored under:

```text
businesses/sAYmgRLwq4g1MIYQPRrT5CeiqJB3
```

The Firebase browser configuration is intentionally public client configuration. Security is enforced by Firebase Authentication and the Realtime Database rules, not by hiding the API key.

See `FIREBASE_SETUP.md` for setup and troubleshooting details.
