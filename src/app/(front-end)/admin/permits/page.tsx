import DataTable from '@/components/Interface/DataTable'
import Sidebar from '@/components/Layout/Sidebar'
import { getCollection } from '@/lib/firebase/service'
import { Permit } from '@/lib/firebase/types'
import React from 'react'
import { columns } from './components/columns'

export default async function PermitsPage() {
  const permits = await getCollection<Permit>("permits")

  return (
    <div className="min-h-[calc(100vh-94px)] flex w-full">
      <Sidebar />
      <div className='flex-1 overflow-x-auto p-4 lg:px-10'>
        <DataTable data={permits} columns={columns} />
      </div>
    </div>
  )
}
