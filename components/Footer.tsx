"use client";

import Link from "next/link";
import { Facebook, Instagram, YouTube } from "@mui/icons-material";

interface Props {
  className?: string;
}

const SOCIALS = [
  {
    href: "https://www.facebook.com/angelas.danceacademy",
    Icon: Facebook,
    label: "Facebook",
  },
  {
    href: "https://www.youtube.com/channel/UCAg0ZZa-6O401hTmuKe9kPA",
    Icon: YouTube,
    label: "YouTube",
  },
  {
    href: "https://www.instagram.com/angelasdanceacademy/",
    Icon: Instagram,
    label: "Instagram",
  },
];

export const Footer = ({ className }: Props) => {
  return (
    <div className={className + " container"}>
      <footer className="py-8 sm:py-12 md:pt-12 md:pb-0 xl:py-12 border-t-1 border-border px-4 sm:px-0">
        <ul className="flex justify-center gap-x-3 sm:gap-x-4">
          {SOCIALS.map(({ href, Icon, label }) => (
            <li key={label}>
              <Link
                href={href}
                target="_blank"
                aria-label={label}
                className="flex justify-center items-center border-2 border-border p-2 sm:p-2.5 rounded-full group transition-all duration-300 hover:bg-accent hover:border-accent hover:translate-y-[-2px] hover:shadow-lg"
              >
                <Icon
                  sx={{ fontSize: 22 }}
                  className="text-text group-hover:text-white transition-colors duration-300"
                />
              </Link>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
};
