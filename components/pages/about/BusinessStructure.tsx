"use client";

import React from "react";
import { motion } from "framer-motion";
import { AboutContent } from "@/types/types";
import { Building2, Users, Network, Target } from "lucide-react";

interface BusinessStructureProps {
  aboutContent: AboutContent | null;
}

const BusinessStructure = ({ aboutContent }: BusinessStructureProps) => {
  // This can be dynamic from API in the future
  const structureSections = [
    {
      icon: Building2,
      title: "Company Overview",
      description: "Established in 2006, we are a dynamic Ethiopian trading company specializing in international trade and quality solutions."
    },
    {
      icon: Network,
      title: "Global Reach",
      description: "Connecting Ethiopia with international markets through strategic partnerships and reliable supply chains."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our dedicated professionals ensure excellence in every transaction and customer relationship."
    },
    {
      icon: Target,
      title: "Strategic Focus",
      description: "Committed to sustainable growth and ethical business practices across all operations."
    }
  ];

  return (
    <section className="py-8 md:py-10 lg:py-12 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Building2 className="w-10 h-10 text-primary" />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  Business Structure
                </h2>
          </div>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="text-foreground-secondary text-lg md:text-xl max-w-3xl mx-auto">
            Our organizational framework designed for efficiency, growth, and excellence
          </p>
        </motion.div>

        {/* Structure Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {structureSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-background/10 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary/30 hover:border-primary/50"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                  <Icon className="w-8 h-8 text-primary group-hover:text-on-primary transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {section.title}
                </h3>
                <p className="text-foreground-secondary leading-relaxed">
                  {section.description}
                </p>

                {/* Decorative accent */}
                <div className="w-12 h-0.5 bg-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BusinessStructure;
