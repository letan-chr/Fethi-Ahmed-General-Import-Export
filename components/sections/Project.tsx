"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Product } from "@/types/types";

interface ProductProps {
  products: Product[];
}

const Project = ({ products }: ProductProps) => {
  const featuredProducts = products
    .filter((product) => product.is_featured)
    .slice(0, 5); // Get up to 5 featured products (1 hero + 4 grid)

  const regularProducts = products
    .filter((product) => !product.is_featured)
    .slice(0, 4);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background via-gray-50/30 to-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
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
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-secondary to-secondary-dark bg-clip-text text-transparent">Products</span>
          </h2>
          
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-secondary to-secondary-dark mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Quality products sourced and manufactured with excellence
          </p>

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
        </motion.div>

        {/* Featured Products - Hero Style Layout */}
        {featuredProducts.length > 0 && (
          <div className="mb-12 md:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Large Featured Product - Takes 2 columns */}
              {featuredProducts[0] && (
                <motion.div
                  className="lg:col-span-2"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                >
                  <Link
                    href={`/products/${featuredProducts[0].slug}`}
                    className="group relative block h-full min-h-[452px] md:min-h-[498px] rounded-2xl overflow-hidden shadow-2xl"
                  >
                    {/* Image with Overlay */}
                    <div className="absolute inset-0">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${featuredProducts[0].banner_image}`}
                        alt={featuredProducts[0].name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-black/95 transition-all duration-300"></div>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                      {/* Badge */}
                      <div className="mb-4">
                        <span className="inline-block bg-gradient-to-r from-primary to-tertiary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
                          {featuredProducts[0].category?.name || "Featured"}
                        </span>
                      </div>

                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 group-hover:text-secondary transition-colors duration-300">
                        {featuredProducts[0].name}
                      </h3>
                      
                      <p className="text-gray-200 text-lg md:text-xl mb-6 line-clamp-3 max-w-2xl">
                        {featuredProducts[0].description}
                      </p>

                      {/* CTA */}
                      <motion.div
                        className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 border border-white/20 group-hover:border-white/40 w-fit"
                        whileHover={{ x: 5 }}
                      >
                        <span>Discover More</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Featured Products Grid - Takes 1 column, shows 4 products */}
              {featuredProducts.length > 1 && (
                <motion.div
                  className="flex flex-col gap-4 md:gap-6"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {featuredProducts.slice(1, 5).map((product, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Link
                        href={`/products/${product.slug}`}
                        className="group relative block h-full min-h-[140px] md:min-h-[150px] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 hover:border-secondary/50"
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

                        <div className="absolute inset-0 flex items-center justify-between p-4 md:p-5">
                          <div className="flex-1">
                            <span className="text-secondary text-xs font-bold mb-1 uppercase tracking-wider block">
                              {product.category?.name || "Featured"}
                            </span>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-secondary transition-colors line-clamp-1">
                              {product.name}
                            </h3>
                            <p className="text-gray-300 text-xs md:text-sm line-clamp-1">
                              {product.description}
                            </p>
                          </div>
                          <motion.div
                            className="ml-4 flex-shrink-0"
                            whileHover={{ x: 5 }}
                          >
                            <div className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-2 border border-white/20 group-hover:border-white/40 transition-all duration-300">
                              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-secondary transition-colors" />
                            </div>
                          </motion.div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
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
                    className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-secondary/50 h-full"
                  >
                    {/* Image Container with Overlay */}
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.banner_image}`}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-125 transition-transform duration-700"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-gradient-to-r from-primary to-tertiary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                          {product.category?.name}
                        </span>
                      </div>

                      {/* Hover CTA */}
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center justify-between">
                          <span className="text-secondary font-semibold text-sm">View Details</span>
                          <ArrowRight className="w-4 h-4 text-secondary" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-secondary transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
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
