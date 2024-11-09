'use client'

import React from 'react'
import { calculatePaymentsSummary, formatCurrency } from '../../data-analytics/calculator'
import { Payment } from '../../payments/data/payment'

export default function SalesReport({ payments }: { payments: Payment[] }) {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const targetMonth = new Date().toLocaleString("default", { month: "short" });
  const { chartData, totalAmount, totalFee, totalNetAmount, paidPaymentsCount } = calculatePaymentsSummary(payments, targetMonth);
  return (
    <div>
      <h1 className='text-3xl font-bold text-orange-600'>Sales for {currentMonth}</h1>
      <div className='flex justify-between w-3/4'>
        <h2>Sales</h2>
        <p>{formatCurrency(totalAmount)}</p>
      </div>
      <div className='flex justify-between w-3/4'>
        <h2>Taxes</h2>
        <p>{formatCurrency(totalFee)}</p>
      </div>
      <div className='h-1 bg-gray-200 w-3/4' />
      <div className='flex justify-between w-3/4'>
        <h2 className='font-bold'>Net Sales</h2>
        <p className='font-bold'>{formatCurrency(totalNetAmount)}</p>
      </div>
    </div>
  )
}
