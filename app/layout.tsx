import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Unhired.fun — Still unemployed? At least get ranked.",
    template: "%s · Unhired.fun",
  },
  description:
    "Turn your job-search misery into a score, rank and shareable badge. Scientifically questionable. Emotionally accurate.",
  openGraph: {
    title: "Unhired.fun",
    description: "Still unemployed? At least get ranked.",
    url: siteUrl,
    siteName: "Unhired.fun",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unhired.fun",
    description: "Still unemployed? At least get ranked.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💀</text></svg>" />
      </head>
      <body>
        {children}
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token":"b2b882d6f379412caf5ae118f9833f8d"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
