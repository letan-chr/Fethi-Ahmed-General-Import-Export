"use client";

import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Testimonial } from "@/types/types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface TestimonialProps {
  testimonials: Testimonial[];
}

const Testimonials = ({ testimonials }: TestimonialProps) => {
  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 28,
    },
    1280: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-6 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <motion.div
            className="w-24 h-1 bg-primary mx-auto mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="text-foreground-secondary mt-4 max-w-2xl mx-auto text-lg">
            We take pride in our customer satisfaction. Here's what our clients
            have to say about us.
          </p>
        </motion.div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={28}
          slidesPerView={1}
          navigation={{
            nextEl: ".testimonial-next-btn",
            prevEl: ".testimonial-prev-btn",
          }}
          pagination={{
            clickable: true,
            el: ".testimonial-pagination",
            bulletClass:
              "swiper-pagination-bullet bg-border hover:bg-primary transition-all duration-300 w-2 h-2",
            bulletActiveClass:
              "swiper-pagination-bullet-active !bg-primary !w-8",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          grabCursor={true}
          breakpoints={breakpoints}
          className="pb-16"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="h-auto">
              <motion.div
                className="relative h-[380px] md:h-[400px] rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-background-secondary/50 to-background-secondary/30 backdrop-blur-sm border border-border/50 hover:border-primary/50"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                {/* Content Container */}
                <div className="flex flex-col h-full p-6 md:p-8 relative z-10">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 text-primary/10 dark:text-primary/20 text-6xl md:text-7xl font-serif leading-none">
                    "
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center mb-4 relative z-10">
                    {[...Array(Number(testimonial.rating) || 5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        className="w-5 h-5 text-primary mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1 + i * 0.05,
                        }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-foreground-secondary mb-6 leading-relaxed text-base md:text-lg relative z-10 flex-1 overflow-hidden">
                    "{testimonial.description}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center pt-4 border-t border-border/50 relative z-10">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-on-primary font-bold text-lg md:text-xl mr-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                      {testimonial.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-foreground text-base md:text-lg mb-1 group-hover:text-primary transition-colors duration-300">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-foreground-secondary">
                        {testimonial.role}
                      </div>
                      {testimonial.company && (
                        <div className="text-xs text-foreground-secondary/70 mt-1">
                          {testimonial.company}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Decorative line on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination */}
        <div className="testimonial-pagination flex justify-center gap-2 mt-6"></div>
      </div>
    </section>
  );
};

export default Testimonials;
