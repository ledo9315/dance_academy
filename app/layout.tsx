import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { TrackingProvider } from "@/components/TrackingProvider";

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
    default:
      "Angela's Dance Academy - #1 Dance School in Naples, Florida | Ballet, Jazz, Contemporary",
    template: "%s | Angela's Dance Academy Naples, FL",
  },
  description:
    "Angela's Dance Academy is the premier dance school in Naples, Florida. Offering ballet, jazz, contemporary, and hip hop classes for ages 3-18. 4.9★ rated with 28+ reviews. Located at 12840 Tamiami Trail N Suite 300.",
  keywords: [
    "dance classes Naples FL",
    "dance school Naples FL",
    "dance academy Naples FL",
    "dance studio Naples FL",
    "dance lessons Naples FL",
    "dance classes Naples FL",
    "dance school Naples FL",
    "dance academy Naples FL",
    "naples dance",
    "naples dance studio",
    "naples dance school",
    "naples dance academy",
    "naples dance lessons",
    "naples dance classes",
    "naples dance school",
    "naples dance academy",
    "ballet classes Naples Florida",
    "jazz dance classes Naples",
    "dance academy Naples Florida",
    "children dance classes Naples",
    "dance lessons Naples FL",
    "competitive dance team Naples",
    "dance school Naples Florida",
    "ballet lessons Naples",
    "jazz dance Naples",
    "contemporary dance Naples",
    "hip hop dance classes Naples",
    "dance training Naples FL",
    "dance instructor Naples",
    "dance performance Naples",
    "dance competition Naples Florida",
    "dance recital Naples",
    "dance costumes Naples",
    "dance education Naples FL",
    "toddler dance classes Naples",
    "preschool dance Naples",
    "teen dance classes Naples",
    "adult dance classes Naples",
    "dance fitness Naples",
    "dance studios Naples",
    "dance technique Naples",
    "dance choreography Naples",
    "dance studio near me Naples",
    "best dance school Naples",
    "top dance academy Naples Florida",
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
    title: "Angela's Dance Academy - #1 Dance School in Naples, Florida",
    description:
      "Premier dance academy in Naples, Florida with 4.9★ rating. Professional ballet, jazz, arco contemporary & hip hop classes for ages 3-18. Visit us at 12840 Tamiami Trail N Suite 300.",
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
    title: "Angela's Dance Academy - #1 Dance School Naples, FL",
    description:
      "4.9★ rated dance academy in Naples, Florida. Professional instruction for all ages. Ballet, jazz, contemporary & hip hop classes.",
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
