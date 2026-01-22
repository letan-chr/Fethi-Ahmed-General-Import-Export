import Breadcrump from '@/components/layouts/breadcrump/Breadcrump'
import Products from '@/components/pages/projects/Products'
import React from 'react'

const pages = () => {
  return (
    <>
      <Breadcrump 
        title="Our Products"
        subtitle="Quality products sourced and manufactured with excellence"
        backgroundImage="/assets/images/warehouse-goods-cartons-factory-storage-shipping-merchandise-room-logistics-background_892776-36406.jpg"
      />
      <Products />
    </>
  )
}

export default pages
