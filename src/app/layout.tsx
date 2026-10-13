import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Al-Noor Sanitary & Tiles — ERP & Storefront",
  description: "Sanitary, Tile & Brass Fittings ERP: storefront, inventory, POS, accounting, and reports.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
