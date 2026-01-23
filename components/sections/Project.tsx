"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Product } from "@/types/types";

interface ProductProps {
  products: Product[];
}

const Project = ({ products }: ProductProps) => {
  const featuredProducts = products
    .filter((product) => product.is_featured)
    .slice(0, 2); // Get 2 featured products for the new layout

  const regularProducts = products
    .filter((product) => !product.is_featured)
    .slice(0, 4);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (featuredProducts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background via-gray-50/30 to-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-9xl relative z-10">
        {/* Header Section */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Side - Title Section */}
          <div className="flex-1">
            <motion.div
              className="inline-flex items-center gap-2 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-6 h-6 text-secondary" />
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                Featured Collection
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 text-left">
              Our <span className="bg-gradient-to-r from-secondary to-secondary-dark bg-clip-text text-transparent">Products</span>
            </h2>
            
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-secondary to-secondary-dark mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>

          {/* Right Side - Button */}
          <div className="flex-shrink-0 lg:self-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-tertiary hover:from-primary-light hover:to-tertiary-light text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <span>Explore All Products</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Featured Products - New Layout: col-5 (left) with 2 products, col-7 (right) with sliding carousel */}
        {featuredProducts.length > 0 && (
          <div className="mb-12 md:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
              {/* Left Column - col-5: Two Featured Products Stacked */}
              <motion.div
                className="lg:col-span-5 flex flex-col gap-4 md:gap-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
              >
                {featuredProducts.map((product, index) => (
                  <motion.div
                    key={product.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setCurrentSlide(index)}
                    className="cursor-pointer"
                  >
                    <Link
                      href={`/products/${product.slug}`}
                      className={`group relative block h-full min-h-[200px] md:min-h-[240px] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                        currentSlide === index
                          ? "border-secondary shadow-xl shadow-secondary/20"
                          : "border-gray-200/50 hover:border-secondary/50"
                      }`}
                    >
                      <div className="absolute inset-0">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.banner_image}`}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30 group-hover:from-black/90 transition-all duration-300"></div>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-between p-4 md:p-6">
                        <div className="flex-1">
                          <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-secondary transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-gray-300 text-xs md:text-sm line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                        <motion.div
                          className="ml-4 flex-shrink-0"
                          whileHover={{ x: 5 }}
                        >
                          <div className="bg-gradient-to-r from-primary to-tertiary hover:from-primary-light hover:to-tertiary-light rounded-full p-2 shadow-lg transition-all duration-300">
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white transition-colors" />
                          </div>
                        </motion.div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Right Column - col-7: Sliding Carousel */}
              <motion.div
                className="lg:col-span-7"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {featuredProducts.map(
                    (product, index) =>
                      index === currentSlide && (
                        <motion.div
                          key={product.id || index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Link
                            href={`/products/${product.slug}`}
                            className="group relative block h-full min-h-[452px] md:min-h-[498px] rounded-2xl overflow-hidden shadow-2xl"
                          >
                            {/* Image with Overlay */}
                            <div className="absolute inset-0">
                              <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.banner_image}`}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              {/* Gradient Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-black/95 transition-all duration-300"></div>
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 group-hover:text-secondary transition-colors duration-300">
                                {product.name}
                              </h3>
                              
                              <p className="text-gray-200 text-lg md:text-xl mb-6 line-clamp-3 max-w-2xl">
                                {product.description}
                              </p>

                              {/* CTA */}
                              <motion.div
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-tertiary hover:from-primary-light hover:to-tertiary-light text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg w-fit"
                                whileHover={{ x: 5 }}
                              >
                                <span>Discover More</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </motion.div>
                            </div>
                          </Link>
                        </motion.div>
                      )
                  )}
                </AnimatePresence>

                {/* Slide Indicators */}
                {featuredProducts.length > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {featuredProducts.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-300 rounded-full ${
                          index === currentSlide
                            ? "bg-secondary w-8 h-2"
                            : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}

        {/* Regular Products - Modern Grid with Hover Effects */}
        {regularProducts.length > 0 && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {regularProducts.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="group relative block h-full min-h-[300px] md:min-h-[350px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-secondary/50"
                  >
                    {/* Banner Image as Full Background */}
                    <div className="absolute inset-0">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.banner_image}`}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50 group-hover:from-black/95 group-hover:via-black/80 group-hover:to-black/60 transition-all duration-300"></div>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-secondary transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed line-clamp-2 mb-4">
                        {product.description}
                      </p>
                      
                      {/* CTA Button */}
                      <motion.div
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-tertiary hover:from-primary-light hover:to-tertiary-light text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg w-fit"
                        whileHover={{ x: 5 }}
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Project;
