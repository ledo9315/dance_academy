import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ReferralTracker } from "@/components/referral-tracker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { NAV_LINKS, site } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Dance Classes for Kids & Teens 3-18 | Angela's Dance Academy",
    template: "%s | Angela's Dance Academy Naples, FL",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} – Premier Dance School Naples, FL`,
    description: `Call ${site.phone.display}. Mon–Fri 4–8pm. ${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}.`,
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} – Premier Dance School in Naples, Florida`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} – Premier Dance School Naples, FL`,
    description: `Call ${site.phone.display}. Mon–Fri 4–8pm.`,
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#14b8a5",
};

/** Site-wide schema.org graph: the business itself plus its primary navigation. */
const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["DanceSchool", "LocalBusiness"],
      "@id": `${site.url}/#dance-school`,
      name: site.name,
      url: site.url,
      telephone: site.phone.display,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.geo.latitude,
        longitude: site.geo.longitude,
      },
      openingHours: site.openingHours,
      sameAs: Object.values(site.socials),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
    },
    ...NAV_LINKS.map((link) => ({
      "@type": "SiteNavigationElement",
      name: link.label,
      url: new URL(link.href, site.url).toString(),
    })),
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StructuredData data={siteGraph} />

        <div className="mx-auto max-w-[1100px] border-0 border-accent md:my-20 xl:border-2">
          <div className="flex min-h-screen w-full flex-col">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </div>

        <ReferralTracker />
      </body>
    </html>
  );
}
