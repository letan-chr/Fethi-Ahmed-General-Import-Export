"use client";

import React, { useEffect, useState } from "react";
import AboutSection from "./AboutSection";
import MissionVisionValues from "./MissionVisionValues";
import BusinessStructure from "./BusinessStructure";
import StatisticsAchievements from "./Statistics";
import Team from "./Team";
import Testimonials from "./Testimonials";
import SisterCompany from "./SisterCompany";
import Achievement from "./Achievement";
import { getBatchData } from "@/api/Service";
import {
  AboutAward,
  AboutContent,
  Feature,
  Stat,
  TeamMember,
  Testimonial,
  SisterCompany as SisterCompanyType,
} from "@/types/types";

const About = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [teams, setTeams] = useState<TeamMember[]>([]);
  const [awards, setAwards] = useState<AboutAward[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [sisterCompanies, setSisterCompanies] = useState<SisterCompanyType[]>([]);

  useEffect(() => {
    const features: Feature[] = [
      { name: "about_content", amount: 4 },
      { name: "about_testimonial", amount: 4 },
      { name: "about_team", amount: 10 },
      { name: "about_award", amount: 10 },
      { name: "about_statistic", amount: 10 },
      { name: "about_sisters_company", amount: 10 },
    ];

    async function fetchData() {
      try {
        const data = await getBatchData(features);

        setAboutContent(data.about_content?.data ?? null);
        setTestimonials(data.about_testimonial?.data ?? []);
        setTeams(data.about_team?.data ?? []);
        setAwards(data.about_award?.data ?? []);
        setStats(data.about_statistic?.data ?? []);
        setSisterCompanies(data.about_sisters_company?.data ?? []);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {/* 1. About Section - White Background */}
      <AboutSection aboutContent={aboutContent} />

      {/* 2. Mission, Vision & Core Values - Black Background */}
      <MissionVisionValues aboutContent={aboutContent} />

      {/* 3. Business Structure - White Background */}
      <BusinessStructure aboutContent={aboutContent} />

      {/* 4. Leadership Team - Black Background */}
      {teams && teams.length > 0 && (
        <Team teams={teams} />
      )}

      {/* 5. Testimonials - White Background */}
      {testimonials && testimonials.length > 0 && (
        <Testimonials testimonials={testimonials} />
      )}

      {/* 6. Statistics & Achievements Combined - Black Background */}
      {(stats && stats.length > 0) || (awards && awards.length > 0) ? (
        <StatisticsAchievements stats={stats} awards={awards} />
      ) : null}

      {/* 7. Sister Companies - White Background */}
      {sisterCompanies && sisterCompanies.length > 0 && (
        <SisterCompany sisterCompanies={sisterCompanies} />
      )}

      {/* 8. Achievements - Black Background */}
      {awards && awards.length > 0 && (
        <Achievement awards={awards} />
      )}
    </>
  );
};

export default About;
