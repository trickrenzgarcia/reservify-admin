'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { navList } from '@/lib/constant'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { data, status } = useSession()

  const handleSignInAsAdmin = () => {
    router.push('/login')
  }

  const handleDownloadMobileApp = () => {
    router.push('/download')
  }

  const handleVisualShowCase = () => {
    router.push('/showcase')
  }

  return (
    <div className='bg-[#373b40] border-b-[12px] border-orange-500'>
      <div className='container mx-auto max-w-screen-xl'>
        <header className="px-4 py-4 flex flex-row justify-between items-center space-y-2 sm:space-y-0">
          <Link href='/'>
            <Image src='/Logo_only.png' alt='Logo' width={50} height={50} />
          </Link>

          {status === 'authenticated' && (
            <Sheet>
              <SheetTrigger asChild>
                <Button className='md:hidden bg-[#558134] p-2'>
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent className='w-full' side="top">
                <ul className='flex flex-col my-6 gap-2'>
                  {navList.map((nav, index) => (
                    <SheetClose key={index} asChild>
                      <Link href={nav.href}>
                        <li
                          className={cn(
                            "p-2 rounded-lg text-center font-bold py-3",
                            index % 2 === 0 ? "bg-[#ECECEC]" : "bg-[#F3F3F3]",
                            pathname === nav.href && "bg-[#558134] hover:bg-[#66993e] text-white border-2 border-primary"
                          )}
                        >
                          {nav.title}
                        </li>
                      </Link>
                    </SheetClose>
                  ))}
                  <Link href="/" onClick={async () => {
                    await signOut({ redirectTo: '/login' });
                  }}>
                    <li className="p-2 rounded-lg text-center font-bold py-3 bg-[#ECECEC]">
                      SIGN OUT
                    </li>
                  </Link>
                </ul>
              </SheetContent>
            </Sheet>
          )}
          
          {status === 'unauthenticated' && (
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              {pathname !== '/login' && (
                <Button onClick={handleSignInAsAdmin} variant="default" className="rounded-full px-8 bg-[#558134] hover:bg-[#66993e] text-white text-xs sm:text-sm">
                  SIGN-IN AS ADMIN
                </Button>
              )}
              {pathname !== '/download' && (
              <Button onClick={handleDownloadMobileApp} variant="default" className="rounded-full px-8 bg-[#558134] hover:bg-[#66993e] text-white text-xs sm:text-sm">
                DOWNLOAD MOBILE APP
              </Button>
              )}
              {pathname !== '/showcase' && (
                <Button onClick={handleVisualShowCase} variant="default" className="rounded-full px-8 bg-[#558134] hover:bg-[#66993e] text-white text-xs sm:text-sm">
                  VISUAL SHOWCASE
                </Button>
              )}
            </div>
          )}
        </header>
      </div>
    </div>
  )
}
