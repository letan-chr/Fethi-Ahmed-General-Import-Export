"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Feature, Service } from "@/types/types";
import { getBatchData } from "@/api/Service";

function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const features: Feature[] = [
      { name: "about_service", amount: 100000 },
    ];

    async function fetchData() {
      try {
        const data = await getBatchData(features);

        setServices(data.about_service?.data ?? []);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Services Timeline */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-9xl">
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary"></div>

            <div className="space-y-8 lg:space-y-12">
              {services.map((service, index) => (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Timeline Dot - Centered vertically */}
                  <div className="hidden lg:block absolute left-8 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg"></div>
                  </div>

                  {/* Horizontal Connecting Line - Centered vertically */}
                  <div className="hidden lg:block absolute left-8 top-1/2 w-16 h-0.5 bg-primary transform -translate-y-1/2"></div>

                  {/* Card Dot - Centered vertically */}
                  <div className="hidden lg:block absolute left-24 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-3 h-3 rounded-full bg-primary border-2 border-background shadow-md"></div>
                  </div>

                  <Link
                    href={`/service/${service.slug}`}
                    className="group block lg:pl-24"
                  >
                    <div className="bg-background-secondary/50 backdrop-blur-sm rounded-3xl overflow-hidden border-2 border-primary hover:border-primary-dark transition-all duration-500 hover:shadow-2xl">
                      {/* Content Section */}
                      <div className="p-8 md:p-12 lg:p-16">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
                          {/* Text Content */}
                          <div className="flex-1 space-y-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                                <span className="text-xl font-bold text-primary group-hover:text-on-primary transition-colors">
                                  {String(index + 1).padStart(2, '0')}
                                </span>
                              </div>
                              <div className="h-px flex-1 bg-border/50"></div>
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                              {service.title}
                            </h2>

                            <p className="text-lg md:text-xl text-foreground-secondary leading-relaxed">
                              {service.short_description}
                            </p>

                            <div className="flex items-center gap-3 text-primary font-semibold pt-4">
                              <span className="group-hover:underline">Learn More</span>
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                            </div>
                          </div>

                          {/* Image Section */}
                          <div className="lg:w-96 lg:flex-shrink-0">
                            <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden bg-background-tertiary">
                              <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${service.banner_image}`}
                                alt={service.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {services.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-background-secondary flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-foreground-tertiary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  No services available
                </h3>
                <p className="text-lg text-foreground-secondary">
                  Services will be displayed here when available
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Services;
