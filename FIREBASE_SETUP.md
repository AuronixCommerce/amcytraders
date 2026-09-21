# AMCY Trader Firebase setup

1. In Firebase Authentication → Sign-in method, enable Email/Password.
2. Confirm the administrator account has UID `sAYmgRLwq4g1MIYQPRrT5CeiqJB3`.
3. Paste `firebase-realtime-database.rules.json` into Realtime Database → Rules and publish it.
4. Open AMCY Trader and sign in using that administrator account.

The application and database rules both enforce the designated administrator UID. Live data is stored at `businesses/sAYmgRLwq4g1MIYQPRrT5CeiqJB3`; all other authenticated users are denied access.
