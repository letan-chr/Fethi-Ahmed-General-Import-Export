"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Service, Setup } from "@/types/types";

interface OffcanvasProps {
  setup?: Setup | null;
  services?: Service[];
  isOpen: boolean;
  onClose: () => void;
}

const Offcanvas = ({ isOpen, onClose, services, setup }: OffcanvasProps) => {
  const pathname = usePathname();

  // Prevent body scroll when offcanvas is open
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

  function getFAIcon(iconName?: string | null) {
    const valid =
      typeof iconName === "string" &&
      iconName.trim() !== "" &&
      (iconName.startsWith("fa ") ||
        iconName.startsWith("fa-") ||
        iconName.startsWith("fas ") ||
        iconName.startsWith("fas-") ||
        iconName.startsWith("fab ") ||
        iconName.startsWith("fab-") ||
        iconName.startsWith("far ") ||
        iconName.startsWith("far-"));

    if (valid) {
      return <i className={`${iconName} text-3xl`}></i>;
    }

    // BETTER fallback for stats
    return <i className="fa-solid fa-gem text-3xl"></i>;
  }

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

          {/* Offcanvas Sidebar */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[85vw] max-w-[320px] sm:w-80 md:w-96 bg-background dark:bg-background-secondary shadow-2xl z-50 overflow-y-auto overflow-x-hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border dark:border-border-dark">
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center group"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg group-hover:bg-accent/30 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                    <Image
                      src={
                        setup?.logo_small
                          ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${setup.logo_small}`
                          : setup?.logo_large
                          ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${setup.logo_large}`
                          : "/assets/images/photo_2026-01-20_10-55-06.jpg"
                      }
                      alt="Fethi Ahmed General Import & Export"
                      width={50}
                      height={50}
                      className="rounded-full object-cover ring-2 ring-accent/30 group-hover:ring-accent/50 transition-all duration-300 relative z-10"
                    />
                  </div>
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 transition-all duration-300"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6"
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

              {/* Services List */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-foreground mb-1">
                    Our Services
                  </h2>
                  <p className="text-sm text-foreground-secondary">
                    Explore what we offer
                  </p>
                </div>
                <ul className="space-y-3">
                  {services?.map((service, index) => {
                    const isActive = pathname === ` /service/${service.slug}`;
                    return (
                      <motion.li
                        key={service.title}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Link
                          href={`/service/${service.slug}`}
                          onClick={onClose}
                          className={`block px-4 py-4 rounded-lg border transition-all duration-300 group ${
                            isActive
                              ? "bg-primary/10 border-accent/50 dark:bg-primary/20"
                              : "border-border dark:border-border-dark hover:border-accent/30 hover:bg-primary/5 dark:hover:bg-primary/10"
                          }`}
                        >
                          <div className="flex items-start space-x-4">
                            <span className="text-3xl flex-shrink-0">
                              {getFAIcon(service.icon_class)}
                            </span>
                            <div className="flex-1 min-w-0">
                              <h3
                                className={`font-semibold mb-1.5 transition-colors ${
                                  isActive
                                    ? "text-primary"
                                    : "text-foreground group-hover:text-primary"
                                }`}
                              >
                                {service.title}
                              </h3>
                              <p className="text-sm text-foreground-secondary line-clamp-2">
                                {service.short_description}
                              </p>
                            </div>
                            <svg
                              className={`w-5 h-5 flex-shrink-0 mt-1 transition-all duration-300 ${
                                isActive
                                  ? "opacity-100 text-accent"
                                  : "opacity-0 group-hover:opacity-100 text-primary"
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>

              {/* Footer CTA */}
              <div className="p-6 border-t border-border dark:border-border-dark bg-background-secondary dark:bg-background-tertiary">
                <Link
                  href="/conntacts"
                  onClick={onClose}
                  className="block w-full bg-gradient-to-r from-primary to-tertiary hover:from-primary-light hover:to-tertiary-light text-white px-6 py-3.5 rounded-lg font-semibold transition-all duration-300 text-center transform hover:scale-[1.02] hover:shadow-lg"
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

export default Offcanvas;
