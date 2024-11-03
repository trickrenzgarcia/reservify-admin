import Sidebar from '@/components/Layout/Sidebar'
import { auth } from '@/lib/auth';
import { getCollection } from '@/lib/firebase/service';
import { CustomerReview } from '@/lib/firebase/types';
import { redirect } from 'next/navigation';
import React from 'react'
import CustomerReviews from './components/customer-reviews';

export default async function CustomerPreferencesPage() {
  const session = await auth();

  if(!session) {
    redirect('/login')
  }

  const customerReviews = await getCollection<CustomerReview>("customer_reviews")

  return (
    <div className="min-h-[calc(100vh-94px)] flex w-full">
      <Sidebar />
      <div className='flex-1 overflow-x-auto p-4 lg:px-10'>
        <CustomerReviews data={customerReviews} />
      </div>
    </div>
  )
}
