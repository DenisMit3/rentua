import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RentRF — Аренда жилья и автомобилей в России",
  description: "Посуточная аренда квартир, домов и автомобилей по всей России. Быстрое бронирование, низкие цены, надёжные владельцы.",
  keywords: "аренда жилья, аренда квартир, аренда авто, посуточно, Москва, Санкт-Петербург, Сочи, Россия",
  openGraph: {
    title: "RentRF — Аренда жилья и автомобилей",
    description: "Посуточная аренда квартир, домов и автомобилей по всей России",
    type: "website",
    locale: "ru_RU",
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
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
