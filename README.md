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
