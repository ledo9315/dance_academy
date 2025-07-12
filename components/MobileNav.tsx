import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

interface Props {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  toggleActive: () => void;
  navLinks: { href: string; label: string }[];
}

export const MobileNav = ({
  isActive,
  toggleActive,
  setIsActive,
  navLinks,
}: Props) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {isActive && (
          <div
            onClick={toggleActive}
            className="absolute md:hidden inset-0 bg-black/50 backdrop-blur-sm h-screen z-50"
          >
            <motion.div
              key="mobile-menu"
              role="dialog"
              aria-modal="true"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute h-screen top-0 left-0 w-2/3 bg-accent z-10"
            >
              <button
                onClick={() => setIsActive(false)}
                className="absolute top-4 right-6 text-white cursor-pointer"
              >
                <X height={35} width={35} />
              </button>
              <nav className="relative">
                <ul className="flex flex-col items-center mt-20 space-y-6">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        onClick={() => setIsActive(false)}
                        className="text-white text-2xl uppercase"
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
