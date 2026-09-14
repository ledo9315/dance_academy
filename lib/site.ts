/**
 * Single source of truth for the studio's public details. Everything that shows
 * an address, phone number or canonical URL reads from here so the site, the
 * structured data and the transactional e-mails can never drift apart.
 */
export const site = {
  name: "Angela's Dance Academy",
  shortName: "Angela's Dance Academy",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://angelasdanceacademy.com",
  description:
    "Angela's Dance Academy in Naples, FL offers dance classes & studio programs for kids & teens 3–18 in ballet, jazz, hip-hop & more.",
  email: "angelasdanceacademy@gmail.com",
  phone: {
    display: "239.215.2888",
    e164: "+12392152888",
  },
  address: {
    street: "12840 Tamiami Trail North Suite 300",
    locality: "Naples",
    region: "FL",
    postalCode: "34110",
    country: "US",
  },
  geo: {
    latitude: 26.2882,
    longitude: -81.8019,
  },
  openingHours: "Mo-Fr 16:00-20:00",
  socials: {
    facebook: "https://www.facebook.com/angelas.danceacademy",
    instagram: "https://www.instagram.com/angelasdanceacademy/",
    youtube: "https://www.youtube.com/channel/UCAg0ZZa-6O401hTmuKe9kPA",
  },
  googleReviewsUrl:
    "https://www.google.com/maps/place/Angela's+Dance+Academy/@26.288230,-81.801987,17z",
  youtubeVideoId: "zKYBXGQuFpA",
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.1810548002613!2d-81.80198696955127!3d26.288229965617816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88db1937da84011f%3A0xb520ca78872c755c!2s12840%20Tamiami%20Trail%20N%20Suite%20300%2C%20Naples%2C%20FL%2034110%2C%20USA!5e0!3m2!1sen!2s!4v1683563335525!5m2!1sen!2s",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "About" },
  { href: "/classes", label: "Classes" },
  { href: "/album", label: "Gallery" },
  { href: "/schedule", label: "Schedule" },
  { href: "/contact", label: "Contact" },
] as const;
