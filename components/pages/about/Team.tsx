"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { TeamMember } from "@/types/types";

interface TeamProps {
  teams: TeamMember[];
}

const Team = ({ teams }: TeamProps) => {
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
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 28,
    },
    1280: {
      slidesPerView: 5,
      spaceBetween: 28,
    },
  };

  return (
    <section className="py-8 md:py-10 lg:py-12 bg-gradient-to-br from-foreground via-foreground/95 to-foreground relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="max-w-9xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-6 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-background mb-4">
            Leadership Team
          </h2>
          <motion.div
            className="w-24 h-1 bg-primary mx-auto mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="text-background/90 mt-4 max-w-2xl mx-auto text-lg">
            Meet the experienced leaders driving our company's success in connecting Ethiopia with the world.
          </p>
        </motion.div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={28}
          slidesPerView={1}
          navigation={{
            nextEl: ".team-next-btn",
            prevEl: ".team-prev-btn",
          }}
          pagination={{
            clickable: true,
            el: ".team-pagination",
            bulletClass:
              "swiper-pagination-bullet bg-border hover:bg-primary transition-all duration-300 w-2 h-2",
            bulletActiveClass:
              "swiper-pagination-bullet-active !bg-primary !w-8",
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          grabCursor={true}
          breakpoints={breakpoints}
          className="pb-16"
        >
          {teams.map((member, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="flex flex-col h-[280px] md:h-[320px] rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 bg-background/10 backdrop-blur-sm border-2 border-primary/30 hover:border-primary/50"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -12 }}
              >
                {/* Image Container - Top */}
                <div className="relative h-[180px] md:h-[200px] overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${member.image}`}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                  />
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>

                {/* Content Container - Bottom */}
                <div className="flex-1 flex flex-col justify-center p-4 md:p-6 bg-background/10 backdrop-blur-sm">
                  <motion.div
                    className="transform group-hover:translate-y-[-4px] transition-transform duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-primary font-semibold text-xs md:text-sm mb-1 opacity-90 group-hover:opacity-100 transition-opacity">
                      {member.position}
                    </p>
                    <h3 className="text-base md:text-lg font-bold text-background mb-2 group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </h3>

                    {/* Decorative line */}
                    <div className="w-12 h-0.5 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination */}
        <div className="team-pagination flex justify-center gap-2 mt-6"></div>
      </div>
    </section>
  );
};

export default Team;
