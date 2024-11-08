import Sidebar from '@/components/Layout/Sidebar'
import React from 'react'
import Service from './components/Service'
import { getCollection } from '@/lib/firebase/service'
import { CustomerService } from '@/lib/firebase/types'

export default async function ServicePage() {
  const services = await getCollection<CustomerService>("customer_service", "customer_service")

  return (
    <div className="min-h-[calc(100vh-94px)] flex w-full">
      <Sidebar />
      <div className='flex-1 overflow-x-auto'>
        <Service services={services} />
      </div>
    </div>
  )
}
