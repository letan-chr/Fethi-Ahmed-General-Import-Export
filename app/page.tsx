"use client";

import {
  buildHeroContents,
  getBatchData,
  getPagesWithContents,
} from "@/api/Service";
import About from "@/components/sections/About";
import Blog from "@/components/sections/Blog";
import Cta from "@/components/sections/Cta";
import Feature from "@/components/sections/Feature";
import Hero from "@/components/sections/Hero";
import Partners from "@/components/sections/Partners";
import Project from "@/components/sections/Project";
import Service from "@/components/sections/Service";
import {
  AboutContent,
  Blog as BlogType,
  Feature as FeatureType,
  GalleryItem,
  HeroContent,
  Partner,
  Product,
  Service as ServiceType,
  Setup,
  Stat,
  TeamMember,
  Testimonial,
} from "@/types/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [services, setServices] = useState<ServiceType[]>([]);
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [teams, setTeams] = useState<TeamMember[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [setup, setSetup] = useState<Setup | null>(null);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [heroContents, setHeroContents] = useState<HeroContent[]>([]);

  useEffect(() => {
    const features: FeatureType[] = [
      { name: "blog_post", amount: 100000 },
      { name: "about_service", amount: 4 },
      { name: "about_content", amount: 4 },
      { name: "about_testimonial", amount: 4 },
      { name: "about_team", amount: 10 },
      { name: "about_gallery", amount: 10 },
      { name: "about_partner", amount: 100000 },
      { name: "about_statistic", amount: 10 },
      { name: "ecommerce_product", amount: 10 },
      { name: "about_setup" },
    ];

    async function fetchData() {
      try {
        const data = await getBatchData(features);

        const pages = await getPagesWithContents();
        const heroData = buildHeroContents(pages);
        heroData.sort((a, b) => a.order - b.order);

        setHeroContents(heroData);

        setBlogs(data.blog_post?.data ?? []);
        setServices(data.about_service?.data ?? []);
        setAboutContent(data.about_content?.data ?? null);
        setTestimonials(data.about_testimonial?.data ?? []);
        setTeams(data.about_team?.data ?? []);
        setGallery(data.about_gallery?.data ?? []);
        setSetup(data.about_setup?.data ?? null);
        setPartners(data.about_partner?.data ?? []);
        setStats(data.about_statistic?.data ?? []);
        setProducts(data.ecommerce_product?.data ?? []);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Hero stats={stats} heroSlides={heroContents} />
      <About aboutContent={aboutContent} />
      {/* Service - Conditional Rendering */}
      {services && services.length > 0 && (
        <Service services={services} />
      )}
      <Feature />
      {/* Products - Conditional Rendering */}
      {products && products.length > 0 && (
        <Project products={products} />
      )}
      <Cta />
      {/* Blog - Conditional Rendering */}
      {blogs && blogs.length > 0 && (
        <Blog blogs={blogs} />
      )}
      {/* Partners - Conditional Rendering */}
      {partners && partners.length > 0 && (
        <Partners partners={partners} stats={stats} />
      )}
    </>
  );
}
