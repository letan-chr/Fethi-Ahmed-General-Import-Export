"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ExternalLink,
  Globe,
  Briefcase,
} from "lucide-react";
import { SisterCompany as SisterCompanyType } from "@/types/types";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

interface SisterCompanyDetailsProps {
  company: SisterCompanyType | null;
  relatedCompanies: SisterCompanyType[];
}

function SisterCompanyDetails({
  company,
  relatedCompanies,
}: SisterCompanyDetailsProps) {
  const navigate = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Company Not Found
          </h1>
          <Link href="/about" className="text-primary hover:underline">
            Back to About
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-4 py-12 max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => navigate.back()}
          className="flex items-center gap-2 text-foreground-secondary hover:text-primary mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back to About</span>
        </button>

        {/* Hero Section with Banner */}
        <div className="rounded-3xl overflow-hidden mb-12 shadow-2xl relative group">
          <div className="relative h-[350px] md:h-[450px]">
            {company.banner ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${company.banner}`}
                alt={company.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Building2 className="w-32 h-32 text-primary/50" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            <div className="relative z-10 h-full flex items-end p-8 md:p-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-background/20 backdrop-blur-lg rounded-2xl border border-background/30">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl text-white md:text-5xl font-bold mb-2">
                    {company.name}
                  </h1>
                  {company.short_description && (
                    <p className="text-xl text-white/90">
                      {company.short_description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap gap-4 mb-8 border-b border-border">
          {["overview", "services", "contact"].map((tab) => (
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
                    About {company.name}
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    {company.short_description && (
                      <p className="text-foreground leading-relaxed text-lg mb-6">
                        {company.short_description}
                      </p>
                    )}
                    {company.description && (
                      <div
                        className="text-foreground-secondary leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: company.description,
                        }}
                      />
                    )}
                    {company.details && (
                      <div
                        className="text-foreground-secondary leading-relaxed mt-6"
                        dangerouslySetInnerHTML={{
                          __html: company.details,
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Image Gallery */}
                {company.images && company.images.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-foreground mb-6">
                      Gallery
                    </h3>
                    <Swiper
                      modules={[Autoplay, Navigation, Pagination]}
                      slidesPerView={1}
                      spaceBetween={20}
                      loop={true}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                      navigation
                      pagination={{ clickable: true }}
                      breakpoints={{
                        640: {
                          slidesPerView: 2,
                        },
                        1024: {
                          slidesPerView: 3,
                        },
                      }}
                      className="rounded-2xl overflow-hidden"
                    >
                      {company.images.map((img: any, idx: number) => (
                        <SwiperSlide key={idx}>
                          <div className="relative h-64 rounded-xl overflow-hidden">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${
                                typeof img === "string" ? img : img.image_path || img
                              }`}
                              alt={`${company.name} - Image ${idx + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}

                {/* Related Companies */}
                {relatedCompanies.length > 0 && (
                  <div className="mt-20">
                    <h2 className="text-3xl font-bold text-foreground mb-8">
                      Other Sister Companies
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {relatedCompanies.map((item) => (
                        <Link
                          key={item.id}
                          href={`/sister-company/${item.id}`}
                          className="group block bg-background rounded-xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden border border-border/50"
                        >
                          <div className="relative h-48 overflow-hidden">
                            {item.banner ? (
                              <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.banner}`}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                <Building2 className="w-16 h-16 text-primary/50" />
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary line-clamp-2 mb-2">
                              {item.name}
                            </h3>
                            {item.short_description && (
                              <p className="text-foreground-secondary text-sm line-clamp-3">
                                {item.short_description}
                              </p>
                            )}
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
                {/* Contact Info Card */}
                <div className="bg-background rounded-2xl shadow-lg p-6 border border-border/50">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    {company.email && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                          <Mail className="w-5 h-5" />
                        </div>
                        <a
                          href={`mailto:${company.email}`}
                          className="text-foreground-secondary hover:text-primary transition-colors break-all"
                        >
                          {company.email}
                        </a>
                      </div>
                    )}
                    {company.phone && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                          <Phone className="w-5 h-5" />
                        </div>
                        <a
                          href={`tel:${company.phone}`}
                          className="text-foreground-secondary hover:text-primary transition-colors"
                        >
                          {company.phone}
                        </a>
                      </div>
                    )}
                    {company.website_link && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                          <Globe className="w-5 h-5" />
                        </div>
                        <a
                          href={company.website_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground-secondary hover:text-primary transition-colors flex items-center gap-2"
                        >
                          Visit Website
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Social Media Card */}
                {company.social_media_link &&
                  (company.social_media_link.facebook ||
                    company.social_media_link.twitter ||
                    company.social_media_link.linkedin ||
                    company.social_media_link.instagram) && (
                    <div className="bg-background rounded-2xl shadow-lg p-6 border border-border/50">
                      <h3 className="text-xl font-bold text-foreground mb-4">
                        Follow Us
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {company.social_media_link.facebook && (
                          <Link
                            href={company.social_media_link.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-primary/10 rounded-lg text-primary hover:bg-primary hover:text-background transition-colors"
                          >
                            <Facebook className="w-5 h-5" />
                          </Link>
                        )}
                        {company.social_media_link.twitter && (
                          <Link
                            href={company.social_media_link.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-primary/10 rounded-lg text-primary hover:bg-primary hover:text-background transition-colors"
                          >
                            <Twitter className="w-5 h-5" />
                          </Link>
                        )}
                        {company.social_media_link.linkedin && (
                          <Link
                            href={company.social_media_link.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-primary/10 rounded-lg text-primary hover:bg-primary hover:text-background transition-colors"
                          >
                            <Linkedin className="w-5 h-5" />
                          </Link>
                        )}
                        {company.social_media_link.instagram && (
                          <Link
                            href={company.social_media_link.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-primary/10 rounded-lg text-primary hover:bg-primary hover:text-background transition-colors"
                          >
                            <Instagram className="w-5 h-5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  )}

                {/* CTA Card */}
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg p-6 text-white">
                  <h3 className="text-xl font-bold mb-3">
                    Interested in Partnership?
                  </h3>
                  <p className="text-white/90 mb-6 text-sm">
                    Contact us today to learn more about our services and
                    collaboration opportunities.
                  </p>
                  <Link
                    href="/conntacts"
                    className="block w-full bg-background text-primary font-bold py-3 rounded-lg hover:bg-background-secondary transition-colors duration-300 text-center"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === "services" && (
            <div className="bg-background rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Our Services
              </h2>
              {company.service && company.service.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {company.service.map((service, index) => (
                    <motion.div
                      key={index}
                      className="bg-background border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {service.title}
                      </h3>
                      <p className="text-foreground-secondary leading-relaxed">
                        {service.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-foreground-secondary text-center py-12">
                  No services listed at the moment.
                </p>
              )}
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div className="bg-background rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Get in Touch
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {company.email && (
                  <div className="bg-background border border-border/50 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">
                          Email
                        </h3>
                        <a
                          href={`mailto:${company.email}`}
                          className="text-primary hover:underline break-all"
                        >
                          {company.email}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {company.phone && (
                  <div className="bg-background border border-border/50 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">
                          Phone
                        </h3>
                        <a
                          href={`tel:${company.phone}`}
                          className="text-primary hover:underline"
                        >
                          {company.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {company.website_link && (
                  <div className="bg-background border border-border/50 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        <Globe className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">
                          Website
                        </h3>
                        <a
                          href={company.website_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-2"
                        >
                          Visit Website
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Media Section */}
              {company.social_media_link &&
                (company.social_media_link.facebook ||
                  company.social_media_link.twitter ||
                  company.social_media_link.linkedin ||
                  company.social_media_link.instagram) && (
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold text-foreground mb-6">
                      Connect With Us
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {company.social_media_link.facebook && (
                        <Link
                          href={company.social_media_link.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-lg text-primary hover:bg-primary hover:text-background transition-colors"
                        >
                          <Facebook className="w-5 h-5" />
                          <span>Facebook</span>
                        </Link>
                      )}
                      {company.social_media_link.twitter && (
                        <Link
                          href={company.social_media_link.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-lg text-primary hover:bg-primary hover:text-background transition-colors"
                        >
                          <Twitter className="w-5 h-5" />
                          <span>Twitter</span>
                        </Link>
                      )}
                      {company.social_media_link.linkedin && (
                        <Link
                          href={company.social_media_link.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-lg text-primary hover:bg-primary hover:text-background transition-colors"
                        >
                          <Linkedin className="w-5 h-5" />
                          <span>LinkedIn</span>
                        </Link>
                      )}
                      {company.social_media_link.instagram && (
                        <Link
                          href={company.social_media_link.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-lg text-primary hover:bg-primary hover:text-background transition-colors"
                        >
                          <Instagram className="w-5 h-5" />
                          <span>Instagram</span>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SisterCompanyDetails;
