'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function EditTermsAndConditions() {
  const [open, setOpen] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()
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
      </DialogContent>
    </Dialog>
  )
}
