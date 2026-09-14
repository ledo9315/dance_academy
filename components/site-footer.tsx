import Link from "next/link";

import { FacebookIcon, InstagramIcon, YouTubeIcon } from "@/components/icons/social-icons";
import { site } from "@/lib/site";

const SOCIALS = [
  { href: site.socials.facebook, Icon: FacebookIcon, label: "Facebook" },
  { href: site.socials.youtube, Icon: YouTubeIcon, label: "YouTube" },
  { href: site.socials.instagram, Icon: InstagramIcon, label: "Instagram" },
];

export function SiteFooter() {
  return (
    <footer className="container border-t border-border px-4 py-8 sm:px-0 sm:py-12 md:pt-12 md:pb-0 xl:py-12">
      <ul className="flex justify-center gap-x-3 sm:gap-x-4">
        {SOCIALS.map(({ href, Icon, label }) => (
          <li key={label}>
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group flex items-center justify-center rounded-full border-2 border-border p-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:shadow-lg sm:p-2.5"
            >
              <Icon className="h-[22px] w-[22px] text-text transition-colors duration-300 group-hover:text-white" />
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center font-sans text-xs text-text">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
