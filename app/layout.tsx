import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

const display = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${display.variable} ${body.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-[color:var(--qc-bg-deep)] antialiased">{children}</body>
    </html>
  );
}
