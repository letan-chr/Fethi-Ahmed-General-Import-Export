"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Blog as BlogType, BlogCategory, Feature } from "@/types/types";
import { getBatchData, getBlogCategories } from "@/api/Service";
import AdvertisementSidebar from "@/components/layouts/AdvertisementSidebar";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | "All">(
    "All"
  );
  const [selectedFeaturedIndex, setSelectedFeaturedIndex] = useState(0);
  const [isAutoSlidePaused, setIsAutoSlidePaused] = useState(false);
  const autoSlideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const features: Feature[] = [{ name: "blog_post", amount: 100000 }];

        const [blogsRes, categoriesRes] = await Promise.all([
          getBatchData(features),
          getBlogCategories(),
        ]);

        setBlogs(blogsRes.blog_post?.data ?? []);
        setCategories(categoriesRes.data ?? []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" || blog.blog_category_id === selectedCategory;
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured posts - limit to 4
  const featuredPosts = filteredBlogs.filter((p) => p.is_featured === true).slice(0, 4);

  // Reset selected featured index when featured posts change
  useEffect(() => {
    if (featuredPosts.length > 0 && selectedFeaturedIndex >= featuredPosts.length) {
      setSelectedFeaturedIndex(0);
    }
  }, [featuredPosts.length, selectedFeaturedIndex]);

  // Auto-slide functionality
  useEffect(() => {
    if (featuredPosts.length <= 1) return;

    if (isAutoSlidePaused) return;

    const interval = setInterval(() => {
      setSelectedFeaturedIndex((prevIndex) => {
        return (prevIndex + 1) % featuredPosts.length;
      });
    }, 5000); // Change slide every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, [featuredPosts.length, isAutoSlidePaused]);

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


  // Get latest 3 posts
  const latestPosts = [...blogs]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 3);

  // Regular posts (not featured)
  const regularPosts = filteredBlogs.filter((p) => p.is_featured !== true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality can be implemented here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="py-12 md:py-12 lg:py-12 bg-background min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Featured Posts Section - Large Card + 4 Small Cards */}
            {featuredPosts.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-4xl font-bold text-foreground mb-2">
                      Featured Stories
                    </h2>
                    <p className="text-foreground-secondary">
                      Handpicked articles worth reading
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-primary">
                    <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full"></div>
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                </div>

                {/* Large Featured Card - Full Width */}
                <div 
                  className="relative overflow-hidden rounded-2xl shadow-2xl bg-background border border-border"
                  onMouseEnter={() => setIsAutoSlidePaused(true)}
                  onMouseLeave={() => {
                    // Only resume if not paused by click
                    if (autoSlideTimeoutRef.current) {
                      return;
                    }
                    setIsAutoSlidePaused(false);
                  }}
                >
                  <div className="relative h-[450px] md:h-[550px] overflow-hidden">
                    {featuredPosts.map((post, index) => (
                      <Link
                        key={post.id}
                        href={`/blogs/${post.slug}`}
                        className={`absolute inset-0 block transition-all duration-700 ease-in-out ${
                          index === selectedFeaturedIndex
                            ? "opacity-100 translate-x-0"
                            : index < selectedFeaturedIndex
                            ? "opacity-0 -translate-x-full"
                            : "opacity-0 translate-x-full"
                        }`}
                      >
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${post.banner_image}`}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
                        
                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                          <div className="max-w-4xl">
                            {/* Category Badge */}
                            <div className="inline-flex items-center gap-3 mb-4">
                              <span className="bg-primary text-on-primary px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
                                {post.category?.title}
                              </span>
                              <span className="text-white/80 text-sm">
                                {new Date(post.created_at).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                            
                            {/* Title */}
                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight line-clamp-3">
                              {post.title}
                            </h3>
                            
                            {/* Excerpt */}
                            <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-6 line-clamp-3">
                              {post.excerpt}
                            </p>
                            
                            {/* Read More Button */}
                            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-tertiary hover:from-primary-light hover:to-tertiary-light text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg">
                              <span>Read Full Article</span>
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  {/* Navigation Dots */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                    {featuredPosts.map((_, index) => (
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
                        aria-label={`Go to featured post ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Small Featured Cards Grid - 4 Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {featuredPosts.map((post, index) => (
                    <button
                      key={post.id}
                      onClick={() => {
                        setSelectedFeaturedIndex(index);
                        pauseAutoSlideTemporarily();
                      }}
                      onMouseEnter={() => setIsAutoSlidePaused(true)}
                      onMouseLeave={() => {
                        // Only resume if not paused by click
                        if (autoSlideTimeoutRef.current) {
                          // Click pause is active, don't resume yet
                          return;
                        }
                        setIsAutoSlidePaused(false);
                      }}
                      className={`group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 text-left ${
                        index === selectedFeaturedIndex
                          ? "ring-2 ring-primary ring-offset-2 scale-105"
                          : "hover:scale-105 hover:shadow-xl"
                      }`}
                      aria-label={`View ${post.title}`}
                    >
                      <div className="relative h-32 md:h-36 overflow-hidden">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${post.banner_image}`}
                          alt={post.title}
                          fill
                          className={`object-cover transition-transform duration-500 ${
                            index === selectedFeaturedIndex
                              ? "scale-110"
                              : "group-hover:scale-110"
                          }`}
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        
                        {/* Active Indicator */}
                        {index === selectedFeaturedIndex && (
                          <div className="absolute top-2 right-2 z-10">
                            <div className="w-3 h-3 bg-primary rounded-full shadow-lg animate-pulse"></div>
                          </div>
                        )}
                        
                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-4">
                          <div>
                            <span className="text-xs text-white/80 mb-1 block">
                              {new Date(post.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                            <h4 className="text-sm font-bold text-white line-clamp-2 leading-tight">
                              {post.title}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Posts Section */}
            {regularPosts.length > 0 && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-4xl font-bold text-foreground mb-2">
                      Latest Articles
                    </h2>
                    <p className="text-foreground-secondary">
                      Explore our collection of insightful content
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-primary">
                    <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full"></div>
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                </div>

                {/* Regular Posts Grid - Banner Background Design */}
                <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                  {regularPosts.map((post, index) => (
                    <Link
                      key={post.id}
                      href={`/blogs/${post.slug}`}
                      className="group block relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500"
                    >
                      <div className="relative h-[350px] md:h-[400px] overflow-hidden">
                        {/* Background Image with Overlay */}
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${post.banner_image}`}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
                        
                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                          <div className="max-w-3xl">
                            {/* Category Badge */}
                            <div className="inline-flex items-center gap-2 mb-4">
                              <span className="bg-primary text-on-primary px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
                                {post.category?.title}
                              </span>
                              <span className="text-white/80 text-sm">
                                {new Date(post.created_at).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                            
                            {/* Title */}
                            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                              {post.title}
                            </h2>
                            
                            {/* Excerpt */}
                            <p className="text-white/90 text-base md:text-lg leading-relaxed mb-5 line-clamp-2">
                              {post.excerpt}
                            </p>
                            
                            {/* Read More Button */}
                            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-tertiary hover:from-primary-light hover:to-tertiary-light text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 group-hover:scale-105 shadow-lg">
                              <span>Read Full Article</span>
                              <svg
                                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredBlogs.length === 0 && (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 bg-background-secondary rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-foreground-tertiary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    No articles found
                  </h3>
                  <p className="text-foreground-secondary">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <div className="bg-background rounded-xl shadow-lg p-6 border border-border space-y-6">
                {/* Advertisement Carousel - First */}
                <AdvertisementSidebar />

                {/* Search Form */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Search
                  </h3>
                  <form onSubmit={handleSearch} className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search articles..."
                        className="w-full px-4 py-3 pl-10 bg-background-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-foreground-tertiary transition-all"
                      />
                      <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground-tertiary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-tertiary hover:from-primary-light hover:to-tertiary-light text-white font-semibold py-3 rounded-lg transition-all duration-300"
                    >
                      Search
                    </button>
                  </form>
                </div>

                {/* Latest Posts */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Latest Posts
                  </h3>
                  <div className="space-y-4">
                    {latestPosts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/blogs/${post.id}`}
                        className="block group hover:opacity-80 transition-opacity"
                      >
                        <div className="flex gap-3">
                          <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${post.banner_image}`}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-foreground-tertiary mb-1">
                              {new Date(post.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </p>
                            <h4 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                              {post.title}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Categories
                  </h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCategory("All")}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                        selectedCategory === "All"
                          ? "bg-primary text-on-primary shadow-md shadow-primary/20"
                          : "bg-background-secondary text-foreground hover:bg-primary/5 hover:text-primary border border-border/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full transition-all ${
                          selectedCategory === "All"
                            ? "bg-on-primary"
                            : "bg-primary/40 group-hover:bg-primary"
                        }`}></div>
                        <span className="font-medium">All Categories</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                        selectedCategory === "All"
                          ? "bg-on-primary/20 text-on-primary"
                          : "bg-background-tertiary text-foreground-tertiary group-hover:bg-primary/10"
                      }`}>
                        {blogs.length}
                      </span>
                    </button>

                    {categories.map((category) => {
                      const count = blogs.filter(
                        (b) => b.blog_category_id === category.id
                      ).length;
                      const isSelected = selectedCategory === category.id;
                      return (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                            isSelected
                              ? "bg-primary text-on-primary shadow-md shadow-primary/20"
                              : "bg-background-secondary text-foreground hover:bg-primary/5 hover:text-primary border border-border/50"
                          }`}
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className={`w-1.5 h-1.5 rounded-full transition-all shrink-0 ${
                              isSelected
                                ? "bg-on-primary"
                                : "bg-primary/40 group-hover:bg-primary"
                            }`}></div>
                            <span className="font-medium truncate">{category.title}</span>
                          </div>
                          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ml-2 shrink-0 ${
                            isSelected
                              ? "bg-on-primary/20 text-on-primary"
                              : "bg-background-tertiary text-foreground-tertiary group-hover:bg-primary/10"
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Blog;
