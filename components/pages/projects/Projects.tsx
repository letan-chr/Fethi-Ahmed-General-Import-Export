"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type ProjectItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
};

const product1: ProjectItem = {
  id: 'specialty-coffee',
  title: 'Ethiopian Specialty Coffee',
  description: 'We export carefully selected, high-grade coffee beans sourced from Ethiopia\'s most celebrated coffee-growing regions',
  image: '/assets/images/photo_2026-01-20_10-55-53.jpg',
  features: [
    'Fresh, authentic beans',
    'Ethical sourcing',
    'Unique flavor profiles exclusive to Ethiopia',
    'Partnerships with skilled farmers',
  ],
};

const product2: ProjectItem = {
  id: 'millstone-grind-mills',
  title: 'Millstone & Grind Mills',
  description: 'Strong, durable grinding solutions for farming and industry',
  image: '/assets/images/photo_2026-01-20_10-55-53 (3).jpg',
  features: [
    'Durable construction',
    'Farming applications',
    'Industrial use',
    'Reliable performance',
  ],
};

const product3: ProjectItem = {
  id: 'generators',
  title: 'Generators',
  description: 'Reliable power generation units for continuous operation',
  image: '/assets/images/photo_2024-08-13-17.19.52-1280x854.jpeg',
  features: [
    'Continuous operation',
    'Reliable power generation',
    'Industrial grade',
    'Quality assurance',
  ],
};

const product4: ProjectItem = {
  id: 'medical-equipment',
  title: 'Medical Equipment',
  description: 'Modern diagnostic devices, tools & consumables for healthcare providers',
  image: '/assets/images/photo_2026-01-20_10-55-53 (2).jpg',
  features: [
    'Modern diagnostic devices',
    'Medical tools',
    'Consumables',
    'Healthcare solutions',
  ],
};

const product5: ProjectItem = {
  id: 'water-pumps',
  title: 'Water Pumps',
  description: 'Hand pumps and electrical water pumps for rural access, farming, and irrigation',
  image: '/assets/images/photo_2026-01-20_10-55-54.jpg',
  features: [
    'Hand pumps for rural access',
    'Electrical water pumps',
    'Irrigation systems',
    'Farming applications',
  ],
};

const productsData: ProjectItem[] = [product1, product2, product3, product4, product5];

const Projects = () => {
  const products = productsData;

  return (
    <div className="py-20 bg-gray-50">
      <div className="mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Our Products</h1>
        <div className="w-24 h-1 bg-primary mx-auto mb-12"></div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-primary font-semibold group-hover:underline">
                  Learn More →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
