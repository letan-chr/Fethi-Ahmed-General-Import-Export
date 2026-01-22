"use client";

import { getBatchData, getBlogBySlug } from "@/api/Service";
import Breadcrump from "@/components/layouts/breadcrump/Breadcrump";
import BlogDetails from "@/components/pages/blog/BlogDetails";
import { Blog, Feature } from "@/types/types";
import React, { useEffect, useState } from "react";
import { use } from "react";

const page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const features: Feature[] = [{ name: "blog_post", amount: 100000 }];

    async function fetchData() {
      try {
        const data = await getBatchData(features);

        setBlogs(data.blog_post?.data ?? []);

        const res = await getBlogBySlug(slug as string);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  const relatedBlogs = blogs.filter((blog) => blog.slug !== slug).slice(0, 3);

  return (
    <>
      <Breadcrump
        title={blog?.title}
        subtitle={blog?.title}
        backgroundImage={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${blog?.banner_image}`}
      />
      <BlogDetails blog={blog} relatedBlogs={relatedBlogs} />
    </>
  );
};

export default page;
