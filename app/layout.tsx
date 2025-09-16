import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { TrackingProvider } from "@/components/TrackingProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Angela's Dance Academy – Dance School in Naples, FL",
    template: "%s | Angela's Dance Academy Naples, FL",
  },
  description:
    "Call (239) 215-2888. Mon–Fri 4–8pm. Visit us at 12840 Tamiami Trail N, Suite 300, Naples, FL 34110.",
  keywords: [
    "naples dance classes",
    "naples fl dance",
    "dance school naples fl",
    "dance studios near me",
    "dance school near me",
    "dance academy naples",
    "professional dance schools florida",
    "ballet classes naples",
    "jazz dance naples",
    "hip hop dance naples",
    "contemporary dance naples",
    "children dance classes naples",
    "teen dance classes naples",
    "dance lessons naples fl",
    "dance performances naples",
    "dance competitions naples",
    "dance studio naples",
    "dance training naples fl",
  ],
  authors: [{ name: "Angela's Dance Academy" }],
  creator: "Angela's Dance Academy",
  publisher: "Angela's Dance Academy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://angelasdanceacademy.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://angelasdanceacademy.com",
    title: "Angela's Dance Academy – Dance School in Naples, FL",
    description:
      "Call (239) 215-2888. Mon–Fri 4–8pm. 12840 Tamiami Trail N, Suite 300, Naples, FL 34110.",
    siteName: "Angela's Dance Academy",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Angela's Dance Academy - Premier Dance School in Naples, Florida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Angela's Dance Academy – Dance School in Naples, FL",
    description:
      "Call (239) 215-2888. Mon–Fri 4–8pm. 12840 Tamiami Trail N, Suite 300, Naples, FL 34110.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          id="site-navigation-ldjson"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "DanceSchool",
                  "@id": "https://angelasdanceacademy.com/#dance-school",
                  name: "Angela's Dance Academy",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "12840 Tamiami Trail N, Suite 300",
                    addressLocality: "naples",
                    addressRegion: "FL",
                    postalCode: "34110",
                    addressCountry: "US",
                  },
                  telephone: "(239) 215-2888",
                  url: "https://angelasdanceacademy.com",
                  openingHours: "Mo-Fr 16:00-20:00",
                },
                {
                  "@type": "WebSite",
                  name: "Angela's Dance Academy",
                  url: "https://angelasdanceacademy.com",
                },
                {
                  "@type": "SiteNavigationElement",
                  name: "Schedule",
                  url: "https://angelasdanceacademy.com/schedule",
                },
                {
                  "@type": "SiteNavigationElement",
                  name: "Classes",
                  url: "https://angelasdanceacademy.com/classes",
                },
                {
                  "@type": "SiteNavigationElement",
                  name: "Contact",
                  url: "https://angelasdanceacademy.com/contact",
                },
                {
                  "@type": "SiteNavigationElement",
                  name: "Gallery",
                  url: "https://angelasdanceacademy.com/album",
                },
              ],
            }),
          }}
        />

        <TrackingProvider>
          <div className="mx-auto max-w-[1100px] border-0 xl:border-2 border-accent md:my-20">
            <div className="w-full flex flex-col min-h-screen">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
        </TrackingProvider>
        <Analytics />
      </body>
    </html>
  );
}
