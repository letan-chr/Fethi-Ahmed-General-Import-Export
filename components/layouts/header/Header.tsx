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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-black/40 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-white/10"
            : "bg-black/5 backdrop-blur-md"
        }`}
      >
        {/* Glass morphism overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-white/20 via-transparent to-transparent dark:from-black/20 pointer-events-none" />
        
        {/* Subtle gradient accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-10"
            >
              <Link href="/" className="flex items-center">
                <div className="relative p-1 h-[62px] lg:h-[78px] flex items-center justify-center">
                  <Image
                    src={
                      setup?.logo_small
                        ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${setup.logo_small}`
                        : setup?.logo_large
                        ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${setup.logo_large}`
                        : "/assets/images/IMG-20260117-WA0012.jpg"
                    }
                    alt="Fethi Ahmed General Import & Export"
                    width={160}
                    height={160}
                    className=" transition-all duration-300 relative z-10"
                  />
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`relative px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-white/90 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-primary/5 rounded-lg"
                          layoutId="active-nav"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">{item.name}</span>
                      {isActive && (
                        <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary rounded-full -translate-x-1/2" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Action Buttons Container */}
              <div className="flex items-center ml-6 space-x-4">
                {/* Theme Toggle */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <ThemeToggle />
                </motion.div>

                {/* Modern CTA Button - Option 1: Minimal with Border */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.5,
                    ease: "easeOut",
                  }}
                  className="relative"
                >
                  <Link
                    href={
                      setup?.phone_numbers?.[0]?.value
                        ? `tel:${setup.phone_numbers[0].value}`
                        : "/conntacts"
                    }
                    className="group relative px-5 py-2.5 inline-flex items-center gap-2 rounded-lg transition-all duration-300 overflow-hidden"
                  >
                    {/* Animated background effect */}
                    <motion.div
                      className="absolute inset-0 bg-primary rounded-lg"
                      initial={false}
                      whileHover={{
                        backgroundColor: "rgb(var(--primary))",
                        scale: 1.02,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Pulsing dot */}
                    <motion.div
                      className="w-2 h-2 rounded-full bg-white/80"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Text */}
                    <span className="relative z-10 text-sm font-semibold text-white">
                      Talk to Us
                    </span>

                    {/* Arrow icon */}
                    <svg
                      className="w-4 h-4 relative z-10 text-white transition-transform group-hover:translate-x-1 duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </nav>

            {/* Mobile Actions */}
            <div className="flex items-center gap-3 lg:hidden">
              {/* Mobile CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Link
                  href={
                    setup?.phone_numbers?.[0]?.value
                      ? `tel:${setup.phone_numbers[0].value}`
                      : "/conntacts"
                  }
                  className="relative px-4 py-2.5 inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 backdrop-blur-sm"
                >
                  {/* Pulsing dot */}
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="text-sm font-medium text-primary">Call</span>
                </Link>
              </motion.div>

              {/* Theme Toggle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <ThemeToggle />
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                className={`relative p-2.5 rounded-lg transition-all duration-300 ${
                  isScrolled
                    ? "bg-white/15 backdrop-blur-md"
                    : "bg-white/10 backdrop-blur-sm"
                } border border-white/15`}
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
                <div className="relative w-6 h-5">
                  <span
                    className={`absolute left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
                      isMobileNavOpen ? "top-2 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
                      isMobileNavOpen ? "opacity-0" : "top-2 opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
                      isMobileNavOpen ? "top-2 -rotate-45" : "top-4"
                    }`}
                  />
                </div>
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