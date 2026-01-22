"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Feature } from "@/types/types";
import { getBatchData } from "@/api/Service";

const AdvertisementSidebar = () => {
  const [advertisements, setAdvertisements] = useState<any[]>([]);
  const [adCurrentIndex, setAdCurrentIndex] = useState(0);
  const [adLoading, setAdLoading] = useState(true);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        setAdLoading(true);
        const features: Feature[] = [
          { name: "about_advertisement", amount: 10000 },
        ];

        const response = await getBatchData(features);
        setAdvertisements(response.about_advertisement?.data ?? []);
      } catch (error) {
        console.error("Failed to fetch advertisements:", error);
      } finally {
        setAdLoading(false);
      }
    };

    fetchAdvertisements();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (advertisements.length <= 1) return;

    const interval = setInterval(() => {
      setAdCurrentIndex((prevIndex) =>
        prevIndex === advertisements.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [advertisements.length]);

  const goToAdSlide = (index: number) => {
    setAdCurrentIndex(index);
  };

  const goToPreviousAd = () => {
    setAdCurrentIndex((prevIndex) =>
      prevIndex === 0 ? advertisements.length - 1 : prevIndex - 1
    );
  };

  const goToNextAd = () => {
    setAdCurrentIndex((prevIndex) =>
      prevIndex === advertisements.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Loading State
  if (adLoading) {
    return (
      <div className="relative rounded-xl overflow-hidden shadow-lg border border-border min-h-[400px]">
        <div className="animate-pulse">
          <div className="h-[400px] bg-background-secondary rounded"></div>
        </div>
      </div>
    );
  }

  // Don't render anything if no advertisements
  if (!advertisements || advertisements.length === 0) {
    return null;
  }

  return (
    <div className="relative group">
      <div className="relative rounded-xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300 min-h-[400px]">
        {advertisements.map((ad, index) => {
          const bannerImage = ad.banner || ad.image;
          const bannerUrl = bannerImage
            ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${bannerImage}`
            : null;
          const isActive = index === adCurrentIndex;

          return (
            <div
              key={ad.id || index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                isActive
                  ? "opacity-100 translate-x-0"
                  : index < adCurrentIndex
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              }`}
            >
              {bannerUrl ? (
                <>
                  <Image
                    src={bannerUrl}
                    alt={ad.name || "Advertisement"}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary/80"></div>
              )}

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <div className="space-y-4">
                  {/* Name/Title */}
                  {ad.name && (
                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg">
                      {ad.name}
                    </h3>
                  )}

                  {/* Description */}
                  {ad.description && (
                    <p className="text-sm md:text-base text-white/90 leading-relaxed drop-shadow-md line-clamp-3">
                      {ad.description}
                    </p>
                  )}

                  {/* CTA Button */}
                  <div className="pt-2">
                    <Link
                      href="/contacts"
                      className="group/btn inline-flex items-center gap-3 w-full justify-center px-6 py-3 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-xl font-semibold text-base transition-all duration-300 border border-white/30 hover:scale-105"
                    >
                      <span>Contact Us</span>
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Navigation Arrows - Only show if more than one advertisement */}
        {advertisements.length > 1 && (
          <>
            <button
              onClick={goToPreviousAd}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
              aria-label="Previous advertisement"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNextAd}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
              aria-label="Next advertisement"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* AD Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className="text-xs font-bold text-white bg-primary/90 backdrop-blur-sm px-2 py-1 rounded">
            AD
          </span>
        </div>
      </div>

      {/* Dots Indicator - Only show if more than one advertisement */}
      {advertisements.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {advertisements.map((_, index) => (
            <button
              key={index}
              onClick={() => goToAdSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === adCurrentIndex
                  ? "bg-primary w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvertisementSidebar;
