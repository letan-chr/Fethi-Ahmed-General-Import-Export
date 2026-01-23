"use client";

import React from "react";
import { motion } from "framer-motion";
import { AboutContent } from "@/types/types";
import { Target, Eye, Heart } from "lucide-react";

interface MissionVisionValuesProps {
  aboutContent: AboutContent | null;
}

const MissionVisionValues = ({ aboutContent }: MissionVisionValuesProps) => {
  // Default core values if not provided
  const defaultCoreValues = [
    {
      title: "Quality",
      description: "We provide only premium products and services."
    },
    {
      title: "Integrity",
      description: "We operate transparently with trust at the center of every partnership."
    },
    {
      title: "Customer Focus",
      description: "We tailor solutions to match client priorities and challenges."
    },
    {
      title: "Sustainability",
      description: "Ethical sourcing practices and environmentally conscious operations."
    }
  ];

  const coreValues = aboutContent?.core_values && aboutContent.core_values.length > 0
    ? aboutContent.core_values
    : defaultCoreValues.map((val, idx) => ({
        id: idx,
        title: val.title,
        description: val.description,
        slug: val.title.toLowerCase().replace(/\s+/g, '-'),
        business_id: 0,
        icon_class: null,
        icon_image: null,
        order: idx,
        views_count: 0,
        is_active: true,
        created_at: '',
        updated_at: '',
        translations: []
      }));

  return (
    <section className="py-8 md:py-10 lg:py-12 bg-gradient-to-br from-foreground via-foreground/95 to-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Mission & Vision Row */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border-2 border-primary/30 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-background">
                  Our Mission
                </h2>
              </div>
              <motion.div
                className="w-16 h-0.5 bg-primary mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <div className="text-background/90 text-lg md:text-xl leading-relaxed">
                {aboutContent?.mission ? (
                  <div dangerouslySetInnerHTML={{ __html: aboutContent.mission }} />
                ) : (
                  <p>
                    To showcase Ethiopia's world-renowned coffee heritage globally and to supply durable, efficient products that support development, growth, and well-being within Ethiopian communities and industries.
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Vision Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border-2 border-primary/30 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-background">
                  Our Vision
                </h3>
              </div>
              <motion.div
                className="w-16 h-0.5 bg-primary mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
              <div className="text-background/90 text-lg md:text-xl leading-relaxed">
                {aboutContent?.vision ? (
                  <div dangerouslySetInnerHTML={{ __html: aboutContent.vision }} />
                ) : (
                  <p>
                    To be the leading Ethiopian trading company recognized globally for excellence in specialty coffee exports and industrial equipment imports, fostering sustainable development and economic growth across communities.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-background/10 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary/30 hover:border-primary/50"
              >
                {/* Decorative accent */}
                <div className="w-12 h-1 bg-primary rounded-full mb-4"></div>

                <h3 className="text-xl font-bold text-background mb-3 group-hover:text-primary transition-colors">
                  {value.title}
                </h3>
                <p className="text-background/80 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVisionValues;
