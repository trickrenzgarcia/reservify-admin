'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { _addDoc } from '@/lib/firebase/service'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { cn, dateToday } from '@/lib/utils'
import { ToastAction } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'

const PermitFormSchema = z.object({
  name: z.string().min(1),
  amount: z
    .number()
    .positive()
    .refine((val) => val >= 0, {
      message: "Amount should be greater than or equal to 0",
    }),
  expiredAt: z.string().min(1, 'Expiration date is required.'),
  updatedAt: z.string(),
})

export default function AddPermit() {
  const [open, setOpen] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof PermitFormSchema>>({
    resolver: zodResolver(PermitFormSchema),
    defaultValues: {
      name: "",
      amount: 0,
      expiredAt: "",
      updatedAt: new Date().toISOString()
    }
  })

  function handleClose() {
    setOpen(false)
    form.reset()
  }

  async function onSubmit(values: z.infer<typeof PermitFormSchema>) {
    setIsLoading(true)
    await _addDoc("permits", values)
    setIsLoading(false)
    setOpen(false)
    form.reset()
    toast({
      title: "Item Added!",
      description: "timestamp: " + dateToday(new Date()),
      action: <ToastAction altText="Okay">Okay</ToastAction>,
    });
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='rounded-full bg-[#558134]'>Add Permit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Permit</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className='mb-4'>
                  <FormLabel htmlFor="name">Permit:</FormLabel>
                  <FormControl>
                    <Input id="name" {...field} placeholder='Enter the permit name' />
                  </FormControl>
                </FormItem>
              )}
            />
    
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className='mb-4'>
                  <FormLabel htmlFor="amount">Amount:</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      id="amount"
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      value={field.value}
                      placeholder='Enter the amount'
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expiredAt"
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel htmlFor=''>Expiration Date:</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className='mt-4 flex gap-2'>
              <Button type='submit' className='rounded-xl'>Save</Button>
              <Button type='button' className='rounded-xl' variant='destructive'
                onClick={handleClose}
              >Close</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
