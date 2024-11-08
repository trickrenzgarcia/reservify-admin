import DataTable from '@/components/Interface/DataTable';
import Sidebar from '@/components/Layout/Sidebar'
import { auth } from '@/lib/auth';
import { getCollection } from '@/lib/firebase/service';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function PaymentsPage() {
  const session = await auth();

  if(!session) {
    redirect('/login')
  }



  return (
    <div className="min-h-[calc(100vh-94px)] flex w-full">
      <Sidebar />
      <div className='flex-1 flex flex-col p-4 lg:p-10'>
        <h1>All Payment</h1>
      </div>
    </div>
  )
}
