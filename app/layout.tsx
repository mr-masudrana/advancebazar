import type { Metadata } from "next";
import "./globals.css";
import { ShopProvider } from "@/components/ShopProvider";

export const metadata: Metadata = {
  title: "ধাপ.কম - প্রিমিয়াম জুতার অনলাইন শপ",
  description: "Guest checkout footwear store"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-800 antialiased">
        <ShopProvider>{children}</ShopProvider>
      </body>
    </html>
  );
}