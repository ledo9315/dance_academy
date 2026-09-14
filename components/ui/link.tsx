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
          "flex w-fit cursor-pointer items-center justify-center rounded-none px-2 py-1 font-sans text-sm text-accent hover:text-accent-dark active:translate-y-0.5",
        variant === "default-button" &&
          "flex w-full cursor-pointer items-center justify-center rounded-none bg-accent px-6 py-3 font-sans text-sm text-white transition-all duration-300 hover:bg-accent-dark active:translate-y-0.5 md:w-fit",
        variant === "outline-button" &&
          "flex w-full cursor-pointer items-center justify-center rounded-none border-2 border-accent px-6 py-3 font-sans text-sm text-accent transition-all duration-300 hover:bg-accent hover:text-white active:translate-y-0.5 md:w-fit",
      )}
    >
      {children}
    </Link>
  );
}
