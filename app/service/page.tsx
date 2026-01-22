import Breadcrump from '@/components/layouts/breadcrump/Breadcrump'
import Service from '@/components/pages/service/Service'
import React from 'react'

const pages = () => {
  return (
    <>
      <Breadcrump 
        title="Our Services"
        subtitle="Excellent, reliable services with the highest standard of quality and ethics"
        backgroundImage="/assets/images/IMG-20260117-WA0019.jpg"
      />
      <Service />
    </>
  )
}

export default pages
