"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AboutContent } from "@/types/types";
import { Coffee, Globe, Building2 } from "lucide-react";

interface AboutSectionProps {
  aboutContent: AboutContent | null;
}

const AboutSection = ({ aboutContent }: AboutSectionProps) => {
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
        {/* About Us Section - Image Left, Content Right */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
          {/* Image Section - Left */}
          <motion.div
            className="relative group order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border-2 border-border group-hover:border-primary/50 transition-all duration-500">
              {aboutContent?.about_image ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${aboutContent.about_image}`}
                  alt="About Our Company"
                  width={700}
                  height={500}
                  className="w-full h-[450px] md:h-[550px] object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-[450px] md:h-[550px] bg-gradient-to-br from-primary/20 via-primary/10 to-background-secondary flex items-center justify-center">
                  <Coffee className="w-32 h-32 text-primary/40" />
                </div>
              )}
              {/* Overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

              {/* Floating elements */}
              <div className="absolute top-6 left-6 w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div className="absolute bottom-6 right-6 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                <Coffee className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Content Section - Right */}
          <motion.div
            className="space-y-8 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-6">
              <motion.div
                className="inline-flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  About Us
                </h2>
              </motion.div>

              <motion.div
                className="w-20 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />

              <motion.div
                className="text-foreground-secondary text-lg md:text-xl leading-relaxed space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {aboutContent?.text ? (
                  <div dangerouslySetInnerHTML={{ __html: aboutContent.text }} />
                ) : (
                  <div className="space-y-4">
                    <p>
                      Founded in <span className="font-bold text-primary">2006</span>, Fethi Ahmed General Import & Export is a dynamic Ethiopian trading company specializing in the export of premium specialty coffee and the import of industrial and medical equipment.
                    </p>
                    <p>
                      We serve as a reliable bridge between Ethiopia and international markets—delivering authentic, traceable coffee to customers across the world while supplying quality machinery and equipment to strengthen essential sectors at home.
                    </p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Key stats */}
            <motion.div
              className="grid grid-cols-2 gap-6 pt-6 border-t border-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">2006</div>
                <div className="text-sm text-foreground-secondary">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">18+</div>
                <div className="text-sm text-foreground-secondary">Years</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
