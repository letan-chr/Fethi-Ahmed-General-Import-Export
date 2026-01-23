"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Award, ExternalLink, Calendar } from "lucide-react";
import { AboutAward } from "@/types/types";

interface AchievementProps {
  awards: AboutAward[];
}

const Achievement = ({ awards }: AchievementProps) => {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  if (!awards || awards.length === 0) {
    return null;
  }

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

  return (
    <section className="py-8 md:py-10 lg:py-12 bg-gradient-to-br from-foreground via-foreground/95 to-foreground relative overflow-hidden">
      {/* Modern Decorative Background Elements */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10"></div>

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-9xl">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Trophy className="w-4 h-4 text-background" />
            <span className="text-xs md:text-sm font-semibold text-background uppercase tracking-widest">
              Recognition
            </span>
            <Trophy className="w-4 h-4 text-background" />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-background mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Our{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Achievements
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
            className="text-background/90 text-lg md:text-xl mt-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Celebrating milestones and recognition for our commitment to excellence and innovation.
          </motion.p>
        </motion.div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {awards.map((award, index) => {
            const isExpanded = expandedCards.has(index);
            const hasImageError = imageErrors.has(index);

            return (
              <motion.div
                key={award.id}
                className="relative group rounded-2xl bg-background/10 backdrop-blur-sm border-2 border-primary/30 p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
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
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Award Image */}
                  <motion.div
                    className="relative w-full h-48 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {!hasImageError && award.image ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${award.image}`}
                        alt={award.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={() => setImageErrors(new Set([...imageErrors, index]))}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Award className="w-16 h-16 text-primary/50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  </motion.div>

                  {/* Award Icon Badge */}
                  <motion.div
                    className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Trophy className="w-6 h-6 text-background" />
                  </motion.div>

                  {/* Award Title */}
                  <motion.h3
                    className="text-xl md:text-2xl font-bold text-background mb-2 group-hover:text-primary transition-colors duration-300 pr-12"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {award.title}
                  </motion.h3>

                  {/* Organization and Year */}
                  <div className="flex items-center gap-3 mb-4 text-background/80 text-sm">
                    {award.organization && (
                      <span className="font-semibold">{award.organization}</span>
                    )}
                    {award.year && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{award.year}</span>
                      </div>
                    )}
                  </div>

                  {/* Animated Divider */}
                  <motion.div
                    className="h-1 bg-primary mb-4 rounded-full"
                    initial={{ width: 48 }}
                    whileHover={{
                      width: "100%",
                      transition: { duration: 0.4 },
                    }}
                  />

                  {/* Description */}
                  <motion.div
                    className="text-background/90 leading-relaxed text-sm md:text-base prose prose-sm max-w-none mb-4"
                    whileHover={{
                      color: "var(--background)",
                      transition: { duration: 0.3 },
                    }}
                  >
                    {isExpanded ? (
                      <div dangerouslySetInnerHTML={{ __html: award.description }} />
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: truncateText(award.description, 120),
                        }}
                      />
                    )}
                  </motion.div>

                  {/* Expand/Collapse Button */}
                  {award.description.length > 120 && (
                    <button
                      onClick={() => toggleCard(index)}
                      className="text-primary hover:text-secondary font-semibold text-sm transition-colors duration-300 mb-4"
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}

                  {/* Link Button */}
                  {award.link && (
                    <Link
                      href={award.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-secondary font-semibold transition-colors duration-300 group/link"
                    >
                      <span>View Details</span>
                      <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </Link>
                  )}
                </div>

                {/* Border Glow on Hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-primary/0 pointer-events-none"
                  whileHover={{
                    borderColor: "rgba(var(--primary-rgb), 0.5)",
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

export default Achievement;
