import Sidebar from '@/components/Layout/Sidebar'
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react'
import ReportsData from './components/ReportsData';
import { Payment, ResponsePayment } from '../payments/data/payment';

async function getAllPayments(): Promise<Payment[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch('https://api.paymongo.com/v1/payments', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${process.env.PAYMONGO_BASIC_KEY!}`
    },
    next: {
      revalidate: 60,
      tags: ['payments']
    }
  })
  const data = await response.json() as ResponsePayment
  const payments = data.data;
  return payments
}

export default async function ReportsPage() {
  const session = await auth();

  if(!session) {
    redirect('/login')
  }

  const payments = await getAllPayments();

  return (
    <div className="min-h-[calc(100vh-94px)] flex w-full">
      <Sidebar />
      <div className='flex-1 overflow-x-auto p-4 lg:px-10'>
        <ReportsData payments={payments} />
      </div>
    </div>
  )
}
