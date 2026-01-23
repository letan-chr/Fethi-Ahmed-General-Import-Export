"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { AboutContent } from "@/types/types";

interface AboutProps {
  aboutContent: AboutContent | null;
}

const About = ({ aboutContent }: AboutProps) => {
  // Get core values, limit to 4 and filter active ones
  const coreValues = aboutContent?.core_values
    ?.filter((cv) => cv.is_active)
    .slice(0, 4) || [];

  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-background overflow-hidden">
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
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Three Column Layout: About Content | Image | Mission & Vision */}
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-start mb-12 md:mb-16">
          {/* Column 1: About Content (col-4) */}
          <motion.div
            className="lg:col-span-4 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                About Our Company
              </h2>
              <motion.div
                className="h-1 bg-gradient-to-r from-secondary via-secondary/80 to-transparent mb-6 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100px" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.div>

            {/* About Text */}
            <motion.div
              className="text-foreground-secondary leading-relaxed text-base md:text-lg prose prose-sm md:prose-base lg:prose-lg max-w-none text-justify"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              dangerouslySetInnerHTML={{ 
                __html: aboutContent?.text || "" 
              }}
            />

            {/* Read More Button */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-primary to-tertiary hover:from-primary-light hover:to-tertiary-light text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl shadow-lg hover:scale-105"
              >
                <span>Read More</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Column 2: Image (col-4) */}
          <motion.div
            className="lg:col-span-4 relative group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            {/* Modern image container with enhanced effects */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-border/50 group-hover:border-secondary/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <Image
                src={
                  aboutContent?.about_image
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${aboutContent?.about_image}`
                    : "/assets/images/IMG-20260117-WA0017.jpg"
                }
                alt="About Our Company"
                width={600}
                height={400}
                className="w-full h-[350px] md:h-[450px] lg:h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
                priority
              />
              
              {/* Overlay gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </motion.div>

          {/* Column 3: Mission & Vision (col-4) */}
          <motion.div
            className="lg:col-span-4 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          >
            {/* Mission Card */}
            <motion.div
              className="relative group rounded-2xl bg-background border border-border/50 p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Our Mission
              </h3>
                    <div className="w-16 h-1 bg-secondary mb-4 rounded-full"></div>
              <div 
                className="text-foreground-secondary leading-relaxed text-sm md:text-base prose prose-sm max-w-none line-clamp-4"
                dangerouslySetInnerHTML={{ 
                  __html: aboutContent?.mission || "To showcase Ethiopia's world-renowned coffee heritage globally and to supply durable, efficient products that support development, growth, and well-being within Ethiopian communities and industries." 
                }}
              />
            </motion.div>

            {/* Vision Card */}
            <motion.div
              className="relative group rounded-2xl bg-background border border-border/50 p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Our Vision
              </h3>
                    <div className="w-16 h-1 bg-secondary mb-4 rounded-full"></div>
              <div 
                className="text-foreground-secondary leading-relaxed text-sm md:text-base prose prose-sm max-w-none line-clamp-4"
                dangerouslySetInnerHTML={{ 
                  __html: aboutContent?.vision || "To be the leading Ethiopian trading company recognized globally for excellence in specialty coffee exports and industrial equipment imports, fostering sustainable development and economic growth across communities." 
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Core Values Section - Full Width with 4 Cards */}
        {coreValues.length > 0 && (
          <motion.div
            className="mt-2 md:mt-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            {/* Core Values Grid - 4 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.id}
                  className="relative group rounded-2xl bg-background border border-border/50 p-6 md:p-8 shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Animated Background Gradient on Hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-secondary/10 to-secondary/5 opacity-0 group-hover:opacity-100"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Glow Effect */}
                  <motion.div
                      className="absolute inset-0 bg-secondary/0 rounded-2xl blur-xl"
                      whileHover={{ 
                        backgroundColor: "rgba(var(--secondary-rgb), 0.1)",
                      transition: { duration: 0.4 }
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Placeholder Icon with Animation */}
                    <motion.div 
                      className="mb-4 w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors duration-300"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <motion.svg
                        className="w-6 h-6 text-secondary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        whileHover={{ 
                          scale: 1.2,
                          rotate: 360,
                          transition: { duration: 0.5 }
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </motion.svg>
                    </motion.div>

                    {/* Title with Hover Effect */}
                    <motion.h3 
                      className="text-lg md:text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors duration-300"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {value.title}
                    </motion.h3>
                    
                    {/* Animated Divider */}
                    <motion.div 
                      className="h-1 bg-secondary mb-4 rounded-full"
                      initial={{ width: 48 }}
                      whileHover={{ 
                        width: "100%",
                        transition: { duration: 0.4 }
                      }}
                    />

                    {/* Description */}
                    <motion.div 
                      className="text-foreground-secondary leading-relaxed text-xs md:text-sm prose prose-sm max-w-none"
                      whileHover={{ 
                        color: "var(--foreground)",
                        transition: { duration: 0.3 }
                      }}
                      dangerouslySetInnerHTML={{ 
                        __html: value.description || "" 
                      }}
                    />
                  </div>

                  {/* Border Glow on Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-secondary/0 pointer-events-none"
                    whileHover={{ 
                      borderColor: "rgba(var(--secondary-rgb), 0.3)",
                      transition: { duration: 0.3 }
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default About;
