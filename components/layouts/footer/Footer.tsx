"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product, Setup, SocialMedia } from "@/types/types";

interface FooterProps {
  setup: Setup | null;
  products: Product[];
}

const Footer = ({ setup, products }: FooterProps) => {

  const socialIconConfig: Record<keyof SocialMedia, React.ReactNode> = {
    facebook: <i className="fab fa-facebook-f"></i>,
    twitter: <i className="fab fa-twitter"></i>,
    linkedin: <i className="fab fa-linkedin-in"></i>,
    instagram: <i className="fab fa-instagram"></i>,
    youtube: <i className="fab fa-youtube"></i>,
    tiktok: <i className="fab fa-tiktok"></i>,
    pinterest: <i className="fab fa-pinterest"></i>,
    snapchat: <i className="fab fa-snapchat-ghost"></i>,
    whatsapp: <i className="fab fa-whatsapp"></i>,
    telegram: <i className="fab fa-telegram-plane"></i>,
  };

  const getSocialMediaColor = (name: keyof SocialMedia): { bg: string; text: string; hoverBg: string } => {
    const colors: Record<keyof SocialMedia, { bg: string; text: string; hoverBg: string }> = {
      facebook: { bg: "rgba(24, 119, 242, 0.1)", text: "#1877F2", hoverBg: "#1877F2" },
      twitter: { bg: "rgba(29, 161, 242, 0.1)", text: "#1DA1F2", hoverBg: "#1DA1F2" },
      linkedin: { bg: "rgba(0, 119, 181, 0.1)", text: "#0077B5", hoverBg: "#0077B5" },
      instagram: { 
        bg: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", 
        text: "#ffffff", 
        hoverBg: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" 
      },
      youtube: { bg: "rgba(255, 0, 0, 0.1)", text: "#FF0000", hoverBg: "#FF0000" },
      tiktok: { bg: "rgba(255, 0, 80, 0.1)", text: "#FF0050", hoverBg: "#FF0050" },
      pinterest: { bg: "rgba(189, 8, 28, 0.1)", text: "#BD081C", hoverBg: "#BD081C" },
      snapchat: { bg: "rgba(255, 252, 0, 0.15)", text: "#FFFC00", hoverBg: "#FFFC00" },
      whatsapp: { bg: "rgba(37, 211, 102, 0.1)", text: "#25D366", hoverBg: "#25D366" },
      telegram: { bg: "rgba(0, 136, 204, 0.1)", text: "#0088CC", hoverBg: "#0088CC" },
    };
    return colors[name] || { bg: "rgba(255, 255, 255, 0.1)", text: "#ffffff", hoverBg: "#ffffff" };
  };

  const availableLinks = Object.entries(setup?.social_media ?? {}).filter(
    ([_, value]) => value
  ) as [keyof SocialMedia, string][];

  return (
    <footer className="bg-primary text-on-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Company Info */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              data-aos="fade-up"
            >
              <Link href="/" className="group flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent-lighter/20 rounded-full blur-lg group-hover:bg-accent-lighter/30 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                  <Image
                    src={
                      setup?.logo_small
                        ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${setup.logo_small}`
                        : setup?.logo_large
                        ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${setup.logo_large}`
                        : "/assets/images/IMG-20260117-WA0012.jpg"
                    }
                    alt="Mekonnen Amdisa import and export"
                    width={60}
                    height={60}
                    className="rounded-full object-cover ring-2 ring-accent-lighter/30 group-hover:ring-accent-lighter/50 transition-all duration-300 relative z-10"
                  />
                </div>

              </Link>
              <p className="text-sm leading-relaxed mb-6 text-on-primary/80">
                Mekonnen Amdisa is an Import & Export company based in Ethiopia. We have exported 550 shipments to 100 buyers worldwide. Our primary markets include India, Pakistan, Turkey, Europe, South America, and the Middle East.
              </p>

              {/* Social Media Links */}
              <div className="flex flex-wrap gap-3">
                {availableLinks.map(([name, url]) => {
                  const colors = getSocialMediaColor(name);
                  const isGradient = name === "instagram";
                  
                  return (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="group relative p-2.5 rounded-lg
                        border border-white/20
                        hover:border-opacity-100 transition-all duration-300
                        hover:scale-110 hover:-translate-y-1"
                      style={{
                        background: colors.bg,
                        color: colors.text,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = colors.hoverBg;
                        e.currentTarget.style.color = isGradient ? "#ffffff" : "#ffffff";
                        e.currentTarget.style.borderColor = colors.hoverBg;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = colors.bg;
                        e.currentTarget.style.color = colors.text;
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                      }}
                    >
                      {socialIconConfig[name]}
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h4 className="text-on-primary font-bold text-lg mb-6 relative inline-block">
                Quick Links
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent-lighter"></span>
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "About Us", href: "/about" },
                  { name: "Products", href: "/products" },
                  { name: "Services", href: "/service" },
                  { name: "Blog", href: "/blogs" },
                  { name: "Contact", href: "/conntacts" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center text-sm text-on-primary/80 hover:text-accent-lighter transition-all duration-300"
                    >
                      <span className="w-0 h-0.5 bg-accent-lighter group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Products */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h4 className="text-on-primary font-bold text-lg mb-6 relative inline-block">
                Our Products
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent-lighter"></span>
              </h4>
              <ul className="space-y-3">
                {products.slice(0, 6).map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="group flex items-center w-full text-left text-sm text-on-primary/80 hover:text-accent-lighter transition-all duration-300"
                    >
                      <span className="w-0 h-0.5 bg-accent-lighter group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {product.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact & Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h4 className="text-on-primary font-bold text-lg mb-6 relative inline-block">
                Contact Us
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent-lighter"></span>
              </h4>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <div className="mt-1 p-1.5 rounded-lg bg-accent-lighter/20 group-hover:bg-accent-lighter/30 transition-colors">
                    <svg
                      className="w-4 h-4 text-accent-lighter"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-on-primary">
                      Location
                    </p>
                    <p className="text-sm text-on-primary/80">
                      {setup?.company_address || "Addis Ababa, Ethiopia"}
                    </p>
                  </div>
                </div>

                {setup?.phone_numbers && setup.phone_numbers.length > 0 && (
                  <div className="flex items-start space-x-3 group">
                    <div className="mt-1 p-1.5 rounded-lg bg-accent-lighter/20 group-hover:bg-accent-lighter/30 transition-colors">
                      <svg
                        className="w-4 h-4 text-accent-lighter"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-on-primary">
                        Phone
                      </p>
                      <a
                        href={`tel:${setup.phone_numbers[0].value}`}
                        className="text-sm text-on-primary/80 hover:text-accent-lighter transition-colors"
                      >
                        {setup.phone_numbers[0].value}
                      </a>
                    </div>
                  </div>
                )}

                {setup?.email_addresses && setup.email_addresses.length > 0 && (
                  <div className="flex items-start space-x-3 group">
                    <div className="mt-1 p-1.5 rounded-lg bg-accent-lighter/20 group-hover:bg-accent-lighter/30 transition-colors">
                      <svg
                        className="w-4 h-4 text-accent-lighter"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-on-primary">
                        Email
                      </p>
                      <a
                        href={`mailto:${setup.email_addresses[0].value}`}
                        className="text-sm text-on-primary/80 hover:text-accent-lighter transition-colors"
                      >
                        {setup.email_addresses[0].value}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3 group">
                  <div className="mt-1 p-1.5 rounded-lg bg-accent-lighter/20 group-hover:bg-accent-lighter/30 transition-colors">
                    <svg
                      className="w-4 h-4 text-accent-lighter"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-on-primary">
                      Working Hours
                    </p>
                    <p className="text-sm text-on-primary/80">{setup?.working_hour || "24/7 Available"}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/10 pt-8 pb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          data-aos="fade-up"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-on-primary/80 text-center md:text-left">
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-on-primary font-semibold">
                Mekonnen Amdisa Import & Export
              </span>
              {" "}. All rights reserved.
            </p>
            <p className="text-sm text-on-primary/80">
              Designed by{" "}
              <Link
                href="https://keradiontechnology.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-lighter hover:text-accent transition-colors font-semibold"
              >
                Keradion Technology
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
