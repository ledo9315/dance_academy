import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus:outline-none focus:border-accent",
  {
    variants: {
      variant: {
        default:
          "font-sans text-sm bg-accent text-white hover:bg-accent-dark rounded-none cursor-pointer active:translate-y-0.5",
        destructive:
          "font-sans text-sm text-red-600 hover:text-white border-2 border-red-600 hover:bg-red-600 rounded-none cursor-pointer active:translate-y-0.5 active:border-red-600 visited:border-red-600",
        outline:
          "font-sans text-sm text-accent hover:text-white border-2 border-accent hover:bg-accent rounded-none cursor-pointer active:translate-y-0.5",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-8 py-3 w-full md:w-fit",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        full: "px-8 py-3 w-full",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
