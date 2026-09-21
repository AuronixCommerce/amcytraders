"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, ShieldCheck } from "lucide-react";

export function AmcyTraderFrame() {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [frameKey, setFrameKey] = useState(0);

  function retry() {
    setLoaded(false);
    setFailed(false);
    setFrameKey((value) => value + 1);
  }

  return (
    <main className="amcy-frame-shell">
      {!loaded && !failed ? (
        <div className="amcy-boot" role="status" aria-live="polite">
          <div className="amcy-boot-mark">A</div>
          <div>
            <p>AMCY TRADER</p>
            <h1>Opening secure workspace</h1>
            <span>Connecting inventory, invoices, and live stock data…</span>
          </div>
          <div className="amcy-boot-line" aria-hidden="true"><i /></div>
        </div>
      ) : null}

      {failed ? (
        <section className="amcy-frame-error">
          <div className="amcy-error-icon"><ShieldCheck /></div>
          <p>AMCY TRADER</p>
          <h1>The workspace could not be opened</h1>
          <span>Check your connection, then try loading the secure workspace again.</span>
          <Button onClick={retry} className="amcy-retry">
            <RefreshCw /> Try again
          </Button>
        </section>
      ) : null}

      <iframe
        key={frameKey}
        className={loaded ? "amcy-app-frame is-ready" : "amcy-app-frame"}
        src="/amcy/index.html"
        title="AMCY Trader business operations"
        allow="clipboard-write"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </main>
  );
}
