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
    <section className="py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-4 md:mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Our Services</h2>
          <motion.div
            className="w-24 h-1 bg-primary mx-auto mb-2"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="mx-auto text-foreground-secondary max-w-2xl text-sm md:text-base">
            We provide excellent, reliable services to our customers with the
            highest standard of quality and ethics.
          </p>
        </motion.div>

        {/* Service Cards - 3 per row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {services.slice(0, 3).map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative bg-background border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-primary/50 flex flex-col h-full">
                {/* Image Container - 50% of card */}
                <div className="relative w-full flex-1 min-h-[200px]">
                  <motion.div
                    className="relative w-full h-full overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${service.banner_image}`}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                      className="object-cover group-hover:brightness-110 transition-all duration-300"
                      priority={index < 3}
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </div>

                {/* Content Section - 50% of card */}
                <div className="flex flex-col justify-between p-4 md:p-5 space-y-3 flex-1">
                  {/* Service Name */}
                  <motion.h3
                    className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300"
                    whileHover={{ x: 2 }}
                  >
                    {service.title}
                  </motion.h3>

                  {/* Service Description */}
                  <p className="text-foreground-secondary text-sm md:text-base leading-relaxed line-clamp-2">
                    {service.short_description.length > 100
                      ? `${service.short_description.substring(0, 100)}...`
                      : service.short_description}
                  </p>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={`/service/${service.slug}`}
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-on-primary px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/25 group/btn"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
