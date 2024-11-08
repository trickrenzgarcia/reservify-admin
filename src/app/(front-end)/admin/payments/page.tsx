import Sidebar from '@/components/Layout/Sidebar'
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import PaymentsTable from './components/PaymentsTable';

export default async function PaymentsPage() {
  const session = await auth();

  if(!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-[calc(100vh-94px)] flex w-full">
      <Sidebar />
      <div className='flex-1 flex flex-col p-0 lg:p-10'>
        <Suspense fallback={<p>Loading...</p>}>
          <PaymentsTable />
        </Suspense>
      </div>
    </div>
  )
}
