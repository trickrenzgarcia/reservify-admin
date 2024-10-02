import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Navbar() {
  return (
    <div className='bg-zinc-800 border-b-[12px] border-orange-500'>
      <div className='container mx-auto max-w-screen-xl'>
        <header className="px-4 py-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <Image src='/Logo.png' alt='Logo' width={50} height={50} />
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Button variant="default" className="rounded-full px-8 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm">
              DOWNLOAD MOBILE APP
            </Button>
            <Button variant="default" className="rounded-full px-8 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm">
              VISUAL SHOWCASE
            </Button>
          </div>
        </header>
      </div>
    </div>
  )
}
