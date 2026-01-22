"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Feature, Setup } from "@/types/types";
import { getBatchData, postContactForm } from "@/api/Service";

const Contacts = () => {
  const [setup, setSetup] = useState<Setup | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | "">("");

  useEffect(() => {
    const features: Feature[] = [
      { name: "about_setup" },
    ];

    async function fetchData() {
      try {
        const data = await getBatchData(features);

        setSetup(data.about_setup?.data ?? null);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      await postContactForm(formData);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        setStatus("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // Contact info cards data
  const contactCards = setup
    ? [
        {
          icon: <i className="fa-solid fa-location-dot"></i>,
          title: "Our Address",
          description: setup.company_address || "Address not provided",
          details: "Main Office Location",
          color: "from-blue-500/20 to-blue-600/20",
          iconColor: "text-blue-500",
        },
        {
          icon: <i className="fa-solid fa-phone"></i>,
          title: "Phone Number",
          description:
            setup.phone_numbers && setup.phone_numbers.length > 0
              ? setup.phone_numbers[0].value || "No phone available"
              : "No phone available",
          details:
            setup.phone_numbers && setup.phone_numbers.length > 0
              ? setup.phone_numbers[0].label || "Available 24/7"
              : "Available 24/7",
          color: "from-green-500/20 to-green-600/20",
          iconColor: "text-green-500",
        },
        {
          icon: <i className="fa-solid fa-envelope"></i>,
          title: "Email Address",
          description:
            setup.email_addresses && setup.email_addresses.length > 0
              ? setup.email_addresses[0].value || "No email"
              : "No email",
          details:
            setup.email_addresses && setup.email_addresses.length > 0
              ? setup.email_addresses[0].label || "We'll respond quickly"
              : "We'll respond quickly",
          color: "from-purple-500/20 to-purple-600/20",
          iconColor: "text-purple-500",
        },
        {
          icon: <i className="fa-solid fa-clock"></i>,
          title: "Working Hours",
          description: "24/7 Service Available",
          details: "Always here to help you",
          color: "from-orange-500/20 to-orange-600/20",
          iconColor: "text-orange-500",
        },
      ]
    : [];

  // Detailed contact information
  const contactInfo = setup
    ? [
        {
          icon: <i className="fa-solid fa-map-marker-alt"></i>,
          title: "Location",
          description: setup.company_address || "Address not provided",
          details: "Main Office",
        },
        ...(setup.phone_numbers && setup.phone_numbers.length > 0
          ? setup.phone_numbers.map((phone) => ({
              icon: <i className="fa-solid fa-phone-alt"></i>,
              title: "Phone",
              description: phone.value || "No phone available",
              details: phone.label || "",
            }))
          : []),
        ...(setup.email_addresses && setup.email_addresses.length > 0
          ? setup.email_addresses.map((email) => ({
              icon: <i className="fa-solid fa-envelope"></i>,
              title: "Email",
              description: email.value || "No email",
              details: email.label || "",
            }))
          : []),
        {
          icon: <i className="fa-solid fa-calendar-alt"></i>,
          title: "Working Hours",
          description: "24/7 Service",
          details: "Appointments available",
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background-secondary/30 relative overflow-hidden">
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-bl from-accent/10 via-primary/5 to-transparent rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-9xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-lg md:text-xl text-foreground-secondary max-w-2xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactCards.map((card, index) => (
              <motion.div
                key={`${card.title}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group relative bg-background rounded-3xl shadow-lg hover:shadow-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 overflow-hidden"
              >
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <div className={`${card.iconColor} text-2xl`}>{card.icon}</div>
                  </div>
                  <h3 className="font-bold text-foreground text-xl mb-3 group-hover:text-primary transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-primary font-semibold text-lg mb-2">
                    {card.description}
                  </p>
                  <p className="text-foreground-secondary text-sm">
                    {card.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Content Section */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Form - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-background rounded-3xl shadow-2xl p-8 md:p-10 border border-border/50 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      Send Us a Message
                    </h2>
                    <p className="text-foreground-secondary">
                      Fill out the form below and we'll get back to you
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-primary">
                      Response within 24h
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label
                        htmlFor="name"
                        className="block text-foreground font-semibold mb-3 group-hover:text-primary transition-colors"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <i className="fa-solid fa-user text-foreground-tertiary"></i>
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-12 pr-5 py-4 border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary bg-background transition-all duration-300 text-foreground placeholder-foreground-tertiary hover:border-primary/50"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label
                        htmlFor="email"
                        className="block text-foreground font-semibold mb-3 group-hover:text-primary transition-colors"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <i className="fa-solid fa-envelope text-foreground-tertiary"></i>
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-12 pr-5 py-4 border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary bg-background transition-all duration-300 text-foreground placeholder-foreground-tertiary hover:border-primary/50"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="subject"
                      className="block text-foreground font-semibold mb-3 group-hover:text-primary transition-colors"
                    >
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <i className="fa-solid fa-tag text-foreground-tertiary"></i>
                      </div>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full pl-12 pr-5 py-4 border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary bg-background transition-all duration-300 text-foreground placeholder-foreground-tertiary hover:border-primary/50"
                        placeholder="What is this regarding?"
                        required
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="message"
                      className="block text-foreground font-semibold mb-3 group-hover:text-primary transition-colors"
                    >
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute top-4 left-4 pointer-events-none">
                        <i className="fa-solid fa-comment-alt text-foreground-tertiary"></i>
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full pl-12 pr-5 py-4 border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary bg-background transition-all duration-300 resize-none text-foreground placeholder-foreground-tertiary hover:border-primary/50"
                        placeholder="Tell us more about your inquiry..."
                        required
                      ></textarea>
                    </div>
                  </div>

                  {/* Status Messages */}
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 bg-green-500/10 border-2 border-green-500/30 rounded-xl"
                    >
                      <i className="fa-solid fa-check-circle text-green-500 text-xl"></i>
                      <p className="text-green-600 font-semibold">
                        Message sent successfully! We'll get back to you soon.
                      </p>
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 bg-red-500/10 border-2 border-red-500/30 rounded-xl"
                    >
                      <i className="fa-solid fa-exclamation-circle text-red-500 text-xl"></i>
                      <p className="text-red-600 font-semibold">
                        Something went wrong. Please try again later.
                      </p>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full group relative bg-gradient-to-r from-primary via-primary to-accent hover:from-primary-dark hover:via-primary-dark hover:to-accent-dark text-on-primary px-8 py-5 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <i className="fa-solid fa-paper-plane group-hover:translate-x-1 transition-transform"></i>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information & Social Media - Takes 1 column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Contact Information Card */}
              <div className="bg-background rounded-3xl shadow-2xl p-8 border border-border/50 backdrop-blur-sm">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                  <span className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full"></span>
                  Contact Details
                </h2>

                <div className="space-y-5">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={`${item.title}-${item.description}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="group flex items-start p-5 rounded-2xl hover:bg-background-secondary transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <div className="text-primary text-lg">{item.icon}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-foreground text-base mb-1">
                          {item.title}
                        </h3>
                        <p className="text-primary font-semibold text-sm mb-1 break-words">
                          {item.description}
                        </p>
                        {item.details && (
                          <p className="text-foreground-secondary text-xs">
                            {item.details}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Media Card */}
              <div className="bg-gradient-to-br from-background to-background-secondary rounded-3xl shadow-2xl p-8 border border-border/50 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-gradient-to-b from-accent to-primary rounded-full"></span>
                  Follow Us
                </h3>
                <p className="text-foreground-secondary mb-6 text-sm">
                  Connect with us on social media for updates and news
                </p>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(setup?.social_media || {}).map(
                    ([platform, url]) => {
                      const platformLower = platform.toLowerCase();
                      const brandColors: { [key: string]: string } = {
                        facebook: "#1877F2",
                        twitter: "#1DA1F2",
                        x: "#000000",
                        instagram: "#E4405F",
                        linkedin: "#0077B5",
                        youtube: "#FF0000",
                        tiktok: "#000000",
                        whatsapp: "#25D366",
                        telegram: "#0088CC",
                        pinterest: "#BD081C",
                        snapchat: "#FFFC00",
                        discord: "#5865F2",
                        reddit: "#FF4500",
                        skype: "#00AFF0",
                        viber: "#665CAC",
                      };
                      
                      const brandColor = brandColors[platformLower] || "#6B7280";
                      
                      return url ? (
                        <motion.a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center w-12 h-12 rounded-xl bg-background-secondary hover:bg-background border-2 border-border hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-lg"
                          style={{ color: brandColor }}
                        >
                          <i className={`fa-brands fa-${platformLower} text-xl`}></i>
                        </motion.a>
                      ) : null;
                    }
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-background rounded-3xl shadow-2xl overflow-hidden border border-border/50"
          >
            <div className="p-6 md:p-8 border-b border-border bg-gradient-to-r from-background to-background-secondary">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                    <i className="fa-solid fa-map-location-dot text-primary"></i>
                    Find Our Office
                  </h2>
                  <p className="text-foreground-secondary">
                    Visit us at our {setup?.company_address ?? "main"} headquarters
                  </p>
                </div>
                <div className="flex items-center gap-2 px-5 py-2.5 bg-primary/10 rounded-full border border-primary/20">
                  <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-primary font-semibold text-sm">
                    Live Location
                  </span>
                </div>
              </div>
            </div>

            {/* Map Container */}
            <div className="relative h-[450px] md:h-[500px]">
              {/* Map Overlay Info Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute top-6 left-6 z-10 bg-background/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl max-w-xs border border-border/50"
              >
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse mr-2"></div>
                  <span className="font-bold text-foreground text-lg">
                    Our Location
                  </span>
                </div>
                <p className="text-sm text-foreground-secondary mb-3 leading-relaxed">
                  {setup?.company_address ?? "Address not provided"}
                </p>
                <div className="space-y-2 text-xs text-foreground-tertiary">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-clock text-primary"></i>
                    <span>Open 24/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-calendar-check text-primary"></i>
                    <span>Appointments available</span>
                  </div>
                </div>
              </motion.div>

              {/* Map Iframe */}
              <div className="relative h-full w-full">
                <iframe
                  src={
                    setup?.map_src ?? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62942.168702757306!2d41.8144382289873!3d9.605122943492882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x163101db1195c6e7%3A0x10209694f03469cc!2sDire%20Dawa!5e0!3m2!1sen!2set!4v1766759769950!5m2!1sen!2set"
                  }
                  className="w-full h-full border-0"
                  style={{
                    filter: "grayscale(0.1) contrast(1.05) saturate(1.1)",
                  }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Company Location Map"
                ></iframe>

                {/* Gradient Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/60 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
