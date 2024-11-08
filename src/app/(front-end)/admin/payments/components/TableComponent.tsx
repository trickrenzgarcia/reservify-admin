'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Payment } from '../data/payment';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Props = {
 payments: Payment[]
}

export default function TableComponent({ payments }: Props) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = React.useState("")

  const handleRowLink = (id: string) => {
    router.push(`/admin/payments/${id}`)
  }

  const filteredPayments = payments.filter((payment) => 
    payment.attributes.billing.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.attributes.source.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.attributes.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (payment.attributes.amount / 100).toString().includes(searchTerm)
  )

  return (
    <div className='flex flex-col gap-4'>
      <h1>All Payments</h1>
      
      {/* Search Bar */}
      <div className="relative w-[300px] lg:w-[320px]">
        <span className="absolute inset-y-0 left-1 flex items-center">
          <div className='bg-[#558134] p-1 rounded-full'>
            <Search className="w-5 h-5 text-white" /> 
          </div>
        </span>
        <Input
          type="text"
          placeholder="Search by email, type, or status"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-10 pl-10 rounded-full focus-visible:ring-gray-400 bg-gray-100"
        />
      </div>
      
      <Card className='rounded-none shadow-md border-t-4 border-t-orange-400'>
        <CardContent className='p-0'>
          <CardHeader>
            <CardTitle className='text-gray-700'>Paymongo API</CardTitle>
          </CardHeader>
          <Table className='overflow-x-scroll'>
            <TableCaption>A list of recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='p-4'>Payment</TableHead>
                <TableHead className='p-4'>Status</TableHead>
                <TableHead className='p-4 hidden lg:block'>Email</TableHead>
                <TableHead className='p-4'>Amount</TableHead>
                <TableHead className='p-4 hidden lg:block'>Date created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((pay) => (
                  <TableRow
                    key={pay.id}
                    onClick={() => handleRowLink(pay.id)}
                    className='hover:cursor-pointer hover:bg-orange-500/15'
                  >
                    <TableCell className='p-4'>
                      <span className='text-gray-600'>
                        {pay.attributes.source.type.toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell className='p-4'>
                      <span className='text-green-600 border border-green-400 rounded-sm bg-green-300/50 py-1 px-2'>
                        {pay.attributes.status.toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell className='p-4 text-gray-600 hidden lg:block'>{pay.attributes.billing.email}</TableCell>
                    <TableCell className='p-4 text-gray-600'>
                      {new Intl.NumberFormat("en-PH", {
                        style: "currency",
                        currency: "PHP"
                      }).format(pay.attributes.amount / 100)}
                    </TableCell>
                    <TableCell className='p-4 text-gray-600 hidden lg:block'>
                      {new Date(pay.attributes.created_at * 1000).toLocaleString("en-PH", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true
                      })}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center p-4 text-gray-600">
                    No matching payments.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
    
  )
}
