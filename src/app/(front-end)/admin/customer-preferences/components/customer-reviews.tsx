'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CustomerReview } from '@/lib/firebase/types'
import { StarFilledIcon } from '@radix-ui/react-icons'
import { Star } from 'lucide-react'
import React from 'react'

type Props = {
  data: CustomerReview[]
}

export default function CustomerReviews({ data }: Props) {
  return (
    <div className='w-full flex flex-col'>
      <h1 className='text-5xl text-center font-bold py-6 text-gray-800'>CUSTOMER REVIEWS</h1>
      <div className='px-4 lg:px-28'>
        <ScrollArea className='h-[calc(100vh-220px)] pr-3'>
          {data.map((review) => (
            <div key={review.id}>
              <Card className='bg-[#e1e1e1] pt-10 px-10 rounded-3xl mb-4'>
                <CardContent className='flex flex-col lg:flex-row'>
                  <Avatar className='w-[150px] h-[150px]'>
                    <AvatarImage src='' alt='' />
                    <AvatarFallback className='text-3xl font-bold'>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col px-4 py-4 w-full'>
                    <div className='flex flex-col lg:flex-row justify-between'>
                      <h1 className='text-3xl font-bold'>{review.name}</h1>
                      <div className='flex'>
                        {Array.from({ length: review.rating }).map((_, index) => (
                          <span key={index}>
                            <StarFilledIcon className='w-7 h-7' color='#facc15'/>
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className='font-bold text-gray-600'>{review.email}</p>
                    <p className=''>{review.suggestion}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  )
}
