import Sidebar from '@/components/Layout/Sidebar';
import { Suspense } from 'react';
import PaymentData from './PaymentData';
import { Loader2 } from 'lucide-react';

type PageProps = {
  params: {
    id: string;
  }
}

function PageLoader() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <p>Loading... <Loader2  className='animate-spin' /></p>
    </div>
  )
}

export default function PaymentId({ params }: PageProps) {

  return (
    <div className="min-h-[calc(100vh-94px)] flex w-full">
      <Sidebar />
      <div className='flex-1 flex flex-col px-1 py-4 lg:p-10'>
        <Suspense fallback={<PageLoader />}>
          <PaymentData paymentId={params.id} />
        </Suspense>
      </div>
    </div>
  )
}
