import Link from "next/link";
import { Fragment } from "react";

import { cn } from "@/lib/utils";

type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn(className)}>
      <ol className="flex space-x-1 font-sans text-sm">
        {items.map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 ? (
              <li className="text-gray-400" aria-hidden="true">
                /
              </li>
            ) : null}
            <li aria-current={index === items.length - 1 ? "page" : undefined}>
              {item.href ? (
                <Link href={item.href} className="text-accent">
                  {item.label}
                </Link>
              ) : (
                item.label
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
