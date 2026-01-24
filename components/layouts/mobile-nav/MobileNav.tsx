"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  name: string;
  href: string;
}

interface MobileNavProps {
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav = ({ navItems, isOpen, onClose }: MobileNavProps) => {
  const pathname = usePathname();

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Mobile Navigation Sidebar */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[85vw] max-w-[320px] sm:w-80 md:w-96 bg-background dark:bg-background-secondary shadow-2xl z-50 overflow-y-auto overflow-x-hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="flex flex-col h-full overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 md:p-6 border-b border-border dark:border-border-dark flex-shrink-0">
                <h2 className="text-lg sm:text-xl font-bold text-foreground truncate">Menu</h2>
                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 transition-all duration-300 flex-shrink-0"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 p-4 sm:p-5 md:p-6 overflow-y-auto overflow-x-hidden">
                <nav className="space-y-2">
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={`block px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base truncate ${
                            isActive
                              ? "bg-primary/10 text-primary border border-accent/50 dark:bg-primary/20"
                              : "text-foreground hover:bg-primary/5 hover:text-primary dark:hover:bg-primary/10"
                          }`}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* Footer CTA */}
              <div className="p-4 sm:p-5 md:p-6 border-t border-border dark:border-border-dark bg-background-secondary dark:bg-background-tertiary flex-shrink-0">
                <Link
                  href="/conntacts"
                  onClick={onClose}
                  className="block w-full bg-gradient-to-r from-primary to-tertiary hover:from-primary-light hover:to-tertiary-light text-white px-4 sm:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-lg font-semibold transition-all duration-300 text-center text-sm sm:text-base transform hover:scale-[1.02] hover:shadow-lg overflow-hidden"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;

