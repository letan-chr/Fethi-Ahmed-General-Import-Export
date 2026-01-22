import Breadcrump from '@/components/layouts/breadcrump/Breadcrump'
import Blog from '@/components/pages/blog/Blog'
import React from 'react'

const page = () => {
  return (
    <>
      <Breadcrump 
        title="Our Blog"
        subtitle="Stay updated with the latest news, insights, and updates"
        backgroundImage="/assets/images/IMG-20260117-WA0018.jpg"
      />
      <Blog />
    </>
  )
}

export default page
