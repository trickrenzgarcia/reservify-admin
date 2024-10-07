import Sidebar from '@/components/Layout/Sidebar'
import { getCollection } from '@/lib/firebase/service'
import React from 'react'
import { columns } from './components/columns'
import DataTable from '@/components/Interface/DataTable'
import { User } from '@/lib/firebase/types'

export default async function UserProfilesPage() {
  const users = await getCollection<User>("users")

  return (
    <div className="min-h-[calc(100vh-94px)] flex w-full">
      {/* Sidebar */} 
      <Sidebar />

      {/* Content area takes the remaining space */}
      <div className="flex-1 overflow-x-auto p-4 lg:px-10">
        
        <DataTable data={users} columns={columns} />
      </div>
    </div>
  )
}
