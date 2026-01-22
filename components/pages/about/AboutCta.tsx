import React from "react";
import Link from "next/link";
import Image from "next/image";

const AboutCta = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-primary via-primary-dark to-primary rounded-3xl p-8 md:p-16 text-on-primary relative overflow-hidden shadow-2xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-on-primary/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-on-primary/10 rounded-full -ml-24 -mb-24"></div>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-block bg-on-primary/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  Let's Work Together
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  Ready to Partner With Us?
                </h2>
                <p className="text-xl text-on-primary/90 max-w-2xl mx-auto leading-relaxed">
                  We are committed to providing excellent service and quality
                  products. Contact us today to learn more about our offerings
                  and start a successful partnership.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link
                  href="/conntacts"
                  className="bg-background text-primary hover:bg-background-secondary px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg text-center min-w-[200px]"
                >
                  Get In Touch
                </Link>
                <Link
                  href="/products"
                  className="bg-on-primary/10 hover:bg-on-primary/20 backdrop-blur-sm text-on-primary border-2 border-on-primary px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 text-center min-w-[200px]"
                >
                  View Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCta;
