import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
