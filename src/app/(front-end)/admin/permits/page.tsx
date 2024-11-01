import DataTable from '@/components/Interface/DataTable'
import Sidebar from '@/components/Layout/Sidebar'
import { getCollection } from '@/lib/firebase/service'
import { Permit } from '@/lib/firebase/types'
import React from 'react'
import { columns } from './components/columns'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AddPermit from './components/add-permit'

export default async function PermitsPage() {
  const session = await auth();

  if(!session) {
    redirect('/login')
  }

  const permits = await getCollection<Permit>("permits")

  return (
    <div className="min-h-[calc(100vh-94px)] flex w-full">
      <Sidebar />
      <div className='flex-1 overflow-x-auto p-4 lg:px-10'>
        <DataTable data={permits} columns={columns} addComponent={<AddPermit />} />
      </div>
    </div>
  )
}
