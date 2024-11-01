import HomeHeader from '@/components/Interface/HomeHeader';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { getCollection, getUsersCount } from '@/lib/firebase/service';
import { Reserve } from '@/lib/firebase/types';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  // if(!session?.user) {
  //   redirect('/login');
  // }

  const usersCount = await getUsersCount();
  const reservations = await getCollection<Reserve>("reservations")

  return (
    <div className="min-h-[calc(100vh-94px)] flex w-full">
      <Sidebar />
      <div className='flex-1 flex flex-col p-4 lg:p-16'>
        {session && <HomeHeader name={session.user.name} />}
        
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
                <p className='text-4xl font-bold'>{usersCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card className='border-4 border-black rounded-3xl'>
            <CardContent className='py-8'>
              <div className='text-center'>
                <h3 className='text-lg mb-4'>FINISHED RESERVATIONS</h3>
                <p className='text-4xl font-bold'>0</p>
              </div>
            </CardContent>
          </Card>
          <Card className='border-4 border-black rounded-3xl'>
            <CardContent className='py-8'>
              <div className='text-center'>
                <h3 className='text-lg mb-4'>PENDING RESERVATIONS</h3>
                <p className='text-4xl font-bold'>{reservations.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
