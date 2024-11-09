'use client'

import { Mail, Phone } from 'lucide-react';
import { Payment } from '../data/payment'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

type Props = {
  payment: Payment
}

export default function PaymentDetail({ payment }: Props) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2'>
        <Link className='hover:underline hover:text-blue-500' href='/admin/payments'>All Payments</Link>
        <p>/</p>
        <Link className='hover:underline text-orange-500' href={`/admin/payments/${payment.id}`}>{payment.id}</Link>
      </div>
      
      
      <Card className='rounded-none shadow-md border-t-4 border-t-orange-400'>
        <CardContent className='p-0 grid grid-cols-1 lg:grid-cols-3'>
          <div className='flex flex-col p-6 gap-5'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold text-gray-700'>Payment details</h2>
              <span className='text-sm text-green-600 border border-green-400 rounded-sm bg-green-300/50 py-0 px-4'>
                {payment.attributes.status}
              </span>
            </div>
            <section className='flex flex-col gap-2'>
              <div className='flex items-center justify-between'>
                <h2 className='text-[15px]'>Gross amount</h2>
                <p className='text-[15px]'>
                  {new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP"
                  }).format(payment.attributes.amount / 100)}
                </p>
              </div>
              <div className='flex items-center justify-between'>
                <h2 className='text-[15px]'>Fees</h2>
                <p className='text-[15px]'>- {new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP"
                  }).format(payment.attributes.fee / 100)}
                </p>
              </div>
              <div className='w-full h-[2px] bg-gray-300' />
              <div className='flex items-center justify-between'>
                <h2 className='text-[15px]'>Net amount</h2>
                <p className='text-[15px]'>{new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP"
                  }).format(payment.attributes.net_amount / 100)}
                </p>
              </div>
            </section>
            <div className='mt-6 flex flex-col'>
              <h2 className='text-[15px] font-semibold text-gray-700'>Payment description:</h2>
              <p className='text-sm'>{payment.attributes.description}</p>
            </div>
          </div>
          <div className='flex flex-col px-6 py-8 gap-2'>
            <h2 className='text-gray-700 font-semibold text-[15px]'>{payment.attributes.source.type.toUpperCase()}</h2>
            <p className='text-sm text-gray-800'>{payment.attributes.status === "paid" ? `Paid on ${new Date(payment.attributes.created_at * 1000).toLocaleString("en-PH", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true
            })}`: ''}</p>
          </div>
          <div className='flex flex-col px-6 py-8 gap-2 bg-gray-100 border-l'>
            <h2 className='text-gray-700 font-semibold text-[15px]'>Billing details</h2>
            <p className='text-xl text-gray-700'>{payment.attributes.billing.name}</p>
            <div className='flex gap-2 items-center'>
              <Mail size={16} />
              <p className='text-sm'>{payment.attributes.billing.email}</p>
            </div>
            <div className='flex gap-2 items-center'>
              <Phone size={16} />
              <p className='text-sm'>+63 {payment.attributes.billing.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
