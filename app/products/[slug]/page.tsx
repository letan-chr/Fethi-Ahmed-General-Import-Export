"use client";

import { getBatchData } from "@/api/Service";
import Breadcrump from "@/components/layouts/breadcrump/Breadcrump";
import ProjectDetails from "@/components/pages/projects/ProjectDetails";
import { Feature, Product } from "@/types/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const pages = () => {
  const { slug } = useParams();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const features: Feature[] = [{ name: "ecommerce_product", amount: 100000 }];

    async function fetchData() {
      try {
        const data = await getBatchData(features);

        setProducts(data.ecommerce_product?.data ?? []);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  const product = products.find((prod) => prod.slug === slug);

  const relatedProducts = products
    .filter((prod) => prod.slug !== slug)
    .slice(0, 3);

  if (!product) {
    return null;
  }

  return (
    <>
      <Breadcrump
        title={product.name}
        subtitle={product.name}
        backgroundImage={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.banner_image}`}
      />
      <ProjectDetails product={product} relatedProducts={relatedProducts} />
    </>
  );
};

export default pages;
