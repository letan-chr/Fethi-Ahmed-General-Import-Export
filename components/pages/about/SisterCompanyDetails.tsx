"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { SisterCompany as SisterCompanyType } from "@/types/types";
import AdvertisementSidebar from "@/components/layouts/AdvertisementSidebar";

interface SisterCompanyDetailsProps {
  company: SisterCompanyType | null;
  relatedCompanies: SisterCompanyType[];
}

function SisterCompanyDetails({
  company,
  relatedCompanies,
}: SisterCompanyDetailsProps) {
  const router = useRouter();

  if (!company) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
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

  // Get banner image or first image from images array
  const bannerImage = company.banner
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${company.banner}`
    : company.images && company.images.length > 0
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${typeof company.images[0] === 'string' ? company.images[0] : (company.images[0] as any).image || (company.images[0] as any).image_path}`
    : "/assets/images/IMG-20260117-WA0018.jpg";

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-8">
        <div className="max-w-9xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-foreground-secondary hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to About</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-background rounded-2xl shadow-lg border border-border overflow-hidden">
                {/* Company Image */}
                <div className="relative h-[400px] overflow-hidden">
                  <Image
                    src={bannerImage}
                    alt={company.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60"></div>
                </div>

                {/* Company Details */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Building2 className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold text-foreground">
                      {company.name}
                    </h1>
                  </div>

                  <div className="prose max-w-none">
                    {company.description && (
                      <div
                        className="text-lg text-foreground-secondary leading-relaxed mb-6"
                        dangerouslySetInnerHTML={{ __html: company.description }}
                      />
                    )}

                    {/* Additional Details */}
                    {company.details && (
                      <div className="mt-8">
                        <div
                          className="text-foreground-secondary leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: company.details }}
                        />
                      </div>
                    )}

                    {/* Services Section */}
                    {company.service && company.service.length > 0 && (
                      <div className="mt-8">
                        <h2 className="text-2xl font-bold text-foreground mb-6">
                          Our Services
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {company.service.map((service, index) => (
                            <div
                              key={index}
                              className="bg-background-secondary rounded-xl p-6 border border-border hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                                  <CheckCircle2 className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-foreground mb-2">
                                    {service.title}
                                  </h3>
                                  <p className="text-foreground-secondary text-sm leading-relaxed">
                                    {service.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-background rounded-2xl shadow-lg border border-border p-6 sticky top-24">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Contact Information
                </h2>

                <div className="space-y-4">
                  {company.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-1">
                          Phone
                        </p>
                        <a
                          href={`tel:${company.phone}`}
                          className="text-sm text-foreground-secondary hover:text-primary transition-colors"
                        >
                          {company.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {company.email && (
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-1">
                          Email
                        </p>
                        <a
                          href={`mailto:${company.email}`}
                          className="text-sm text-foreground-secondary hover:text-primary transition-colors break-all"
                        >
                          {company.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {company.website_link && (
                    <div className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-1">
                          Website
                        </p>
                        <a
                          href={company.website_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-foreground-secondary hover:text-primary transition-colors break-all"
                        >
                          {company.website_link}
                        </a>
                      </div>
                    </div>
                  )}

                  {company.social_media_link && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <p className="text-sm font-semibold text-foreground mb-3">
                        Social Media
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {company.social_media_link.facebook && (
                          <a
                            href={company.social_media_link.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-foreground-secondary hover:text-primary transition-colors"
                          >
                            Facebook
                          </a>
                        )}
                        {company.social_media_link.twitter && (
                          <a
                            href={company.social_media_link.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-foreground-secondary hover:text-primary transition-colors"
                          >
                            Twitter
                          </a>
                        )}
                        {company.social_media_link.linkedin && (
                          <a
                            href={company.social_media_link.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-foreground-secondary hover:text-primary transition-colors"
                          >
                            LinkedIn
                          </a>
                        )}
                        {company.social_media_link.instagram && (
                          <a
                            href={company.social_media_link.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-foreground-secondary hover:text-primary transition-colors"
                          >
                            Instagram
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <Link
                    href="/conntacts"
                    className="w-full block text-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Get in Touch
                  </Link>
                </div>

                {/* Advertisement Section */}
                <div className="mt-8">
                  <AdvertisementSidebar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SisterCompanyDetails;
