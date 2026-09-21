# AMCY Trader

AMCY Trader is a responsive inventory and stock-operations dashboard for products, suppliers, purchase orders, stock movements, reports, CSV exports, and audit history.

## Run locally

Serve the `dist` directory with any static HTTP server. Opening `dist/index.html` directly is not recommended because browser module security may block the cloud SDK imports.

## Cloud setup

The web configuration and authorized administrator UID are defined near the top of `dist/app.js`. Email/Password authentication must be enabled in the project console. Publish `firebase-realtime-database.rules.json` to secure the live database to the configured administrator UID.

The application uses the live Realtime Database as its only operational data source. It includes a point-of-sale screen that creates invoices, deducts stock atomically, records movement history, and prints customer receipts.
