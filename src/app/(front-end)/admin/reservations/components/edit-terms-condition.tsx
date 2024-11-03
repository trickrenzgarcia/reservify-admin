'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'
import { TermsConditions } from '@/lib/firebase/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { termsConditionSchema, TermsConditions as TermsConditonSchema } from '../data/schema'

type Props = {
  data: TermsConditions | undefined
}

export default function EditTermsAndConditions({ data }: Props) {
  const [open, setOpen] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<TermsConditonSchema>({
    resolver: zodResolver(termsConditionSchema),
    defaultValues: {
      
    }
  })

  const onSubmit = async (values: any) => {
    setIsLoading(true)


    toast({
      title: '',
      description: ''
    })
    setOpen(false)
    setIsLoading(false)
    router.refresh()
  }

  console.log(data)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='rounded-full bg-[#558134]'>Edit Terms & Condition</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Terms and Conditions</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-auto max-h-[448px]'>
          awdasaw
        </ScrollArea>
        <Button>Add New</Button>
      </DialogContent>
    </Dialog>
  )
}
