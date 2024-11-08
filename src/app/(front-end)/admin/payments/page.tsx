import Sidebar from '@/components/Layout/Sidebar'
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import PaymentsTable from './components/PaymentsTable';
import { Loader2 } from 'lucide-react';

function PageLoader() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <p>Loading...</p>
      <Loader2  className='animate-spin'/>
    </div>
  )
}

export default async function PaymentsPage() {
  const session = await auth();

  if(!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-[calc(100vh-94px)] flex w-full">
      <Sidebar />
      <div className='flex-1 flex flex-col px-1 py-4 lg:p-10'>
        <Suspense fallback={<PageLoader />}>
          <PaymentsTable />
        </Suspense>
      </div>
    </div>
  )
}
