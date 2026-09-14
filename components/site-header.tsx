"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { MobileNav } from "@/components/mobile-nav";
import { NAV_LINKS, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="relative mb-8 flex flex-col items-center gap-y-4 px-4 pt-0 sm:mb-12 sm:gap-y-6 sm:px-6 lg:px-10 xl:pt-10">
      <div className="flex w-full justify-center py-4 md:hidden">
        <button
          type="button"
          onClick={() => setIsNavOpen(true)}
          aria-expanded={isNavOpen}
          aria-controls="mobile-navigation"
          className="w-full cursor-pointer border-b-2 border-accent py-2 text-xl font-bold text-accent"
        >
          Menu
        </button>
      </div>

      <MobileNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

      <Link href="/" aria-label={`${site.name} — home`}>
        <Image
          src="/logo.jpg"
          alt={site.name}
          className="h-auto w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[470px]"
          width={470}
          height={200}
          priority
        />
      </Link>

      <address className="flex w-full flex-col justify-between px-4 pt-6 text-xs tracking-[1.4px] text-black/50 uppercase not-italic sm:px-0 sm:pt-8 sm:text-sm md:flex-row">
        <p className="mb-2 text-center md:mb-0">{site.address.street}</p>
        <p className="mb-2 text-center md:mb-0 md:flex-1">
          {site.address.locality}, {site.address.region}, {site.address.postalCode}
        </p>
        <p className="text-center">
          <a href={`tel:${site.phone.e164}`} className="transition-colors hover:text-accent">
            {site.phone.display}
          </a>
        </p>
      </address>

      <nav
        aria-label="Main"
        className="hidden w-full items-center justify-between pt-4 sm:pt-6 md:flex"
      >
        <div className="h-0.5 flex-1 bg-accent" />
        <ul className="flex gap-x-4 px-4 font-sans text-sm text-black/50 uppercase lg:gap-x-8 lg:px-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "px-2 transition-colors hover:text-accent",
                  pathname === link.href && "text-accent",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="h-0.5 flex-1 bg-accent" />
      </nav>
    </header>
  );
}
