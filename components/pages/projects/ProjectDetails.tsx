"use client";

import React, { useState, use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle,
  Award,
  Headphones,
  Package,
  Truck,
  Globe,
  Zap,
  Shield,
  Star,
} from "lucide-react";
import { Product } from "@/types/types";

interface ProductProps {
  product: Product | null;
  relatedProducts: Product[];
}

const ProjectDetails = ({ product, relatedProducts }: ProductProps) => {
  const navigate = useRouter();
  const [activeTab, setActiveTab] = useState<string>("overview");

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!product?.images) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }, 3000); // 3 seconds
    return () => clearInterval(interval);
  }, [product?.images]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <Link href="/products" className="text-primary hover:underline">
            Back to Products
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
          className="flex items-center gap-2 text-foreground-secondary hover:text-primary mb-8 transition-colors duration-300 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back to Products</span>
        </button>
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl">
          <div className="relative h-[350px] md:h-[450px]">
            {/* Auto Slide Images */}
            {product.images && product.images.length > 0 ? (
              <div className="absolute inset-0">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-3000 ease-in-out scale-105 opacity-0 ${
                      index === activeIndex
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                    style={{
                      backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URL}/${img.image_path})`,
                    }}
                  ></div>
                ))}
                <div className="absolute inset-0 bg-black/60"></div>
              </div>
            ) : (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.banner_image})`,
                }}
              >
                <div className="absolute inset-0 bg-black/60"></div>
              </div>
            )}

            {/* Hero Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
              <div className="backdrop-blur-md bg-black/40 p-4 rounded-xl max-w-max">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                  {product.name}
                </h1>
                <p className="text-lg mt-2 text-accent-lighter drop-shadow-sm">
                  {product.category?.name}
                </p>
              </div>
            </div>
          </div>
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
                <div className="bg-background rounded-2xl shadow-lg p-8 mb-8 border border-border">
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    Product Overview
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-foreground leading-relaxed text-lg mb-6">
                      {product.description}
                    </p>
                    <p className="text-foreground-secondary leading-relaxed">
                      Our {product.name.toLowerCase()} is carefully selected and
                      processed to meet the highest international standards. We
                      ensure quality at every step of the process, from sourcing
                      to delivery, providing our customers with premium products
                      that exceed expectations.
                    </p>
                  </div>
                </div>

                {activeTab === "overview" && (
                  <>
                    {/* existing Overview code... */}

                    {/* Related Products */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                      {relatedProducts.map((item) => (
                        <div
                          key={item.id}
                          className="group border border-border rounded-lg overflow-hidden shadow hover:shadow-xl transition-all duration-300 hover:border-primary"
                        >
                          <Link href={`/products/${item.slug}`}>
                            <div className="h-48 overflow-hidden">
                              <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item?.banner_image}`}
                                alt={item.name}
                                width={600}
                                height={400}
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          </Link>

                          <div className="p-4 flex flex-col gap-2">
                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">
                              {item.name}
                            </h3>
                            <p className="text-sm text-foreground-secondary">
                              {item.category?.name}
                            </p>

                            {/* ⭐ Details Button */}
                            <Link
                              href={`/products/${item.slug}`}
                              className="mt-2 inline-block text-sm font-semibold text-primary border border-primary px-4 py-2 rounded-lg
                                        hover:bg-primary hover:text-white hover:!text-white transition-colors duration-300 text-center"
                            >
                              Details
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="bg-background rounded-2xl shadow-lg p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Why Choose Our Products?
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: <Award className="w-5 h-5" />,
                        text: "Quality Guaranteed",
                      },
                      {
                        icon: <Shield className="w-5 h-5" />,
                        text: "Certified Products",
                      },
                      {
                        icon: <Globe className="w-5 h-5" />,
                        text: "International Standards",
                      },
                      {
                        icon: <Headphones className="w-5 h-5" />,
                        text: "24/7 Support",
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
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg p-6 text-on-primary border border-primary/50">
                  <h3 className="text-xl font-bold mb-3">
                    Interested in This Product?
                  </h3>
                  <p className="text-on-primary/90 mb-6 text-sm">
                    Contact us today for pricing, availability, and more
                    information.
                  </p>
                  <Link
                    href="/conntacts"
                    className="block w-full bg-background text-primary font-bold py-3 rounded-lg hover:bg-background-secondary transition-colors duration-300 text-center"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
