import Sidebar from '@/components/Layout/Sidebar';
import { Suspense } from 'react';
import PaymentDetail from './PaymentDetail';

export default async function PaymentId() {
  return (
    <div className="min-h-[calc(100vh-94px)] flex w-full">
      <Sidebar />
      <div className='flex-1 flex flex-col p-0 lg:p-10'>
        <Suspense fallback={<p>Loading...</p>}>
          <PaymentDetail />
        </Suspense>
      </div>
    </div>
  )
}
