import Breadcrump from "@/components/layouts/breadcrump/Breadcrump";
import About from "@/components/pages/about/About";
import React from "react";

const page = () => {
  return (
    <>
      <Breadcrump
        title="About Us"
        subtitle="Connecting Ethiopia's Finest Coffee with the World & Supplying Quality Industrial Solutions"
        backgroundImage="/assets/images/IMG-20260117-WA0018.jpg"
      />
      <About />
    </>
  );
};

export default page;
