import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AMCY Trader — Inventory & Point of Sale",
  description:
    "Secure realtime inventory, purchasing, stock control, invoicing, and point-of-sale operations for AMCY Trader.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
