'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface BreadcrumpProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

const Breadcrump = ({ title, subtitle, backgroundImage }: BreadcrumpProps) => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);
  
  const getBreadcrumbName = (path: string) => {
    const names: { [key: string]: string } = {
      'about': 'About',
      'products': 'Products',
      'service': 'Services',
      'conntacts': 'Contact',
      'blogs': 'Blog',
      'pages': 'All Products',
      'specialty-coffee': 'Specialty Coffee',
      'isuzu-vehicles': 'Isuzu Vehicles',
      'victory-plus': 'JSA Victory Plus',
      'rcj-electric': 'RCJ Electric',
      'abol-jeba': 'Abol Jeba Roasted Coffee',
      'coffee-export': 'Coffee Export',
      'vehicle-import': 'Vehicle Import',
      'coffee-roasting': 'Coffee Roasting',
      'assembly': 'Assembly Services',
    };
    return names[path] || path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
  };

  // Default background image if not provided
  const defaultBgImage = backgroundImage || '/assets/images/IMG-20260117-WA0018.jpg';
  
  // Auto-generate title from pathname if not provided
  const autoTitle = title || getBreadcrumbName(paths[paths.length - 1] || 'Home');
  const autoSubtitle = subtitle || '';

  return (
    <section className="relative min-h-[300px] md:min-h-[350px] lg:min-h-[400px] overflow-visible -mt-24 bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={defaultBgImage}
          alt={autoTitle}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay - More modern */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-40 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[300px] md:min-h-[350px] lg:min-h-[400px] flex flex-col justify-center pt-28 lg:pt-32 pb-8">
        {/* Breadcrumb Navigation - Modern & Interactive */}
        <motion.nav 
          className="mb-6 md:mb-8 w-full" 
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ol className="flex items-center flex-wrap gap-2 text-sm md:text-base w-full">
            <motion.li
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Link 
                href="/" 
                className="group relative flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-accent/50 transition-all duration-300 text-white/90 hover:text-white font-medium overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                />
                <motion.svg 
                  className="w-4 h-4 relative z-10 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                  />
                </motion.svg>
                <span className="relative z-10">Home</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-lighter group-hover:w-full transition-all duration-300"
                  whileHover={{ width: "100%" }}
                />
              </Link>
            </motion.li>

            {paths.map((path, index) => {
              const href = '/' + paths.slice(0, index + 1).join('/');
              const isLast = index === paths.length - 1;
              const name = getBreadcrumbName(path);
              
              return (
                <motion.li 
                  key={path} 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <motion.svg 
                    className="w-4 h-4 text-white/50 mx-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.2, x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2.5} 
                      d="M9 5l7 7-7 7" 
                    />
                  </motion.svg>
                  {isLast ? (
                    <motion.span 
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-accent/30 to-accent/20 backdrop-blur-md border border-accent/40 text-accent-lighter font-semibold shadow-lg shadow-accent/20 break-words whitespace-normal"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
                      title={name}
                    >
                      {name}
                    </motion.span>
                  ) : (
                    <Link 
                      href={href} 
                      className="group relative px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 text-white/80 hover:text-white font-medium overflow-visible break-words whitespace-normal"
                      title={name}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.05 }}
                      />
                      <span className="relative z-10 flex items-center gap-1 flex-wrap">
                        <span className="break-words whitespace-normal">{name}</span>
                        <motion.svg
                          className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          whileHover={{ x: 2 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                      </span>
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-lighter group-hover:w-full transition-all duration-300"
                        whileHover={{ width: "100%" }}
                      />
                    </Link>
                  )}
                </motion.li>
              );
            })}
          </ol>
        </motion.nav>

        {/* Title and Subtitle - Modern Design */}
        <motion.div 
          className="max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 leading-tight [text-shadow:_2px_2px_8px_rgb(0_0_0_/_80%)] break-words"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {autoTitle}
          </motion.h1>
          {autoSubtitle && (
            <motion.p 
              className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed [text-shadow:_1px_1px_4px_rgb(0_0_0_/_70%)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {autoSubtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Breadcrump;
