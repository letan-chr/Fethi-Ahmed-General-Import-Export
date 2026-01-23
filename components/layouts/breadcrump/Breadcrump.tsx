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
    <section className="relative h-[40vh] min-h-[320px] md:min-h-[360px] lg:min-h-[400px] overflow-hidden bg-black pt-16 lg:pt-20">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={defaultBgImage}
          alt={autoTitle}
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      {/* Curved Green Gradient Overlay - Similar to Hero */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 700"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="breadcrumbGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(124, 252, 0, 0.85)" stopOpacity="0.85" />
              <stop offset="30%" stopColor="rgba(50, 205, 50, 0.80)" stopOpacity="0.80" />
              <stop offset="60%" stopColor="rgba(32, 178, 170, 0.70)" stopOpacity="0.70" />
              <stop offset="100%" stopColor="rgba(64, 224, 208, 0.60)" stopOpacity="0.60" />
            </linearGradient>
          </defs>
          {/* Curved path: more pronounced curve on left (30%), gentler curve on right (70%) */}
          <path
            d="M 0,0 
               L 0,700 
               C 150,690 200,680 250,670 
               C 280,665 300,660 350,640 
               C 400,620 450,590 500,550 
               C 550,510 600,470 650,430 
               C 700,390 750,360 800,340 
               C 850,320 900,300 950,280 
               C 970,275 990,270 1000,260 
               L 1000,0 
               Z"
            fill="url(#breadcrumbGradient)"
          />
        </svg>
        {/* White curved accent line at bottom edge */}
        <svg
          className="absolute bottom-0 left-0 w-full h-1"
          viewBox="0 0 1000 10"
          preserveAspectRatio="none"
        >
          <path
            d="M 0,10 
               C 200,8 280,6 300,5 
               C 400,3 500,2 600,1.5 
               C 700,1 800,0.5 900,0.3 
               C 950,0.2 980,0.1 1000,0 
               L 1000,10 
               L 0,10 
               Z"
            fill="rgba(255, 255, 255, 0.3)"
          />
        </svg>
      </div>

      {/* Content Section - Left Aligned (60% area) */}
      <div className="relative z-20 h-full flex items-center px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="w-full max-w-7xl mx-auto">
          <div className="w-full min-w-[60%] max-w-[60%] text-left space-y-5">
            {/* Breadcrumb Navigation - Modern & Interactive */}
            <motion.nav 
              className="mb-4 md:mb-5 w-full" 
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
                    className="group relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 text-white/90 hover:text-white font-medium overflow-hidden"
                  >
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
                          className="px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold shadow-lg break-words whitespace-normal"
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                          whileHover={{ scale: 1.05 }}
                          title={name}
                        >
                          {name}
                        </motion.span>
                      ) : (
                        <Link 
                          href={href} 
                          className="group relative px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 text-white/90 hover:text-white font-medium overflow-visible break-words whitespace-normal"
                          title={name}
                        >
                          <span className="relative z-10 flex items-center gap-1 flex-wrap">
                            <span className="break-words whitespace-normal">{name}</span>
                          </span>
                        </Link>
                      )}
                    </motion.li>
                  );
                })}
              </ol>
            </motion.nav>

            {/* Title and Subtitle - Hero Style */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="block">{autoTitle}</span>
              </motion.h1>
              {autoSubtitle && (
                <motion.p 
                  className="text-base sm:text-lg lg:text-xl text-white/95 leading-relaxed"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {autoSubtitle}
                </motion.p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrump;
