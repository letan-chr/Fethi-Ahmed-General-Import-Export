"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ExternalLink, Sparkles } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import { Partner } from "@/types/types";

interface PartnerProps {
  partners: Partner[];
}

const Partners = ({ partners }: PartnerProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<{ local: number | null; international: number | null }>({
    local: null,
    international: null,
  });

  // Filter partners by type
  const localPartnersFiltered = partners.filter((partner: any) => partner.type === "local" || partner.type_id === "local");
  const internationalPartnersFiltered = partners.filter((partner: any) => partner.type === "international" || partner.type_id === "international");

  // Duplicate partners to ensure continuous smooth scrolling (double them if not enough)
  const duplicateArray = (arr: Partner[], times: number = 3) => {
    if (arr.length === 0) return arr;
    const duplicated = [];
    for (let i = 0; i < times; i++) {
      duplicated.push(...arr);
    }
    return duplicated;
  };

  const localPartners = duplicateArray(localPartnersFiltered);
  const internationalPartners = duplicateArray(internationalPartnersFiltered);

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-background via-background-secondary/50 to-background relative overflow-hidden">
      {/* Modern Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        {/* Accent lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Modern Professional Header Section */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-widest">
              Our Network
            </span>
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Trusted Partners &{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Collaborators
            </span>
          </motion.h2>

          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary"></div>
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary"></div>
          </motion.div>

          <motion.p
            className="mx-auto text-foreground-secondary max-w-3xl text-base md:text-lg leading-relaxed font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            We collaborate with industry leaders and trusted partners worldwide to deliver
            exceptional results and innovative solutions that drive success.
          </motion.p>
        </motion.div>

        {/* Local Partners Slider - Sliding Right */}
        {localPartners.length > 0 && (
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h3 
              className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-6 text-center relative inline-block w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="relative z-10 bg-background px-4">Local Partners</span>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent -z-0"></div>
            </motion.h3>
            <div className="relative group">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={2}
                autoplay={{
                  delay: 1,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                }}
                loop={localPartners.length >= 2}
                speed={5000}
                freeMode={false}
                grabCursor={true}
                allowTouchMove={true}
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
                className="partner-slider-local"
              >
                {localPartners.map((partner, index) => (
                  <SwiperSlide key={`local-${partner.id}-${index}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      onMouseEnter={() => setHoveredIndex({ ...hoveredIndex, local: index })}
                      onMouseLeave={() => setHoveredIndex({ ...hoveredIndex, local: null })}
                      className="group h-full"
                    >
                      <Link
                        href={partner.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full"
                      >
                        <div className="relative bg-gradient-to-br from-background via-background-secondary/30 to-background border border-border/50 rounded-2xl p-4 md:p-6 h-32 md:h-36 flex items-center justify-center transition-all duration-500 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2 group-hover:bg-background-secondary overflow-hidden">
                          {/* Animated background gradient */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                          
                          {/* Shimmer effect on hover */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          </div>

                          {/* Decorative corner accent */}
                          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/0 to-primary/0 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/0 to-primary/0 rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          {/* Partner Logo */}
                          <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110 z-10">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${partner.image}`}
                              alt={partner.name}
                              fill
                              className="object-contain transition-all duration-500 filter group-hover:brightness-110"
                              sizes="(max-width: 640px) 120px, (max-width: 1024px) 140px, 160px"
                            />
                          </div>

                          {/* Partner Name Tooltip */}
                          <motion.div
                            className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-foreground text-background px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 shadow-lg"
                            initial={{ y: -5 }}
                            animate={{
                              y: hoveredIndex.local === index ? 0 : -5,
                              opacity: hoveredIndex.local === index ? 1 : 0,
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
                              scale: hoveredIndex.local === index ? 1 : 0,
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

              {/* Gradient overlays for better visibility */}
              <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-background-secondary via-background-secondary/60 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-background-secondary via-background-secondary/60 to-transparent z-10 pointer-events-none"></div>
            </div>
          </motion.div>
        )}

        {/* International Partners Slider - Sliding Left */}
        {internationalPartners.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h3 
              className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-6 text-center relative inline-block w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="relative z-10 bg-background px-4">International Partners</span>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent -z-0"></div>
            </motion.h3>
            <div className="relative group">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={2}
                autoplay={{
                  delay: 1,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                  reverseDirection: true, // This makes it slide left
                }}
                loop={internationalPartners.length >= 2}
                speed={5000}
                freeMode={false}
                grabCursor={true}
                allowTouchMove={true}
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
                className="partner-slider-international"
              >
                {internationalPartners.map((partner, index) => (
                  <SwiperSlide key={`international-${partner.id}-${index}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      onMouseEnter={() => setHoveredIndex({ ...hoveredIndex, international: index })}
                      onMouseLeave={() => setHoveredIndex({ ...hoveredIndex, international: null })}
                      className="group h-full"
                    >
                      <Link
                        href={partner.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full"
                      >
                        <div className="relative bg-gradient-to-br from-background via-background-secondary/40 to-background border-2 border-border/60 rounded-2xl p-5 md:p-7 h-36 md:h-40 flex items-center justify-center transition-all duration-500 hover:border-primary/80 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-3 group-hover:bg-background-secondary overflow-hidden backdrop-blur-sm">
                          {/* Professional layered shadows */}
                          <div className="absolute inset-0 rounded-2xl shadow-lg shadow-black/5 group-hover:shadow-2xl group-hover:shadow-primary/20 transition-shadow duration-500"></div>
                          
                          {/* Animated background gradient */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                          
                          {/* Shimmer effect on hover */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-2xl">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          </div>

                          {/* Professional border glow on hover */}
                          <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/40 transition-all duration-500 pointer-events-none"></div>

                          {/* Decorative corner accent */}
                          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          {/* Partner Logo */}
                          <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110 z-10">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${partner.image}`}
                              alt={partner.name}
                              fill
                              className="object-contain transition-all duration-500 filter group-hover:brightness-110"
                              sizes="(max-width: 640px) 120px, (max-width: 1024px) 140px, 160px"
                            />
                          </div>

                          {/* Partner Name Tooltip */}
                          <motion.div
                            className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-foreground text-background px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 shadow-lg"
                            initial={{ y: -5 }}
                            animate={{
                              y: hoveredIndex.international === index ? 0 : -5,
                              opacity: hoveredIndex.international === index ? 1 : 0,
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
                              scale: hoveredIndex.international === index ? 1 : 0,
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

              {/* Gradient overlays for better visibility */}
              <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-background-secondary via-background-secondary/60 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-background-secondary via-background-secondary/60 to-transparent z-10 pointer-events-none"></div>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx global>{`
        .partner-slider-local .swiper-slide,
        .partner-slider-international .swiper-slide {
          transition: all 0.3s ease;
          height: auto;
          flex-shrink: 0;
        }

        .partner-slider-local .swiper-slide:active,
        .partner-slider-international .swiper-slide:active {
          transform: scale(0.95);
        }

        /* Continuous smooth scrolling - no stops */
        .partner-slider-local .swiper-wrapper,
        .partner-slider-international .swiper-wrapper {
          display: flex !important;
          transition-timing-function: linear !important;
          will-change: transform;
        }

        /* Ensure smooth continuous movement */
        .partner-slider-local.swiper,
        .partner-slider-international.swiper {
          overflow: visible;
        }

        .partner-slider-local .swiper-wrapper,
        .partner-slider-international .swiper-wrapper {
          animation-timing-function: linear;
        }
      `}</style>
    </section>
  );
};

export default Partners;
