import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import AOSProvider from "@/components/providers/AOSProvider";
import { Feature } from "@/types/types";
import { getBatchData } from "@/api/Service";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fethi Ahmed General Import & Export - Connecting Ethiopia's Finest Coffee with the World",
  description:
    "Fethi Ahmed General Import & Export is a dynamic Ethiopian trading company specializing in the export of premium specialty coffee and the import of industrial and medical equipment. Founded in 2006, we serve as a reliable bridge between Ethiopia and international markets.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const features: Feature[] = [
    { name: "about_service", amount: 4 },
    { name: "about_content", amount: 4 },
    { name: "ecommerce_product", amount: 10 },
    { name: "about_setup" },
  ];
  const data = await getBatchData(features);

  const services = data.about_service?.data ?? [];
  const about = data.about_content?.data ?? null;
  const setup = data.about_setup?.data ?? null;
  const products = data.ecommerce_product?.data ?? [];

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AOSProvider>
            <Header setup={setup} services={services}/>
            {children}
            <Footer setup={setup} products={products} />
          </AOSProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
