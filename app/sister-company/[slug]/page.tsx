"use client";

import { getBatchData } from "@/api/Service";
import Breadcrump from "@/components/layouts/breadcrump/Breadcrump";
import SisterCompanyDetails from "@/components/pages/about/SisterCompanyDetails";
import { Feature, SisterCompany } from "@/types/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { slug } = useParams();

  const [sisterCompanies, setSisterCompanies] = useState<SisterCompany[]>([]);

  // Helper function to generate slug from name
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  };

  useEffect(() => {
    const features: Feature[] = [{ name: "about_sisters_company", amount: 100000 }];

    async function fetchData() {
      try {
        const data = await getBatchData(features);
        setSisterCompanies(data.about_sisters_company?.data ?? []);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  // Filter company by slug from the fetched data (use generated slug if slug doesn't exist)
  const company = sisterCompanies.find((comp) => {
    const companySlug = comp.slug || generateSlug(comp.name);
    return companySlug === slug;
  });

  const relatedCompanies = sisterCompanies
    .filter((comp) => {
      const companySlug = comp.slug || generateSlug(comp.name);
      return companySlug !== slug && comp.is_active;
    })
    .slice(0, 3);

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Sister Company Not Found
          </h1>
          <a href="/about" className="text-primary hover:underline">
            Back to About
          </a>
        </div>
      </div>
    );
  }

  // Get banner image or first image from images array
  const bannerImage = company.banner
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${company.banner}`
    : company.images && company.images.length > 0
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${typeof company.images[0] === 'string' ? company.images[0] : (company.images[0] as any).image || (company.images[0] as any).image_path}`
    : undefined;

  return (
    <>
      <Breadcrump
        title={company.name}
        subtitle={company.short_description || company.description || company.name}
        backgroundImage={bannerImage}
      />
      <SisterCompanyDetails company={company} relatedCompanies={relatedCompanies} />
    </>
  );
};

export default page;
