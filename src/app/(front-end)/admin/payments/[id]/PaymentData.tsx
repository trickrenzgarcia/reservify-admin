import React from 'react'
import { Payment } from '../data/payment';

async function getPaymentDetail(id: string): Promise<Payment> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch(`https://api.paymongo.com/v1/payments/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${process.env.PAYMONGO_BASIC_KEY!}`
    },
    next: {
      tags: ['payment']
    }
  })
  const data = await response.json()
  return data

}

export default function PaymentData() {
  return (
    <div>PaymentData</div>
  )
}
