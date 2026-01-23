import React from 'react';

const Subscribe = () => {
  return (
    <section className="py-20 bg-secondary text-white">
      <div className="mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-300 text-lg mb-8">
            Subscribe to our newsletter to receive the latest updates about our products, services, and company news.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-primary to-tertiary hover:from-primary-light hover:to-tertiary-light text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-gray-400 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
