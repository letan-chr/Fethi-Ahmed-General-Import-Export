import Breadcrump from '@/components/layouts/breadcrump/Breadcrump'
import Contacts from '@/components/pages/contacts/Contacts'
import React from 'react'

const page = () => {
  return (
    <>
      <Breadcrump 
        title="Contact Us"
        subtitle="Get in touch with us - We are 24-hour workers for your convenience"
        backgroundImage="/assets/images/IMG-20260117-WA0022.jpg"
      />
      <Contacts />  
    </>
  )
}

export default page
