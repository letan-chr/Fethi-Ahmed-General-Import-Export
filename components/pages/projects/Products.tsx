"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ShoppingBag, Tag, ArrowRight, Star } from "lucide-react";
import { Product, ProductCategory, Feature } from "@/types/types";
import { getBatchData, getProductCategories } from "@/api/Service";
import AdvertisementSidebar from "@/components/layouts/AdvertisementSidebar";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | "All">(
    "All"
  );
  const [selectedFeaturedIndex, setSelectedFeaturedIndex] = useState(0);
  const [isAutoSlidePaused, setIsAutoSlidePaused] = useState(false);
  const autoSlideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const features: Feature[] = [{ name: "ecommerce_product", amount: 100000 }];

        const [productsRes, categoriesRes] = await Promise.all([
          getBatchData(features),
          getProductCategories(),
        ]);

        setProducts(productsRes.ecommerce_product?.data ?? []);
        setCategories(categoriesRes.data ?? []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.product_category_id === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured products - limit to 3
  const featuredProducts = filteredProducts
    .filter((p) => p.is_featured === true)
    .slice(0, 3);

  // Reset selected featured index when featured products change
  useEffect(() => {
    if (featuredProducts.length > 0 && selectedFeaturedIndex >= featuredProducts.length) {
      setSelectedFeaturedIndex(0);
    }
  }, [featuredProducts.length, selectedFeaturedIndex]);

  // Auto-slide functionality
  useEffect(() => {
    if (featuredProducts.length <= 1) return;

    if (isAutoSlidePaused) return;

    const interval = setInterval(() => {
      setSelectedFeaturedIndex((prevIndex) => {
        return (prevIndex + 1) % featuredProducts.length;
      });
    }, 5000); // Change slide every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, [featuredProducts.length, isAutoSlidePaused]);

  // Helper function to pause auto-slide temporarily
  const pauseAutoSlideTemporarily = () => {
    setIsAutoSlidePaused(true);
    // Clear any existing timeout
    if (autoSlideTimeoutRef.current) {
      clearTimeout(autoSlideTimeoutRef.current);
    }
    // Resume after 5 seconds
    autoSlideTimeoutRef.current = setTimeout(() => {
      setIsAutoSlidePaused(false);
    }, 5000);
  };

  // Regular products (not featured)
  const regularProducts = filteredProducts.filter((p) => p.is_featured !== true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="py-8 md:py-12 bg-background min-h-screen">
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-9xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Sidebar - Filters & Categories */}
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <div className="lg:sticky lg:top-8 space-y-6">
              {/* Search Section */}
              <div className="bg-gradient-to-br from-background to-background-secondary rounded-2xl shadow-lg p-6 border border-border/50 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Search className="w-5 h-5 text-secondary" />
                  </div>
                  <span>Search Products</span>
                </h3>
                <form onSubmit={handleSearch} className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full px-4 py-3 pl-11 bg-background border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground placeholder-foreground-tertiary"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-tertiary" />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-tertiary hover:from-primary-light hover:to-tertiary-light text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Search
                  </button>
                </form>
              </div>

              {/* Categories */}
              <div className="bg-gradient-to-br from-background to-background-secondary rounded-2xl shadow-lg p-6 border border-border/50 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Tag className="w-5 h-5 text-primary" />
                  </div>
                  <span>Categories</span>
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedCategory === "All"
                        ? "bg-gradient-to-r from-primary to-primary-dark text-on-primary shadow-lg transform scale-105"
                        : "bg-background-secondary text-foreground hover:bg-primary/10 hover:text-primary hover:translate-x-1 border border-border/50"
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <span>All Products</span>
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                        selectedCategory === "All"
                          ? "bg-on-primary/20 text-on-primary"
                          : "bg-primary/10 text-primary"
                      }`}>
                        {products.length}
                      </span>
                    </span>
                  </button>
                  {categories.map((category) => {
                    const count = products.filter(
                      (p) => p.product_category_id === category.id
                    ).length;
                    const isSelected = selectedCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                          isSelected
                            ? "bg-gradient-to-r from-primary to-primary-dark text-on-primary shadow-lg transform scale-105"
                            : "bg-background-secondary text-foreground hover:bg-primary/10 hover:text-primary hover:translate-x-1 border border-border/50"
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          <span>{category.name}</span>
                          <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                            isSelected
                              ? "bg-on-primary/20 text-on-primary"
                              : "bg-primary/10 text-primary"
                          }`}>
                            {count}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Advertisement */}
              <div className="hidden lg:block">
                <AdvertisementSidebar />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-9 order-1 lg:order-2 space-y-10">
            {/* Featured Products Section */}
            {featuredProducts.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <Star className="w-6 h-6 text-primary fill-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                        Featured Products
                      </h2>
                      <p className="text-sm text-foreground-secondary">Handpicked selections</p>
                    </div>
                  </div>
                </div>

                {/* Featured Products Layout - Two Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-stretch">
                  {/* Left Column - Small Cards List */}
                  <div className="lg:col-span-1 flex flex-col space-y-4">
                    {featuredProducts.map((product, index) => (
                      <button
                        key={product.id}
                        onClick={() => {
                          setSelectedFeaturedIndex(index);
                          pauseAutoSlideTemporarily();
                        }}
                        onMouseEnter={() => setIsAutoSlidePaused(true)}
                        onMouseLeave={() => {
                          if (autoSlideTimeoutRef.current) {
                            return;
                          }
                          setIsAutoSlidePaused(false);
                        }}
                        className={`group w-full bg-gradient-to-br from-background to-background-secondary rounded-xl shadow-md hover:shadow-lg border-2 overflow-hidden transition-all duration-300 text-left flex-shrink-0 ${
                          index === selectedFeaturedIndex
                            ? "border-primary shadow-xl scale-105"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex gap-4 p-4">
                          {/* Small Image */}
                          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-background-secondary">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.banner_image}`}
                              alt={product.name}
                              fill
                              className={`object-cover transition-transform duration-500 ${
                                index === selectedFeaturedIndex
                                  ? "scale-110"
                                  : "group-hover:scale-110"
                              }`}
                            />
                            {/* Active Indicator */}
                            {index === selectedFeaturedIndex && (
                              <div className="absolute inset-0 bg-primary/20"></div>
                            )}
                          </div>
                          {/* Content */}
                          <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <h3 className={`text-sm font-bold mb-1 line-clamp-2 transition-colors ${
                              index === selectedFeaturedIndex
                                ? "text-primary"
                                : "text-foreground group-hover:text-primary"
                            }`}>
                              {product.name}
                            </h3>
                            <p className="text-xs text-foreground-secondary line-clamp-2">
                              {product.description}
                            </p>
                          </div>
                          {/* Arrow Indicator */}
                          <div className={`flex items-center transition-transform ${
                            index === selectedFeaturedIndex
                              ? "translate-x-0"
                              : "translate-x-2 group-hover:translate-x-0"
                          }`}>
                            <ArrowRight className={`w-4 h-4 ${
                              index === selectedFeaturedIndex
                                ? "text-primary"
                                : "text-foreground-tertiary"
                            }`} />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Right Column - Large Featured Card */}
                  <div 
                    className="lg:col-span-2 relative flex"
                    onMouseEnter={() => setIsAutoSlidePaused(true)}
                    onMouseLeave={() => {
                      if (autoSlideTimeoutRef.current) {
                        return;
                      }
                      setIsAutoSlidePaused(false);
                    }}
                  >
                    <Link
                      href={`/products/${featuredProducts[selectedFeaturedIndex]?.slug}`}
                      className="group bg-gradient-to-br from-background to-background-secondary rounded-2xl shadow-lg hover:shadow-2xl border-2 border-border hover:border-primary/50 overflow-hidden transition-all duration-500 w-full h-full flex flex-col"
                    >
                      <div className="relative flex-1 overflow-hidden bg-background-secondary">
                        {featuredProducts.map((product, index) => (
                          <div
                            key={product.id}
                            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                              index === selectedFeaturedIndex
                                ? "opacity-100 translate-x-0"
                                : index < selectedFeaturedIndex
                                ? "opacity-0 -translate-x-full"
                                : "opacity-0 translate-x-full"
                            }`}
                          >
                            <Image
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.banner_image}`}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
                            
                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                              <div className="max-w-2xl">
                                <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight line-clamp-3">
                                  {product.name}
                                </h3>
                                <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-6 line-clamp-3">
                                  {product.description}
                                </p>
                                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-tertiary hover:from-primary-light hover:to-tertiary-light text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg">
                                  <span>View Product Details</span>
                                  <ArrowRight className="w-5 h-5" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Navigation Dots */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                      {featuredProducts.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedFeaturedIndex(index);
                            pauseAutoSlideTemporarily();
                          }}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === selectedFeaturedIndex
                              ? "bg-primary w-8"
                              : "bg-white/50 hover:bg-white/75"
                          }`}
                          aria-label={`Go to featured product ${index + 1}`}
                        />
                      ))}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* All Products Section */}
            {regularProducts.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                        All Products
                      </h2>
                      <p className="text-sm text-foreground-secondary">{regularProducts.length} products available</p>
                    </div>
                  </div>
                </div>

                {/* Products Grid - 4 columns with equal heights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                  {regularProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.03 }}
                      className="h-full flex"
                    >
                      <Link
                        href={`/products/${product.slug}`}
                        className="group flex flex-col bg-gradient-to-br from-background to-background-secondary rounded-xl shadow-md hover:shadow-xl border border-border hover:border-primary/30 overflow-hidden transition-all duration-300 hover:-translate-y-1 relative w-full"
                      >
                        {/* Product Image - Fixed Height */}
                        <div className="relative h-44 overflow-hidden bg-background-secondary flex-shrink-0">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.banner_image}`}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>

                        {/* Product Info - Flex grow to fill space */}
                        <div className="p-4 flex flex-col flex-grow">
                          <h3 className="text-base font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                            {product.name}
                          </h3>
                          <p className="text-xs text-foreground-secondary mb-4 line-clamp-2 leading-relaxed flex-grow">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-end pt-3 border-t border-border/30 mt-auto">
                            <div className="w-9 h-9 rounded-full bg-primary/10 group-hover:bg-primary transition-all duration-300 flex items-center justify-center group-hover:scale-110">
                              <ArrowRight className="w-4 h-4 text-primary group-hover:text-on-primary group-hover:translate-x-0.5 transition-all" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-background-secondary to-background-tertiary rounded-2xl flex items-center justify-center shadow-lg">
                    <ShoppingBag className="w-12 h-12 text-foreground-tertiary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    No products found
                  </h3>
                  <p className="text-foreground-secondary">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
