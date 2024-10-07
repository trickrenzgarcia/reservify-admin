'use client'

import { Button } from '@/components/ui/button'
import { Inventory } from '@/lib/firebase/types'

type ViewVenueProps = {
  inventory: Inventory[]
}

export default function ViewVenue<T>({ inventory }: ViewVenueProps) {
  return (
    <div className='bg-[#E1E1E1] w-full p-6 rounded-3xl mt-4 mb-6'>
      <div className='flex justify-between items-center max-w-screen-md mx-auto'>
        <span className='font-semibold'>ABOUT THE VENUE</span>
        <Button className='lg:text-lg h-8 rounded-3xl py-5 px-10'>EDIT</Button>
      </div>
    </div>
  )
}
