import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RentUA — Аренда жилья и автомобилей в Украине",
  description: "Посуточная аренда квартир, домов и автомобилей по всей Украине. Быстрое бронирование, низкие цены, надёжные владельцы.",
  keywords: "аренда жилья, аренда квартир, аренда авто, посуточно, Киев, Одесса, Львов, Украина",
  openGraph: {
    title: "RentUA — Аренда жилья и автомобилей",
    description: "Посуточная аренда квартир, домов и автомобилей по всей Украине",
    type: "website",
    locale: "ru_UA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
