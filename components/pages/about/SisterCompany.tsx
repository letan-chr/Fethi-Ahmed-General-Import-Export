"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import { SisterCompany as SisterCompanyType } from "@/types/types";

interface SisterCompanyProps {
  sisterCompanies: SisterCompanyType[];
}

const SisterCompany = ({ sisterCompanies }: SisterCompanyProps) => {
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  if (!sisterCompanies || sisterCompanies.length === 0) {
    return null;
  }

  // Helper function to generate slug from name
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  };

  const truncateText = (text: string | null, maxLength: number = 120) => {
    if (!text) return "";
    // Remove HTML tags for truncation
    const plainText = text.replace(/<[^>]*>/g, "");
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + "...";
  };

  return (
    <section className="py-8 md:py-10 lg:py-12 bg-background relative overflow-hidden">
      {/* Modern Decorative Background Elements */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)",
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
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
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-widest">
              Our Network
            </span>
            <Building2 className="w-4 h-4 text-primary" />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Sister{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Companies
            </span>
          </motion.h2>

          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />

          <motion.p
            className="text-foreground-secondary text-lg md:text-xl mt-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Discover our family of companies working together to deliver excellence across various industries.
          </motion.p>
        </motion.div>

        {/* Sister Companies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sisterCompanies
            .filter((company) => company.is_active)
            .map((company, index) => {
              const hasImageError = imageErrors.has(index);
              const description = company.description || company.short_description || "";

              return (
                <motion.div
                  key={company.id}
                  className="relative group rounded-2xl bg-background border border-border/50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                >
                  {/* Animated Background Gradient on Hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-secondary/10 to-secondary/5 opacity-0 group-hover:opacity-100"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Company Banner */}
                    <motion.div
                      className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {!hasImageError && company.banner ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${company.banner}`}
                          alt={company.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={() => setImageErrors(new Set([...imageErrors, index]))}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Building2 className="w-16 h-16 text-primary/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>

                    {/* Card Content */}
                    <div className="p-6">
                      {/* Company Name */}
                      <motion.h3
                        className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors duration-300"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {company.name}
                      </motion.h3>

                      {/* Animated Divider */}
                      <motion.div
                        className="h-1 bg-secondary mb-4 rounded-full"
                        initial={{ width: 48 }}
                        whileHover={{
                          width: "100%",
                          transition: { duration: 0.4 },
                        }}
                      />

                      {/* Truncated Description */}
                      {description && (
                        <p className="text-foreground-secondary leading-relaxed text-sm md:text-base mb-6 line-clamp-3">
                          {truncateText(description, 120)}
                        </p>
                      )}

                      {/* View Details Button */}
                      <Link
                        href={`/sister-company/${company.slug || generateSlug(company.name)}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-tertiary hover:from-primary-light hover:to-tertiary-light text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 group/button"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-5 h-5 group-hover/button:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Border Glow on Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-secondary/0 pointer-events-none"
                    whileHover={{
                      borderColor: "rgba(var(--secondary-rgb), 0.3)",
                      transition: { duration: 0.3 },
                    }}
                  />
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default SisterCompany;
