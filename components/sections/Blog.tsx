// components/sections/Blog.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Blog as BlogType } from "@/types/types";

interface BlogProps {
  blogs?: BlogType[];
}

const Blog = ({ blogs }: BlogProps) => {
  // Separate featured and latest blogs
  const featuredBlogs = blogs?.filter((blog) => blog.is_featured) || [];
  const latestBlogs = blogs?.filter((blog) => !blog.is_featured) || [];
  
  // Get first featured blog for featured row
  const featuredBlog = featuredBlogs[0];
  
  // Get first 4 latest blogs for latest row
  const displayLatest = latestBlogs.slice(0, 4);

  // Featured Blog Card - Split layout with fade image left and content right
  const FeaturedBlogCard = ({ post }: { post: BlogType }) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-16"
      >
        <Link
          href={`/blogs/${post.slug}`}
          className="group block bg-background rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-border"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section - Left with fade effect */}
            <motion.div 
              className="relative h-64 md:h-auto md:min-h-[400px] overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${post.banner_image}`}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Fade effect on right edge */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background"></div>
            </motion.div>

            {/* Content Section - Right */}
            <motion.div 
              className="p-8 md:p-12 flex flex-col justify-center bg-background"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 text-sm text-foreground-tertiary mb-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                {post.title}
              </h2>

              <p className="text-foreground-secondary text-lg leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all duration-300">
                <span>Read Full Story</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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
            </motion.div>
          </div>
        </Link>
      </motion.div>
    );
  };

  // Latest Blog Card - Clean card style
  const LatestBlogCard = ({ post }: { post: BlogType }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -10 }}
        className="h-full"
      >
        <Link
          href={`/blogs/${post.slug}`}
          className="group block h-full"
        >
          <div className="bg-background rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-border h-full flex flex-col">
            <div className="relative h-40 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-darker/30 to-transparent z-10"></div>
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${post.banner_image}`}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute bottom-4 right-4 z-20">
                <div className="w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
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
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="p-6 flex-grow flex flex-col">
              <div className="flex items-center text-sm text-foreground-tertiary mb-3">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>

              <h3 className="text-base font-normal text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {post.title}
              </h3>

              <div className="pt-4 border-t border-border mt-auto">
                <span className="inline-flex items-center text-foreground font-semibold group-hover:gap-2 transition-all duration-300">
                  Read Article
                  <svg
                    className="w-4 h-4 ml-1 group-hover:ml-2 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto px-4 max-w-7xl">
        {/* Header Section - Left aligned title/description with button on right */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Latest Blog Posts
            </h2>
            <motion.div
              className="w-24 h-1 bg-primary mb-4"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <p className="text-foreground-secondary max-w-2xl">
              Stay updated with our latest news, insights, and updates
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/blogs"
              className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors duration-300 group"
            >
              View All Blogs
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Featured Blog Row */}
        {featuredBlog && <FeaturedBlogCard post={featuredBlog} />}

        {/* Latest Blogs Row - 4 cards in a row */}
        {displayLatest.length > 0 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayLatest.map((post) => (
                <LatestBlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
