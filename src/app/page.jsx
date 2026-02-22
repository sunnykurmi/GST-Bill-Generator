import BuyerDetails from '@/components/form/BuyerDetails'
import FormHeader from '@/components/form/FormHeader'
import InvoiceDetails from '@/components/form/InvoiceDetails'
import OrderDetails from '@/components/form/OrderDetails'
import React from 'react'

const page = () => {

  return (
    <div className='bg-[#F1F2F4]'>
      <FormHeader/>
      <InvoiceDetails/>
      <BuyerDetails/>
      <OrderDetails/>
    </div>
  )
}

export default page