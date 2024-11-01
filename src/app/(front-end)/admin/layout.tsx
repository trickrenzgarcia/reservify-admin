import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function AdminLayout({ children }: { children: React.ReactNode}) {
  const session = await auth();

  if(!session?.user) {
    redirect('/login');
  }
  
  return (
    <div className="flex-1 flex">{children}</div>
  )
}
