'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

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
        <header className="px-4 py-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <Image src='/Logo.png' alt='Logo' width={50} height={50} />
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
