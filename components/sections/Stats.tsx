import React from 'react';

const Stats = () => {
  const stats = [
    {
      number: '15+',
      label: 'Years of Experience',
      icon: '📅',
    },
    {
      number: '1000+',
      label: 'Happy Customers',
      icon: '😊',
    },
    {
      number: '50+',
      label: 'Team Members',
      icon: '👥',
    },
    {
      number: '24/7',
      label: 'Customer Support',
      icon: '🕐',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

