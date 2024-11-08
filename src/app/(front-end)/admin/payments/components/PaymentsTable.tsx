import { Payment, ResponsePayment } from '../data/payment';
import TableComponent from './TableComponent';

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

export default async function PaymentsTable() {
  const payments = await getAllPayments()
  return <TableComponent payments={payments} />
}
