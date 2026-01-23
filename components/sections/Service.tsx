"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Service as ServiceType } from "@/types/types";

interface ServiceProps {
  services: ServiceType[];
}

const Service = ({ services }: ServiceProps) => {
  return (
    <section 
      className="relative py-8 md:py-8 overflow-hidden bg-gradient-to-br from-secondary/25 via-secondary/20 to-secondary/25"
    >
      {/* Decorative gradient orbs */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl -z-10 bg-secondary/15"
      ></div>
      <div 
        className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl -z-10 bg-secondary/15"
      ></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-4 md:mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Our Services</h2>
          <motion.div
            className="w-24 h-1 mx-auto mb-2 rounded-full bg-secondary"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="mx-auto text-foreground-secondary max-w-2xl text-sm md:text-base">
            We provide excellent, reliable services for coffee export and industrial equipment import with the
            highest standard of quality and ethics.
          </p>
        </motion.div>

        {/* Service Cards - 3 per row with sliding animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {services.slice(0, 3).map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Card Container with banner as full background */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full min-h-[400px]">
                {/* Banner Image - Full Background */}
                <div className="absolute inset-0 z-0">
                  <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${service.banner_image}`}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                      className="object-cover"
                      priority={index < 3}
                    />
                    {/* Gradient Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50 group-hover:from-black/95 group-hover:via-black/80 group-hover:to-black/60 transition-all duration-300" />
                  </motion.div>
                </div>

                {/* Content Section - Overlaid on banner */}
                <div className="relative z-10 flex flex-col justify-end p-6 md:p-8 h-full min-h-[400px]">
                  <div className="space-y-4">
                    {/* Service Name */}
                    <motion.h3
                      className="text-2xl md:text-3xl font-bold text-white transition-colors duration-300 group-hover:text-secondary"
                      whileHover={{ x: 5 }}
                    >
                      {service.title}
                    </motion.h3>

                    {/* Service Description */}
                    <p className="text-white/90 text-sm md:text-base leading-relaxed line-clamp-3">
                      {service.short_description.length > 120
                        ? `${service.short_description.substring(0, 120)}...`
                        : service.short_description}
                    </p>

                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="pt-2"
                    >
                      <Link
                        href={`/service/${service.slug}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-tertiary hover:from-primary-light hover:to-tertiary-light text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl group/btn"
                      >
                        <span>Learn More</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut",
                          }}
                          className="group-hover/btn:translate-x-1 transition-transform"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
