"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import MobileNav from "../mobile-nav/MobileNav";
import ThemeToggle from "./ThemeToggle";
import { Service, Setup } from "@/types/types";

interface HeaderProps {
  setup?: Setup | null;
  services?: Service[];
}

const Header = ({ setup, services }: HeaderProps) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/service" },
    { name: "Products", href: "/products" },
    { name: "Blog", href: "/blogs" },
    { name: "Contact", href: "/conntacts" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-700 ease-out ${
          isScrolled
            ? "bg-background/80 dark:bg-background-secondary/80 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border-b border-border/50 dark:border-border-dark/50"
            : "bg-background/60 dark:bg-background-secondary/60 backdrop-blur-xl border-b border-transparent"
        }`}
        style={{ zIndex: 50 }}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-accent/8 via-primary/5 to-accent/8"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          {/* Subtle mesh gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.1),transparent_50%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              <Link href="/" className="flex items-center group">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-br from-accent/40 via-primary/30 to-accent/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Logo container */}
                  <div className="relative bg-background/90 dark:bg-background-secondary/90 backdrop-blur-md p-3 rounded-2xl border border-border/50 dark:border-border-dark/50 shadow-lg group-hover:shadow-xl group-hover:shadow-accent/20 transition-all duration-300 group-hover:border-accent/30">
                    <Image
                      src={
                        setup?.logo_small
                          ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${setup.logo_small}`
                          : setup?.logo_large
                          ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${setup.logo_large}`
                          : "/assets/images/IMG-20260117-WA0012.jpg"
                      }
                      alt="Debab Trading"
                      width={56}
                      height={56}
                      className="h-10 lg:h-12 w-auto object-contain relative z-10"
                    />
                    {/* Shine overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              {navItems.map((item, index) => {
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      className="relative px-4 py-2.5 font-medium text-sm text-foreground dark:text-foreground-secondary"
                    >
                      <span className="relative z-10">
                        {item.name}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Divider */}
              <div className="mx-4 h-10 w-px bg-gradient-to-b from-transparent via-border/60 dark:via-border-dark/60 to-transparent" />

              {/* Theme Toggle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="relative"
              >
                <ThemeToggle />
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="ml-4"
              >
                <Link
                  href={setup?.phone_numbers?.[0]?.value ? `tel:${setup.phone_numbers[0].value}` : "/conntacts"}
                  className="relative px-6 py-2.5 text-foreground dark:text-foreground-secondary font-semibold rounded-xl transition-all duration-300 group"
                >
                  {/* Content */}
                  <span className="relative z-10 flex items-center gap-2">
                    Talk to Us
                    <motion.svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 15 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </motion.svg>
                  </span>
                </Link>
              </motion.div>
            </nav>

            {/* Mobile Actions */}
            <div className="flex items-center gap-3 lg:hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <ThemeToggle />
              </motion.div>
              <motion.button
                className={`relative p-2.5 rounded-xl transition-all duration-300 ${
                  isScrolled
                    ? "bg-background-secondary/80 dark:bg-background-tertiary/80 backdrop-blur-md text-foreground hover:bg-background-secondary dark:hover:bg-background-tertiary"
                    : "bg-background-secondary/60 dark:bg-background-tertiary/60 backdrop-blur-md text-foreground hover:bg-background-secondary/80 dark:hover:bg-background-tertiary/80"
                } border border-border/30 dark:border-border-dark/30`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsMobileNavOpen(true);
                }}
                aria-label="Open navigation menu"
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {isMobileNavOpen && (
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-accent/50"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                  />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <MobileNav
        navItems={navItems}
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
};

export default Header;
