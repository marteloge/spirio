import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Spirio — Finn din neste plante",
  description:
    "Skandinavisk planteregister med semantisk søk og norske vekstsoner. Over 380 planter med kjøpslenker.",
  keywords: ["planter", "hage", "vekstsoner", "norge", "blomster", "frø"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nb">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
