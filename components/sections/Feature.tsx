'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Feature = () => {
  // Stats with images as backgrounds
  const stats = [
    {
      number: '18+',
      label: 'Years Experience',
      description: 'Since 2006',
      image: '/assets/images/photo_2026-01-20_10-55-53.jpg',
      icon: '📅',
    },
    {
      number: '100+',
      label: 'Global Markets',
      description: 'Worldwide Reach',
      image: '/assets/images/photo_2026-01-20_10-55-54.jpg',
      icon: '🌍',
    },
    {
      number: 'Premium',
      label: 'Quality Coffee',
      description: 'Ethiopian Specialty',
      image: '/assets/images/photo_2026-01-20_10-55-53 (2).jpg',
      icon: '☕',
    },
    {
      number: 'Trusted',
      label: 'Partnerships',
      description: 'Reliable Service',
      image: '/assets/images/photo_2026-01-20_10-55-53 (3).jpg',
      icon: '🤝',
    },
  ];

  return (
    <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-slate-100 via-purple-50/30 to-slate-100 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-900">
      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-9xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* "WHY CHOOSE US" Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xs md:text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                WHY CHOOSE US
              </h3>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                What Sets Us Apart
              </h2>
            </motion.div>

            {/* Main Description */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-sm md:text-base text-foreground-secondary leading-relaxed">
                With over 18 years of experience since 2006, we have established ourselves as a trusted partner in international trade. We provide only premium products with ethical sourcing, transparent operations, and tailored solutions that match your priorities.
              </p>
            </motion.div>

            {/* Key Benefits Section */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-xs md:text-sm text-foreground-secondary leading-relaxed">
                Our commitment to quality, sustainability, and customer satisfaction ensures reliable partnerships and exceptional results. We serve as a reliable bridge between Ethiopia and international markets, delivering excellence in every transaction.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side - Stats with Image Backgrounds */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group overflow-hidden rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={stat.image}
                      alt={stat.label}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/75 group-hover:from-black/85 group-hover:via-black/75 group-hover:to-black/80 transition-all duration-300" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-4 md:p-6 h-full min-h-[180px] flex flex-col justify-between">
                    {/* Icon */}
                    <motion.div
                      className="text-3xl md:text-4xl mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                    >
                      {stat.icon}
                    </motion.div>

                    {/* Stats Content */}
                    <div className="mt-auto">
                      <motion.div
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                      >
                        {stat.number}
                      </motion.div>
                      <motion.div
                        className="text-sm md:text-base font-semibold text-white/95 mb-1"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.25 }}
                      >
                        {stat.label}
                      </motion.div>
                      <motion.div
                        className="text-xs md:text-sm text-white/80"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.3 }}
                      >
                        {stat.description}
                      </motion.div>
                    </div>

                    {/* Decorative Accent Line */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.35 }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-xl md:rounded-2xl border-2 border-primary/0 group-hover:border-primary/30 transition-all duration-300 pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
