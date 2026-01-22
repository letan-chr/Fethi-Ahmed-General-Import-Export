"use client"

import { getBatchData, getServiceBySlug } from '@/api/Service'
import Breadcrump from '@/components/layouts/breadcrump/Breadcrump'
import ServiceDetails from '@/components/pages/service/ServiceDetails'
import { Feature, Service } from '@/types/types'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const pages = () => {
  const { slug } = useParams();

  const [services, setServices] = useState<Service[]>([]);
  const [service, setService] = useState<Service | null>(null);
  
    useEffect(() => {
      const features: Feature[] = [{ name: "about_service", amount: 100000 }];
  
      async function fetchData() {
        try {
          const data = await getBatchData(features);
  
          setServices(data.about_service?.data ?? []);

          const res = await getServiceBySlug(slug as string);
          setService(res.data);
        } catch (err) {
          console.error(err);
        }
      }
  
      fetchData();
    }, []);

    const relatedServices = services
      .filter((serv) => serv.slug !== slug)
      .slice(0, 3);

  return (
    <>
      <Breadcrump
        title={service?.title}
        subtitle={service?.title}
        backgroundImage={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${service?.banner_image}`}
      />
      <ServiceDetails service={service} relatedServices={relatedServices} />
    </>
  );
}

export default pages
