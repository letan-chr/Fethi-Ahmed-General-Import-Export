import React from 'react';
import Image from 'next/image';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Construction Manager',
      role: 'Government Project',
      content: 'Debab Trading provides exceptional quality building materials. Their attention to detail and commitment to quality is unmatched. Competitive prices and reliable delivery.',
      image: '/assets/images/IMG-20260117-WA0019.jpg',
    },
    {
      name: 'Project Director',
      role: 'NGO Organization',
      content: 'We have been working with Debab Trading for years. Their building materials are of high quality and their flexible payment options (cash or credit) help us manage our projects better.',
      image: '/assets/images/IMG-20260117-WA0022.jpg',
    },
    {
      name: 'Business Owner',
      role: 'Private Company',
      content: 'Debab Trading has been our trusted supplier for construction materials. Quality products at competitive prices with excellent customer service. Highly recommended!',
      image: '/assets/images/warehouse-goods-cartons-factory-storage-shipping-merchandise-room-logistics-background_892776-36406.jpg',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">What Our Customers Say</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-foreground-secondary max-w-2xl mx-auto">
            We take pride in our customer satisfaction. Here's what our clients have to say about us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background-secondary p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="text-4xl text-primary mr-4">"</div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-foreground mb-6 leading-relaxed italic">
                {testimonial.content}
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-on-primary font-bold mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-foreground-secondary">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

