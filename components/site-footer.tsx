import Link from "next/link";

import { FacebookIcon, InstagramIcon, YouTubeIcon } from "@/components/icons/social-icons";
import { site } from "@/lib/site";

const SOCIALS = [
  { href: site.socials.facebook, Icon: FacebookIcon, label: "Facebook" },
  { href: site.socials.youtube, Icon: YouTubeIcon, label: "YouTube" },
  { href: site.socials.instagram, Icon: InstagramIcon, label: "Instagram" },
];

export function SiteFooter({ className }: { className?: string }) {
  return (
    <div className={`${className ?? ""} container`}>
      <footer className="border-t-1 border-border px-4 py-8 sm:px-0 sm:py-12 md:pt-12 md:pb-0 xl:py-12">
        <ul className="flex justify-center gap-x-3 sm:gap-x-4">
          {SOCIALS.map(({ href, Icon, label }) => (
            <li key={label}>
              <Link
                href={href}
                target="_blank"
                aria-label={label}
                className="group flex items-center justify-center rounded-full border-2 border-border p-2 transition-all duration-300 hover:translate-y-[-2px] hover:border-accent hover:bg-accent hover:shadow-lg sm:p-2.5"
              >
                <Icon className="h-[22px] w-[22px] text-text transition-colors duration-300 group-hover:text-white" />
              </Link>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
