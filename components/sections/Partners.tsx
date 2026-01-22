"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ExternalLink, Sparkles } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Partner, Stat } from "@/types/types";

interface PartnerProps {
  partners: Partner[];
  stats?: Stat[];
}

const Partners = ({ partners, stats = [] }: PartnerProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Default stats if not provided from API
  const defaultStats = [
    { name: "Trusted Partners", value: `${partners.length}+` },
    { name: "Years Experience", value: "15+" },
    { name: "Countries Served", value: "50+" },
    { name: "Satisfaction Rate", value: "100%" },
  ];

  // Use API stats if available, otherwise use defaults
  const displayStats = stats.length > 0 
    ? stats.slice(0, 4).map(stat => ({ name: stat.name, value: stat.value }))
    : defaultStats;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background-secondary via-background-secondary/95 to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm md:text-base font-semibold text-primary uppercase tracking-wider">
              Our Network
            </span>
            <Sparkles className="w-5 h-5 text-primary" />
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Trusted Partners &{" "}
            <span className="text-primary">Collaborators</span>
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />

          <motion.p
            className="mx-auto text-foreground-secondary max-w-2xl text-sm md:text-base leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            We collaborate with industry leaders and trusted partners to deliver
            exceptional results and innovative solutions.
          </motion.p>
        </motion.div>

        {/* Partners Slider - All Screen Sizes */}
        <div className="relative mb-8 group">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={2}
            navigation={{
              nextEl: ".partner-swiper-button-next",
              prevEl: ".partner-swiper-button-prev",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={partners.length > 6}
            grabCursor={true}
            breakpoints={{
              480: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 24,
              },
            }}
            className="partner-slider"
          >
            {partners.map((partner, index) => (
              <SwiperSlide key={`${partner.id}-${index}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group h-full"
                >
                  <Link
                    href={partner.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <div className="relative bg-background border border-border/50 rounded-xl p-4 md:p-6 h-28 md:h-32 flex items-center justify-center transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 group-hover:bg-background-secondary">
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                      {/* Partner Logo */}
                      <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-110">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${partner.image}`}
                          alt={partner.name}
                          fill
                          className="object-contain transition-all duration-300"
                          sizes="(max-width: 640px) 120px, (max-width: 1024px) 140px, 160px"
                        />
                      </div>

                      {/* Partner Name Tooltip */}
                      <motion.div
                        className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-foreground text-background px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 shadow-lg"
                        initial={{ y: -5 }}
                        animate={{
                          y: hoveredIndex === index ? 0 : -5,
                          opacity: hoveredIndex === index ? 1 : 0,
                        }}
                      >
                        {partner.name}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45"></div>
                      </motion.div>

                      {/* External link icon */}
                      <motion.div
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0 }}
                        animate={{
                          scale: hoveredIndex === index ? 1 : 0,
                        }}
                      >
                        <ExternalLink className="w-4 h-4 text-primary" />
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            className="partner-swiper-button-prev absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-background/95 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300 opacity-60 md:opacity-100 group-hover:opacity-100"
            aria-label="Previous partners"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className="partner-swiper-button-next absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-background/95 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300 opacity-60 md:opacity-100 group-hover:opacity-100"
            aria-label="Next partners"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
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
          </button>

          {/* Gradient overlays for better visibility */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-background-secondary via-background-secondary/60 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-background-secondary via-background-secondary/60 to-transparent z-10 pointer-events-none"></div>
        </div>


        {/* Stats Section */}
        {displayStats.length > 0 && (
          <motion.div
            className="mt-12 md:mt-16 pt-8 border-t border-border/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {displayStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-foreground-secondary">
                    {stat.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <style jsx global>{`
        .partner-slider .swiper-slide {
          transition: all 0.3s ease;
          height: auto;
        }

        .partner-slider .swiper-slide:active {
          transform: scale(0.95);
        }

        .partner-slider .partner-swiper-button-prev.swiper-button-disabled,
        .partner-slider .partner-swiper-button-next.swiper-button-disabled {
          opacity: 0.3 !important;
          cursor: not-allowed;
          pointer-events: none;
        }

        .partner-slider:hover .partner-swiper-button-prev,
        .partner-slider:hover .partner-swiper-button-next {
          opacity: 1 !important;
        }

        @media (max-width: 768px) {
          .partner-slider .partner-swiper-button-prev,
          .partner-slider .partner-swiper-button-next {
            opacity: 0.4;
          }
        }
      `}</style>
    </section>
  );
};

export default Partners;
