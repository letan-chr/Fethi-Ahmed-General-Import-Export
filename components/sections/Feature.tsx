'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Award, Globe, Users, Clock } from 'lucide-react';

const Feature = () => {
  const features = [
    {
      title: 'Premium Coffee',
      icon: Award,
      color: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Quality Vehicles',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-600',
    },
    {
      title: 'Certified Quality',
      icon: CheckCircle2,
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Global Export',
      icon: Globe,
      color: 'from-purple-500 to-pink-600',
    },
  ];

  const stats = [
    {
      number: '15+',
      label: 'Years Experience',
      icon: Clock,
    },
    {
      number: '1000+',
      label: 'Happy Customers',
      icon: Users,
    },
    {
      number: '50+',
      label: 'Team Members',
      icon: Users,
    },
    {
      number: '24/7',
      label: 'Support',
      icon: Clock,
    },
  ];

  return (
    <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Full Section Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/warehouse-goods-cartons-factory-storage-shipping-merchandise-room-logistics-background_892776-36406.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Features */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Why Choose{' '}
                <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
                  Us
                </span>
              </h2>
              <motion.div
                className="h-1 bg-gradient-to-r from-yellow-300 to-transparent mb-6 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "80px" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </motion.div>

            {/* Features List - No Descriptions */}
            <div className="space-y-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-yellow-300 transition-colors duration-300">
                        {feature.title}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Side - Statistics */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Our{' '}
                <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
                  Achievements
                </span>
              </h3>
            </motion.div>

            {/* Stats Grid - No Cards */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="inline-flex p-3 rounded-xl bg-white/10 backdrop-blur-sm mb-3">
                      <IconComponent className="w-6 h-6 text-yellow-300" />
                    </div>
                    <motion.div
                      className="text-3xl md:text-4xl font-bold text-white mb-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-sm text-gray-200 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
