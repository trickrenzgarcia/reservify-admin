import React from 'react'
import { Payment } from '../data/payment';
import PaymentDetail from './PaymentDetail';

async function getPaymentDetail(id: string): Promise<Payment> {
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
  return data.data as Payment

}

export default async function PaymentData({ paymentId }: { paymentId: string }) {
  const payment = await getPaymentDetail(paymentId)
  return <PaymentDetail payment={payment} />
}
