import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import MotionProvider from "@/components/providers/MotionProvider";
import CosmicBackground from "@/components/ui/CosmicBackground";
import { SITE } from "@/lib/constants";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <a href="#main" className="skip-to-content">
          Skip to content
        </a>
        <CosmicBackground />
        <MotionProvider>
          <div className="relative z-[2]">{children}</div>
        </MotionProvider>
      </body>
    </html>
  );
}
