'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { _addDoc } from '@/lib/firebase/service'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { dateToday } from '@/lib/utils'
import { ToastAction } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'

const PackageFormSchema = z.object({
  name: z.string().min(1),
  price: z
    .number()
    .positive()
    .refine((val) => val >= 0, {
      message: "Amount should be greater than or equal to 0",
    }),
  cycle: z.string().min(1),
  endTime: z.string().min(1),
  endCycle: z.string().min(1),
  startTime: z.string().min(1),
  startCycle: z.string().min(1),
  inclusions: z.string().array(),
})

export default function AddPackage() {
  const [open, setOpen] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof PackageFormSchema>>({
    resolver: zodResolver(PackageFormSchema),
    defaultValues: {

    }
  })

  function handleClose() {
    setOpen(false)
    form.reset()
  }

  async function onSubmit(values: z.infer<typeof PackageFormSchema>) {
    setIsLoading(true)
    await _addDoc("package", values)
    setIsLoading(false)
    setOpen(false)
    form.reset()
    toast({
      title: "Package Added!",
      description: "timestamp: " + dateToday(new Date()),
      action: <ToastAction altText="Okay">Okay</ToastAction>,
    });
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className='rounded-full bg-[#558134]'>Add Package</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Package</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
