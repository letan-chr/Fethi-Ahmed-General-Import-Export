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
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main About Section */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          {/* Image Section with Modern Design */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Modern image container with enhanced effects */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-border/50 group-hover:border-primary/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
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

          {/* Content Section */}
          <motion.div
            className="space-y-6 md:space-y-8"
            initial={{ opacity: 0, x: 50 }}
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                About Our Company
              </h2>
              <motion.div
                className="h-1 bg-gradient-to-r from-primary via-primary/80 to-transparent mb-6 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100px" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.div>

            {/* About Text */}
            <motion.div
              className="text-foreground-secondary leading-relaxed text-base md:text-lg lg:text-xl prose prose-sm md:prose-base lg:prose-lg max-w-none"
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
              className="pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-on-primary px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl shadow-lg hover:scale-105"
              >
                <span>Read More</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Mission & Vision Cards - Full Width */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Mission Card */}
          <motion.div
            className="relative group rounded-2xl bg-background border border-border/50 p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Our Mission
            </h3>
            <div className="w-16 h-1 bg-primary mb-6 rounded-full"></div>
            <div 
              className="text-foreground-secondary leading-relaxed text-base md:text-lg prose prose-sm md:prose-base max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: aboutContent?.mission || "To deliver exceptional quality and service that exceeds expectations, building lasting relationships with our clients and partners." 
              }}
            />
          </motion.div>

          {/* Vision Card */}
          <motion.div
            className="relative group rounded-2xl bg-background border border-border/50 p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Our Vision
            </h3>
            <div className="w-16 h-1 bg-primary mb-6 rounded-full"></div>
            <div 
              className="text-foreground-secondary leading-relaxed text-base md:text-lg prose prose-sm md:prose-base max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: aboutContent?.vision || "To be a leading force in our industry, recognized for innovation, excellence, and unwavering commitment to our values." 
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
