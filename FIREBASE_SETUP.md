# AMCY Trader Firebase setup

1. In Firebase Authentication → Sign-in method, enable Email/Password.
2. Confirm the administrator account has UID `sAYmgRLwq4g1MIYQPRrT5CeiqJB3`.
3. Paste `firebase-realtime-database.rules.json` into Realtime Database → Rules and publish it.
4. Open AMCY Trader and sign in using that administrator account.

The application and database rules both enforce the designated administrator UID. Live inventory, invoices, sales, stock movements, suppliers, purchase orders, and audit records are stored at `businesses/sAYmgRLwq4g1MIYQPRrT5CeiqJB3`; all other authenticated users are denied access.

## Separate invoice vault

1. In the `amcy-traders-invoices` Firebase project, enable Email/Password Authentication.
2. Create an administrator account using the same email and password as the main AMCY administrator. Its Firebase UID may be different.
3. Publish `firebase-invoices-realtime-database.rules.json` in that project's Realtime Database → Rules.
4. Sign out of AMCY Trader and sign back in once so both authenticated database sessions are established.

Complete invoice snapshots are stored under `invoiceVault/{invoice-project-auth-uid}/records`, with a compact searchable index under `invoiceVault/{invoice-project-auth-uid}/index`. The invoice project is never used for products, stock, suppliers, purchase orders, or other business data.
