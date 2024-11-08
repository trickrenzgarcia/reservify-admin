'use client'

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import SearchBar from './SearchBar'

const data = [
  { name: 'Sales Report' },
  { name: 'Reservations Report' },
  { name: 'Inventory Report' },
  { name: 'Payment Report' },
]

export default function ReportsData() {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter data based on searchQuery
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='w-full flex flex-col gap-10'>
      <div>
        <SearchBar onSearch={(query) => setSearchQuery(query)} />
      </div>
      <div className='flex flex-col gap-8'>
        {filteredData.map((value, index) => (
          <div key={value.name+index} className='flex justify-evenly'>
            <div className='w-1/2'>
              <h2 className='text-center text-lg font-semibold'>{value.name}</h2>
            </div>
            <div className='w-1/2 flex gap-4'>
              <Button className='lg:px-10 rounded-full' type='button'>VIEW</Button>
              <Button className='lg:px-10 rounded-full' type='button'>PRINT</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}