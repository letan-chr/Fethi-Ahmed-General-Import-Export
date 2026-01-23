"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { ArrowLeft, CheckCircle, Zap, Award, Headphones } from "lucide-react";
import { Service } from "@/types/types";

interface ServiceDetailsProps {
  service: Service | null;
  relatedServices: Service[];
}

function ServiceDetails({ service, relatedServices }: ServiceDetailsProps) {
  const navigate = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  function getFAIcon(iconName?: string | null) {
    const valid =
      typeof iconName === "string" &&
      iconName.trim() !== "" &&
      (iconName.startsWith("fa ") ||
        iconName.startsWith("fa-") ||
        iconName.startsWith("fas ") ||
        iconName.startsWith("fas-") ||
        iconName.startsWith("fab ") ||
        iconName.startsWith("fab-") ||
        iconName.startsWith("far ") ||
        iconName.startsWith("far-"));

    if (valid) {
      return <i className={`${iconName} text-3xl`}></i>;
    }

    // BETTER fallback for stats
    return <i className="fa-solid fa-gem text-3xl"></i>;
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Service Not Found
          </h1>
          <Link href="/service" className="text-primary hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-4 py-12 max-w-9xl">
        {/* Back Button */}
        <button
          onClick={() => navigate.back()}
          className="flex items-center gap-2 text-foreground-secondary hover:text-primary mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back to Services</span>
        </button>

        {/* Hero Section */}
        {/* 🔥 IMAGE SLIDER */}
        <div className="rounded-3xl overflow-hidden mb-12 shadow-2xl">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            className="h-[350px] md:h-[450px]"
          >
            {(service.images && service.images.length > 0
              ? service.images
              : [service.banner_image]
            ).map((img, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className="relative h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      process.env.NEXT_PUBLIC_IMAGE_URL
                    }/${typeof img === "string" ? img : img.image_path})`,
                  }}
                >
                  <div className="absolute inset-0 bg-black/70"></div>

                  <div className="relative z-10 h-full flex items-end p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-4 bg-background/20 backdrop-blur-lg rounded-2xl border border-background/30">
                        {getFAIcon(service.icon_class)}
                      </div>
                      <div>
                        <h1 className="text-4xl text-white md:text-5xl font-bold">
                          {service.title}
                        </h1>
                        <p className="text-xl text-white">
                          {service.short_description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap gap-4 mb-8 border-b border-border">
          {["overview"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold text-sm uppercase tracking-wide transition-colors duration-300 border-b-2 ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground-secondary hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-12">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="bg-background rounded-2xl shadow-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    Service Overview
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-foreground leading-relaxed text-lg mb-6">
                      {service.short_description}
                    </p>
                    <p
                      className="text-foreground-secondary leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: service.description || "",
                      }}
                    ></p>
                  </div>
                </div>

                {/* 🌟 Related Services */}
                {relatedServices.length > 0 && (
                  <div className="mt-20">
                    <h2 className="text-3xl font-bold text-foreground mb-8">
                      Related Services
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {relatedServices.map((item) => (
                        <Link
                          key={item.slug}
                          href={`/service/${item.slug}`}
                          className="group block bg-background rounded-xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                          <div
                            className="h-48 bg-cover bg-center"
                            style={{
                              backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.banner_image})`,
                            }}
                          ></div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-foreground-secondary text-sm mt-2 line-clamp-3">
                              {item.short_description}
                            </p>
                            <p className="text-primary font-semibold mt-3 group-hover:underline">
                              View Details →
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="bg-background rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Why Choose Our Services?
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: <Zap className="w-5 h-5" />,
                        text: "Fast Delivery",
                      },
                      {
                        icon: <Award className="w-5 h-5" />,
                        text: "Quality Guaranteed",
                      },
                      {
                        icon: <Headphones className="w-5 h-5" />,
                        text: "24/7 Support",
                      },
                      {
                        icon: <CheckCircle className="w-5 h-5" />,
                        text: "Satisfaction Guaranteed",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                          {item.icon}
                        </div>
                        <span className="text-foreground-secondary font-medium">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg p-6 text-on-primary">
                  <h3 className="text-xl font-bold mb-3">
                    Ready to Get Started?
                  </h3>
                  <p className="text-on-primary/90 mb-6 text-sm">
                    Contact us today for a free consultation and quote.
                  </p>
                  <Link
                    href="/conntacts"
                    className="block w-full bg-background text-primary font-bold py-3 rounded-lg hover:bg-background-secondary transition-colors duration-300 text-center"
                  >
                    Get Free Quote
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
