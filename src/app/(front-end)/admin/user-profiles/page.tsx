import UsersTable from '@/components/Interface/UsersTable'
import Sidebar from '@/components/Layout/Sidebar'
import { getAllUsers } from '@/lib/firebase/service'
import React from 'react'

export default async function UserProfilesPage() {
  const users = await getAllUsers()

  return (
    <div className="min-h-[calc(100vh-94px)] flex w-full">
      <Sidebar />
      <div className='flex-1 flex flex-col p-4 lg:p-16'>
        <UsersTable data={users} />
      </div>
    </div>
  )
}
