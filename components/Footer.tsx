"use client";

import Link from "next/link";
import { Facebook, Instagram, YouTube } from "@mui/icons-material";

interface Props {
  className?: string;
}

const SOCIALS = [
  {
    href: "#",
    Icon: Facebook,
    label: "Facebook",
  },
  {
    href: "#",
    Icon: YouTube,
    label: "YouTube",
  },
  {
    href: "#",
    Icon: Instagram,
    label: "Instagram",
  },
];

export const Footer = ({ className }: Props) => {
  return (
    <div className={className}>
      <footer className="py-12 md:pt-12 md:pb-0 xl:py-12 border-t-1 border-border">
        <ul className="flex justify-center gap-x-4">
          {SOCIALS.map(({ href, Icon, label }) => (
            <li key={label}>
              <Link
                href={href}
                aria-label={label}
                className="flex justify-center items-center border-2 border-border p-2.5 rounded-full group transition-all duration-300 hover:bg-accent hover:border-accent hover:translate-y-[-2px] hover:shadow-lg"
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
