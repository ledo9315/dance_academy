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
    "https://www.google.com/search?sca_esv=a1754dd2adcb8a92&hl=de&gl=DE&sxsrf=AE3TifOmOt98lQd3pAbr2jPVlT-0PK_yPw:1755100545853&q=Angela%27s+Dance+Academy,+12840+Tamiami+Trl+N+Suite+300,+Naples,+FL+34110,+Vereinigte+Staaten&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s2T8S0LVkkD6Oiivdbxg09PJiR2B2skEv7CKEjieHl-ZS2xexjUAGSl_kCi5HcD_8bY3BUM%3D&uds=AOm0WdEAA64grrlFWuOz8hk002w9UAlglxXDltbEpvxE4qk52HL8H80nybVtsNfwNczeXkyHTUtGTwjLmFiaiG5wiw0pRVVVMlyXN1FP48kwrR5nYeYey4xJL7hztMglJT3Bmp3LYALPUkMMg0vmXjwn8AJVPRR4KhhkbJg-MTyaogpBbmQJNwLfGQ9JNZYbuLEWXRqg25JnPjS6xGVzu8EEWQMR28g4yg&sa=X&ved=2ahUKEwjHq9KEk4iPAxW2R_EDHQvCGZYQ3PALegQINBAE&biw=1180&bih=928&dpr=2",
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
