# AMCY Trader Firebase setup

1. In Firebase Authentication → Sign-in method, enable Email/Password.
2. Confirm the administrator account has UID `sAYmgRLwq4g1MIYQPRrT5CeiqJB3`.
3. Paste `firebase-realtime-database.rules.json` into Realtime Database → Rules and publish it.
4. Open AMCY Trader and sign in using that administrator account.

The application and database rules both enforce the designated administrator UID. Live inventory, invoices, sales, stock movements, suppliers, purchase orders, and audit records are stored at `businesses/sAYmgRLwq4g1MIYQPRrT5CeiqJB3`; all other authenticated users are denied access. Publish `firebase-realtime-database.rules.json` in the **amcy-traders** project (not the invoice project). These root-level rules deliberately give the designated administrator access to the complete business database so future AMCY modules do not fail on a new top-level path.

## Separate invoice vault

1. In the `amcy-traders-invoices` Firebase project, enable Email/Password Authentication.
2. AMCY Trader automatically creates the matching invoice-vault account after the main administrator login is verified. Existing vault accounts must use the same email and password.
3. Publish `firebase-invoices-realtime-database.rules.json` in that project's Realtime Database → Rules.
4. Sign out of AMCY Trader and sign back in once, or use **Point of sale → Invoice vault → Connect vault**, so both authenticated database sessions are established.

Complete invoice snapshots are stored under `invoiceVault/{invoice-project-auth-uid}/records`, with a compact searchable index under `invoiceVault/{invoice-project-auth-uid}/index`. The invoice project is never used for products, stock, suppliers, purchase orders, or other business data.
