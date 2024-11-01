import Sidebar from '@/components/Layout/Sidebar'
import { auth } from '@/lib/auth';
import { getCollection } from '@/lib/firebase/service'
import { Reserve } from '@/lib/firebase/types'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function ReservationsPage() {
  const session = await auth();
  const reservations = await getCollection<Reserve>("reservations")
  
  if(!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-[calc(100vh-94px)] flex w-full">
      <Sidebar />
      <div className='flex-1 flex flex-col p-4 lg:p-16'>
        
      </div>
    </div>
  )
}
