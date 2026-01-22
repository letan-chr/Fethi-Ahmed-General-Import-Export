"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Blog, BlogImage } from "@/types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface BlogDetailsProps {
  blog: Blog | null;
  relatedBlogs: Blog[];
}

const BlogDetails = ({ blog, relatedBlogs }: BlogDetailsProps) => {
  return (
    <div className="py-12 md:py-12 lg:py-12 bg-background min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-9xl mx-auto">
          {/* Back Button */}
          <Link
            href="/blogs"
            className="inline-flex items-center text-primary hover:text-primary-dark mb-8 group"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>

          {/* Main Card: Left Image, Right Content */}
          <div className="bg-background rounded-xl shadow-lg overflow-hidden border border-border mb-12">
            <div className="flex flex-col lg:flex-row">
              {/* Left Side: Banner Image Section */}
              <div className="lg:w-1/2 relative rounded-xl overflow-hidden shadow-lg">
                <Swiper
                  modules={[Autoplay, Navigation, Pagination]}
                  slidesPerView={1}
                  loop={true}
                  autoplay={{ delay: 3000 }}
                  className="h-[350px] md:h-[450px] rounded-xl"
                >
                  {blog?.images && blog.images.length > 0 ? (
                    blog.images.map((img: BlogImage, i: number) => (
                      <SwiperSlide key={i}>
                        <div
                          className="h-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URL}/${img.image_path})`,
                          }}
                        >
                          <div className="h-full w-full bg-black/40 flex justify-center items-end p-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                              {blog?.title}
                            </h1>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    // Fallback slide: banner_image
                    <SwiperSlide>
                      <div
                        className="h-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URL}/${blog?.banner_image})`,
                        }}
                      >
                        <div className="h-full w-full bg-black/40 flex justify-center items-end p-8">
                          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                            {blog?.title}
                          </h1>
                        </div>
                      </div>
                    </SwiperSlide>
                  )}
                </Swiper>
              </div>

              {/* Right Side: Content */}
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <span className="inline-block bg-primary text-on-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    {blog?.category?.title}
                  </span>
                  <p className="text-sm text-foreground-tertiary mb-4">
                    {blog?.created_at
                      ? new Date(blog.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "No Date"}
                  </p>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                    {blog?.title}
                  </h1>
                </div>

                <div
                  className="prose prose-lg max-w-none text-foreground-secondary
                    prose-headings:text-foreground prose-headings:font-bold
                    prose-p:leading-relaxed prose-p:mb-4
                    prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4
                    prose-li:mb-2
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4"
                  dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
                />
              </div>
            </div>
          </div>

          {/* Related Posts Section */}
          {relatedBlogs.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blogs/${relatedPost.slug}`}
                    className="bg-background rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border border-border"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${relatedPost.banner_image}`}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full text-sm font-semibold">
                        {relatedPost?.category?.title}
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-6">
                      <p className="text-sm text-foreground-tertiary mb-2">
                        {new Date(relatedPost.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-foreground-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                        <span>Read More</span>
                        <svg
                          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
