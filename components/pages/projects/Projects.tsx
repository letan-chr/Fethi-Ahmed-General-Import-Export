import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Projects = () => {
  const products = [
    {
      id: 'specialty-coffee',
      title: 'Specialty Coffee',
      description: 'Ethiopian finest specialty Arabica green bean from Harare, Yirgachefe, Sidamo, Limu & Guji',
      image: '/assets/images/IMG-20260117-WA0017.jpg',
      features: [
        'Washed and Unwashed processing',
        'Dry mill and wet mills processing',
        'Clean and certified containers',
        'International market quality',
      ],
    },
    {
      id: 'isuzu-vehicles',
      title: 'Isuzu Vehicles',
      description: 'ISUZU NPR and FSR vehicles - well known across our clients',
      image: '/assets/images/IMG-20260117-WA0022.jpg',
      features: [
        'ISUZU NPR model',
        'ISUZU FSR model',
        'Quality assurance',
        'Reliable performance',
      ],
    },
    {
      id: 'victory-plus',
      title: 'JSA Victory Plus - 7 Seat 3-Wheeler',
      description: 'Highest seating capacity Three Wheeler having 7 Seats + Driver',
      image: '/assets/images/warehouse-goods-cartons-factory-storage-shipping-merchandise-room-logistics-background_892776-36406.jpg',
      features: [
        '100% Made in India, assembled in Dire Dawa',
        '7 Seats + Driver capacity',
        'Diesel powered - 36 ± 3km/Ltr fuel economy',
        'Leaf spring suspension for heavy duty',
        'Car-like steering wheel and pedals',
        'Good ground clearance for unpaved roads',
        '270-320 km range',
      ],
    },
    {
      id: 'rcj-electric',
      title: 'RCJ Electric 3-Wheeler',
      description: '4 Seat Electric 3-Wheeler - Eco-friendly transportation solution',
      image: '/assets/images/IMG-20260117-WA0019.jpg',
      features: [
        '4 Seat capacity',
        'Electric powered',
        'Eco-friendly',
        'Fully assembled in Dire Dawa',
      ],
    },
    {
      id: 'abol-jeba',
      title: 'Abol Jeba Roasted Coffee',
      description: 'Premium roasted coffee from eastern highland of Harrer, Ethiopia',
      image: '/assets/images/IMG-20260117-WA0018.jpg',
      features: [
        'Brand: Abol Jeba',
        'Located in Dire Dawa',
        'Sourced from Harrer, Ethiopia',
        'Altitude: 1510-2120 meters',
        'Best aroma and taste',
      ],
    },
  ];

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
