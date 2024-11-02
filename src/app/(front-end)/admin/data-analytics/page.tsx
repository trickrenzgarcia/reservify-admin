import Sidebar from '@/components/Layout/Sidebar'
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react'
import DataAnalytics from './components/data-analytics';

export default async function DataAnalyticsPage() {
  const session = await auth();

  if(!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-[calc(100vh-94px)] flex w-full">
      <Sidebar />
      <div className='flex-1 flex flex-col p-4 lg:p-16'>
        <DataAnalytics />
      </div>
    </div>
  )
}
