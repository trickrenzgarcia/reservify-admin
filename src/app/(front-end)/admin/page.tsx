import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { dateToday } from '@/lib/utils';
import { redirect } from 'next/navigation';

export default async function Home() {
  const date = new Date();
  const session = await auth();

  if(!session?.user) {
    redirect('/login');
  }

  return (
    <div className="min-h-[calc(100vh-94px)] flex w-full">
      <Sidebar />
      <div className='flex-1 flex flex-col p-4 lg:p-16'>
        <div className='mb-8'>
          <h1 className='font-bold text-3xl xl:text-6xl tracking-wider'>WELCOME ADMIN {session.user.name?.toUpperCase()}!</h1>
          <h2 className='text-xl tracking-widest'>{dateToday(date)}</h2>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Card className='border-4 border-black rounded-3xl'>
            <CardContent className='py-8'>
              <div className='text-center'>
                <h3 className='text-lg mb-4'>REVENUE</h3>
                <p className='text-4xl font-bold'>PHP 0</p>
              </div>
            </CardContent>
          </Card>
          <Card className='border-4 border-black rounded-3xl'>
            <CardContent className='py-8'>
              <div className='text-center'>
                <h3 className='text-lg mb-4'>REGISTERED CLIENT</h3>
                <p className='text-4xl font-bold'>0</p>
              </div>
            </CardContent>
          </Card>
          <Card className='border-4 border-black rounded-3xl'>
            <CardContent className='py-8'>
              <div className='text-center'>
                <h3 className='text-lg mb-4'>REGISTERED CLIENT</h3>
                <p className='text-4xl font-bold'>0</p>
              </div>
            </CardContent>
          </Card>
          <Card className='border-4 border-black rounded-3xl'>
            <CardContent className='py-8'>
              <div className='text-center'>
                <h3 className='text-lg mb-4'>REGISTERED CLIENT</h3>
                <p className='text-4xl font-bold'>0</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
      </div>
    </div>
  );
}
