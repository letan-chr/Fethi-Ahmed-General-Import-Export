"use client";

import { getBatchData, getSisterCompanyById } from "@/api/Service";
import Breadcrump from "@/components/layouts/breadcrump/Breadcrump";
import SisterCompanyDetails from "@/components/pages/about/SisterCompanyDetails";
import { Feature, SisterCompany } from "@/types/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { id } = useParams();

  const [sisterCompanies, setSisterCompanies] = useState<SisterCompany[]>([]);
  const [company, setCompany] = useState<SisterCompany | null>(null);

  useEffect(() => {
    const features: Feature[] = [{ name: "about_sisters_company", amount: 100000 }];

    async function fetchData() {
      try {
        const data = await getBatchData(features);
        setSisterCompanies(data.about_sisters_company?.data ?? []);

        const res = await getSisterCompanyById(id as string);
        setCompany(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [id]);

  const relatedCompanies = sisterCompanies
    .filter((comp) => comp.id !== Number(id) && comp.is_active)
    .slice(0, 3);

  if (!company) {
    return null;
  }

  return (
    <>
      <Breadcrump
        title={company.name}
        subtitle={company.short_description || company.name}
        backgroundImage={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${company.banner}`}
      />
      <SisterCompanyDetails company={company} relatedCompanies={relatedCompanies} />
    </>
  );
};

export default page;
