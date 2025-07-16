import { cn } from "@/lib/utils";
import Link from "next/link";

interface LinkProps {
  href: string;
  variant?: "default" | "default-button" | "outline-button";
  children: React.ReactNode;
  className?: string;
}

export default function LinkComponent({
  href,
  variant = "default",
  children,
  className,
}: LinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        className,
        variant === "default" &&
          "flex items-center justify-center w-fit px-2 py-1 font-sans text-sm text-accent hover:text-accent-dark rounded-none cursor-pointer active:translate-y-0.5",
        variant === "default-button" &&
          "flex items-center justify-center w-full md:w-fit px-6 py-3 font-sans text-sm bg-accent text-white hover:bg-accent-dark rounded-none cursor-pointer active:translate-y-0.5 transition-all duration-300",
        variant === "outline-button" &&
          "flex items-center justify-center w-full md:w-fit px-6 py-3 font-sans text-sm text-accent hover:text-white border-2 border-accent hover:bg-accent rounded-none cursor-pointer active:translate-y-0.5 transition-all duration-300"
      )}
    >
      {children}
    </Link>
  );
}
