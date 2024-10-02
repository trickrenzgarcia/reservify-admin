'use client'

import useDateTimeToday from '@/hooks/use-datetime'
import React from 'react'

type HomeHeaderProps = {
  name: string | null;
}

export default function HomeHeader({ name }: HomeHeaderProps) {
  const { formattedDate } = useDateTimeToday()
  return (
    <div className='mb-8'>
      <h1 className='font-bold text-3xl xl:text-6xl tracking-wider'>WELCOME ADMIN {name?.toUpperCase()}!</h1>
      <h2 className='text-xl tracking-widest'>{formattedDate}</h2>
    </div>
  )
}
