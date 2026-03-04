import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ConditionalLayout from "@/components/ConditionalLayout/ConditionalLayout";
import ToasterProvider from "@/components/ToasterProvider/ToasterProvider";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuickHire - Find Your Dream Job",
  description: "Discover more than 5000+ Jobs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <title>QuickHire - Find Your Dream Job</title>
      </head>
      <body className={`${epilogue.variable} font-sans antialiased`}>
        <ToasterProvider />
        <ConditionalLayout>
          <Navbar />
        </ConditionalLayout>
        <main className="min-h-screen bg-white flex flex-col">
          <div className="flex-1">{children}</div>
        </main>
        <ConditionalLayout>
          <Footer />
        </ConditionalLayout>
      </body>
    </html>
  );
}
