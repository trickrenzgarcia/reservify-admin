import LoginForm from '@/components/Forms/LoginForm';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {

  const session = await auth()

  if(session?.user) {
    redirect('/admin')
  }

  return (
    <div className='bg-gradient-to-b from-amber-100 via-amber-300 to-amber-400'>
      <LoginForm />
    </div>
  )
}
