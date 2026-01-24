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
    <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden bg-black w-full">
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
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Curved Green Gradient Overlay - Left 30% with more bend, Right 70% with less bend */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 700"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="greenGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(124, 252, 0, 0.9)" stopOpacity="0.9" />
              <stop offset="30%" stopColor="rgba(50, 205, 50, 0.85)" stopOpacity="0.85" />
              <stop offset="60%" stopColor="rgba(32, 178, 170, 0.7)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="rgba(64, 224, 208, 0.5)" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          {/* Curved path: more pronounced curve on left (30%), gentler curve on right (70%) */}
          <path
            d="M 0,0 
               L 0,700 
               C 150,690 200,680 250,670 
               C 280,665 300,660 350,640 
               C 400,620 450,590 500,550 
               C 550,510 600,470 650,430 
               C 700,390 750,360 800,340 
               C 850,320 900,300 950,280 
               C 970,275 990,270 1000,260 
               L 1000,0 
               Z"
            fill="url(#greenGradient)"
          />
        </svg>
        {/* White curved accent line at bottom edge */}
        <svg
          className="absolute bottom-0 left-0 w-full h-1"
          viewBox="0 0 1000 10"
          preserveAspectRatio="none"
        >
          <path
            d="M 0,10 
               C 200,8 280,6 300,5 
               C 400,3 500,2 600,1.5 
               C 700,1 800,0.5 900,0.3 
               C 950,0.2 980,0.1 1000,0 
               L 1000,10 
               L 0,10 
               Z"
            fill="rgba(255, 255, 255, 0.3)"
          />
        </svg>
      </div>

      {/* Content Section - Left Aligned (60% area) */}
      <div className="relative z-20 h-full flex items-center px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 overflow-hidden">
        <div className="w-full max-w-full sm:max-w-[95%] md:max-w-[85%] lg:max-w-[70%] xl:max-w-[60%] text-left overflow-hidden">
          {/* Main Content */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6 overflow-hidden">
            {/* Title */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden"
              >
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-tight text-white mb-1 sm:mb-2 md:mb-3 lg:mb-4 break-words hyphens-auto overflow-wrap-anywhere">
                  <span className="block">{currentContent?.title}</span>
                </h1>
              </motion.div>
            </AnimatePresence>

            {/* Description - Hidden on small screens */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="hidden md:block"
              >
                <p className="text-base sm:text-lg lg:text-xl text-white/95 leading-relaxed">
                  {currentContent?.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-2 md:gap-3 lg:gap-4 pt-1 sm:pt-2 md:pt-4 lg:pt-6 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Link
                  href="/products"
                  className="group relative inline-flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-primary to-tertiary hover:from-primary-light hover:to-tertiary-light text-white text-xs sm:text-sm md:text-base lg:font-semibold rounded-lg overflow-hidden transition-all duration-300 shadow-lg w-full sm:w-auto"
                >
                  <span className="relative z-10">Explore Products</span>
                  <motion.svg
                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 relative z-10 flex-shrink-0"
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
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Link
                  href="/conntacts"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-primary to-tertiary hover:from-primary-light hover:to-tertiary-light text-white text-xs sm:text-sm md:text-base lg:font-semibold rounded-lg transition-all duration-300 shadow-lg w-full sm:w-auto"
                >
                  <span>Contact Us</span>
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0"
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

      {/* Slide Indicators - Bottom Center */}
      {heroSlides.length > 1 && (
        <motion.div
          className="absolute bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 md:gap-3 bg-black/20 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full border border-white/20 max-w-[90vw] overflow-hidden"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative rounded-full transition-all duration-300 flex-shrink-0 ${
                index === currentSlide
                  ? "bg-accent shadow-lg shadow-accent/50"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                width: index === currentSlide ? 24 : 8,
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
