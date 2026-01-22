import React from 'react';

const MissionVision = () => {
  return (
    <section className="py-20 bg-background">
      <div className="mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="bg-background-secondary p-8 rounded-lg">
            <div className="flex items-center mb-6">
              <div className="bg-primary text-on-primary p-3 rounded-full mr-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
            </div>
            <ul className="space-y-4 text-foreground-secondary">
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>To set and maintain the highest standard of quality and ethics in everything we do.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>To provide good quality coffee products and excellent, reliable services to our customers.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>To earn the trust of our customers, employees, partners and our community.</span>
              </li>
            </ul>
          </div>

          {/* Vision */}
          <div className="bg-accent/10 p-8 rounded-lg">
            <div className="flex items-center mb-6">
              <div className="bg-primary-dark text-on-primary p-3 rounded-full mr-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
            </div>
            <ul className="space-y-4 text-foreground-secondary">
              <li className="flex items-start">
                <span className="text-primary-dark mr-3">•</span>
                <span>To be established and trusted as the excellent coffee business partner.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-dark mr-3">•</span>
                <span>To be a leader in service and quality in our industry.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-dark mr-3">•</span>
                <span>To be among the most admired and respected companies in our industry.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-dark mr-3">•</span>
                <span>To be the leader in our markets.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;

