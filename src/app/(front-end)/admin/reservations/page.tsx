import DataTable from '@/components/Interface/DataTable';
import Sidebar from '@/components/Layout/Sidebar'
import { auth } from '@/lib/auth';
import { getCollection, getDocById } from '@/lib/firebase/service'
import { Reserve, TermsConditions } from '@/lib/firebase/types'
import { redirect } from 'next/navigation';
import React from 'react'
import { columns } from './components/columns';
import EditTermsAndConditions from './components/edit-terms-condition';

export default async function ReservationsPage() {
  const session = await auth();
  const reservations = await getCollection<Reserve>("reservations")
  const termsAndConditions = await getDocById<TermsConditions>("terms_and_conditions", "policy")
  
  if(!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-[calc(100vh-94px)] flex w-full">
      <Sidebar />
      <div className='flex-1 overflow-x-auto p-4 lg:px-10'>
        <DataTable
          data={reservations}
          columns={columns}
          addComponent={
            <EditTermsAndConditions data={termsAndConditions} />
          }
        />
      </div>
    </div>
  )
}
