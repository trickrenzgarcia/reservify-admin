import Sidebar from '@/components/Layout/Sidebar'
import { getCollection } from '@/lib/firebase/service';
import { Package } from '@/lib/firebase/types';
import React from 'react'
import { columns } from './components/columns';
import DataTable from '@/components/Interface/DataTable';

export default async function PackagesPage() {
  const packages = await getCollection<Package>("package");

  return (
    <div className="min-h-[calc(100vh-94px)] flex w-full">
      {/* Sidebar */}
      <Sidebar />


      <div className='flex-1 overflow-x-auto p-4 lg:px-10'>
        
        <DataTable data={packages} columns={columns} />
      </div>
    </div>
  )
}
