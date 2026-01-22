"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Stat, AboutAward } from "@/types/types";

interface StatisticsAchievementsProps {
  stats: Stat[];
  awards: AboutAward[];
}

const StatisticsAchievements = ({ stats, awards }: StatisticsAchievementsProps) => {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const toggleCard = (index: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };

  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };
  function getFAIcon(iconName?: string | null) {
    const valid =
      typeof iconName === "string" &&
      iconName.trim() !== "" &&
      (iconName.startsWith("fa ") ||
        iconName.startsWith("fa-") ||
        iconName.startsWith("fas ") ||
        iconName.startsWith("fas-") ||
        iconName.startsWith("fab ") ||
        iconName.startsWith("fab-") ||
        iconName.startsWith("far ") ||
        iconName.startsWith("far-"));

    if (valid) {
      return <i className={`${iconName} text-3xl`}></i>;
    }

    // BETTER fallback for stats
    return <i className="fa-solid fa-arrow-trend-up text-3xl"></i>;
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-foreground via-foreground/95 to-foreground relative overflow-hidden">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content Section - Left */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
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
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-tight">
                  Our Impact
                  <br />
                  <span className="text-primary">in Numbers</span>
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
                className="text-background/90 text-lg md:text-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p>Numbers that reflect our commitment to excellence, growth, and community impact.</p>
              </motion.div>
            </div>

            {/* Statistics Grid */}
            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {stats.slice(0, 4).map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-background/10 backdrop-blur-sm p-6 rounded-2xl border-2 border-primary/30 hover:border-primary/50 transition-all duration-300 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    className="text-3xl text-primary mb-3"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {getFAIcon(stat.icon_class)}
                  </motion.div>
                  <motion.div
                    className="text-3xl md:text-4xl font-bold text-background mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: 0.6 + index * 0.1,
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm font-semibold text-background/80">
                    {stat.name}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Section - Right */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border-2 border-primary/30 group-hover:border-primary/50 transition-all duration-500">
              <div className="w-full h-[500px] md:h-[600px] bg-gradient-to-br from-primary/40 via-primary/30 to-primary/20 flex items-center justify-center relative">
                {/* Statistics visualization */}
                <div className="text-center space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    {stats.slice(4).map((stat, index) => (
                      <motion.div
                        key={index + 4}
                        className="bg-background/20 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-2xl text-white mb-2">
                          {getFAIcon(stat.icon_class)}
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-white/80">{stat.name}</div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Growing Together</h3>
                    <p className="text-white/80 max-w-xs mx-auto">
                      Our achievements speak for our dedication to excellence
                    </p>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-6 right-6 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 animate-pulse">
                  <span className="text-2xl">📈</span>
                </div>
                <div className="absolute bottom-6 left-6 w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 animate-pulse" style={{ animationDelay: '1s' }}>
                  <span className="text-2xl">🎯</span>
                </div>

                {/* Animated background patterns */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsAchievements;
