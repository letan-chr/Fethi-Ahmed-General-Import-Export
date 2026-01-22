"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HeroContent, Stat } from "@/types/types";

interface HeroProps {
  heroSlides: HeroContent[];
  stats: Stat[];
}

const Hero = ({ heroSlides, stats }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (heroSlides.length === 0) return;

    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentContent = heroSlides[currentSlide];

  return (
    <section className="relative h-screen overflow-hidden -mt-24 bg-black">
      {/* Full Background Image */}
      <AnimatePresence initial={false} mode="sync">
        {heroSlides.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0 z-0"
              >
                {slide.image && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${slide.image}`}
                    alt={`${slide.title} - Slide ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    quality={90}
                  />
                )}
                {/* Dark overlay for better contrast */}
                <div className="absolute inset-0 bg-black/20"></div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Content Section with Backdrop */}
      <div className="relative z-10 h-full flex items-center px-6 sm:px-8 lg:px-12 xl:px-16 pt-20">
        <div className="w-full max-w-3xl">
          {/* Slide Number Indicator - Without separator line */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-black/20 backdrop-blur-md rounded-full border border-white/20">
              <span className="text-accent font-bold text-sm tracking-wider">
                {(currentSlide + 1).toString().padStart(2, "0")}
              </span>
              <span className="text-gray-400 text-sm">/</span>
              <span className="text-gray-400 text-sm">
                {heroSlides.length.toString().padStart(2, "0")}
              </span>
            </div>
          </motion.div>

          {/* Main Content with Backdrop */}
          <div className="relative p-8 sm:p-10 lg:p-12 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
            <div className="space-y-8">
              {/* Title */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] text-white mb-6">
                    <span className="block">{currentContent?.title}</span>
                  </h1>
                </motion.div>
              </AnimatePresence>

              {/* Description */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`desc-${currentSlide}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <p className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-2xl">
                    {currentContent?.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/products"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:bg-accent-light shadow-lg shadow-accent/30"
                  >
                    <span className="relative z-10">Explore Products</span>
                    <motion.svg
                      className="w-5 h-5 relative z-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </motion.svg>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/conntacts"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-lg transition-all duration-300 hover:border-white hover:bg-white/20"
                  >
                    <span>Contact Us</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators - Bottom Center */}
      {heroSlides.length > 1 && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-accent shadow-lg shadow-accent/50"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                width: index === currentSlide ? 32 : 8,
                height: 8,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
