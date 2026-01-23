'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Cta = () => {
  return (
    <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden min-h-[450px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/warehouse-goods-cartons-factory-storage-shipping-merchandise-room-logistics-background_892776-36406.jpg"
          alt="Call to Action Background"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay - Tertiary (left) to Primary (right) */}
        <div className="absolute inset-0 bg-gradient-to-r from-tertiary/70 via-tertiary/50 to-primary/70"></div>
      </div>

      {/* Circular Overlay Graphic - Right Side with Brand Colors */}
      <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 right-0 w-[600px] h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px]"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Concentric Rings - Using Tertiary Color */}
          <div className="absolute inset-0 rounded-full border-[120px] border-tertiary/40 blur-sm"></div>
          <div className="absolute inset-[120px] rounded-full border-[100px] border-tertiary-light/50 blur-sm"></div>
          <div className="absolute inset-[220px] rounded-full border-[80px] border-tertiary/40 blur-sm"></div>
          <div className="absolute inset-[300px] rounded-full border-[60px] border-tertiary-light/30 blur-sm"></div>
          <div className="absolute inset-[360px] rounded-full border-[40px] border-tertiary/20 blur-sm"></div>
          <div className="absolute inset-[400px] rounded-full bg-gradient-to-br from-tertiary/20 via-tertiary-light/15 to-tertiary/10 blur-md"></div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
        <div className="max-w-2xl">
          {/* Main Heading */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 text-white leading-tight font-sans"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Ready to Get Started?
          </motion.h2>

          {/* Sub-text */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-white/90 mb-6 font-medium font-sans"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Contact us today for a free consultation and quote.
          </motion.p>

          {/* CTA Buttons Container */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 md:gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Get Free Quote Button */}
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/contacts"
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-primary to-tertiary hover:from-primary-light hover:to-tertiary-light text-white font-bold text-base md:text-lg rounded-xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl font-sans"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Get Free Quote
                  <motion.div
                    className="w-2 h-2 rounded-full bg-white"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-tertiary-light to-primary-light"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>

            {/* Learn More Button */}
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/about"
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-primary to-tertiary hover:from-primary-light hover:to-tertiary-light text-white font-bold text-base md:text-lg rounded-xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl font-sans"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Learn More
                  <motion.div
                    className="w-2 h-2 rounded-full bg-white"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                  />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-tertiary-light to-primary-light"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Subtle decorative elements - Brand Colors */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
    </section>
  );
};

export default Cta;
