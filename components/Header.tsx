"use client";

import { MobileNav } from "@/components/MobileNav";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const NAV_LINKS = [
    { href: "/", label: "About" },
    { href: "/classes", label: "Classes" },
    { href: "/album", label: "Gallery" },
    { href: "/schedule", label: "Schedule" },
    { href: "/contact", label: "Contact" },
  ];

  const path = usePathname();

  const [isActive, setIsActive] = useState(false);
  const toggleActive = () => setIsActive((prev) => !prev);

  return (
    <header className="flex flex-col gap-y-4 sm:gap-y-6 items-center pt-0 xl:pt-10 px-4 sm:px-6 lg:px-10 relative mb-8 sm:mb-12">
      {/* Mobile nav */}
      <div className="md:hidden w-full flex justify-center py-4">
        <button
          onClick={toggleActive}
          className="w-full py-2 border-b-2 border-accent text-accent text-xl font-bold cursor-pointer"
        >
          Menu
        </button>
      </div>
      <MobileNav
        isActive={isActive}
        toggleActive={toggleActive}
        setIsActive={setIsActive}
        navLinks={NAV_LINKS}
      />

      {/* Logo */}
      <Image
        src="/logo.jpg"
        alt="Logo"
        className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[470px] h-auto"
        width={470}
        height={200}
      />

      {/* Adresse */}
      <address className="flex flex-col md:flex-row justify-between w-full pt-6 sm:pt-8 uppercase not-italic tracking-[1.4px] text-black/50 text-xs sm:text-sm px-4 sm:px-0">
        <p className="text-center mb-2 md:mb-0">
          12840 Tamiami Trail North Suite 300
        </p>
        <p className="md:flex-1 text-center mb-2 md:mb-0">Naples, FL, 34110</p>
        <p className="text-center">239.215.2888</p>
      </address>

      {/* Desktop nav */}
      <nav className="hidden md:flex justify-between items-center w-full pt-4 sm:pt-6">
        <div className="h-0.5 bg-accent flex-1"></div>
        <ul className="flex gap-x-4 lg:gap-x-8 px-4 lg:px-6 text-black/50 uppercase text-sm font-sans">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                className={`px-2 transition-colors hover:text-accent ${
                  path === link.href ? "text-accent" : ""
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="h-0.5 bg-accent flex-1"></div>
      </nav>
    </header>
  );
}
