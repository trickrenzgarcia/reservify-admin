'use client'

import useDateTimeToday from '@/hooks/use-datetime'
import React from 'react'

type HomeHeaderProps = {
  name: string | null;
}

export default function HomeHeader({ name }: HomeHeaderProps) {
  const { formattedDate } = useDateTimeToday()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])
  

  return (
    <div className='mb-8'>
      <h1 className='font-bold text-3xl xl:text-6xl tracking-wider'>WELCOME ADMIN {name?.toUpperCase()}!</h1>
      {isMounted && <h2 className='text-xl tracking-widest'>{formattedDate}</h2>}
    </div>
  )
}
