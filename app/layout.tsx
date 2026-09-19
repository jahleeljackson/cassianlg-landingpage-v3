import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Sans } from "next/font/google";
import { ChatWidget } from "@/components/ChatWidget";
import { site } from "@/lib/site";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.headline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.legalName,
  openGraph: {
    title: site.headline,
    description: site.description,
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-cream font-sans text-navy">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
