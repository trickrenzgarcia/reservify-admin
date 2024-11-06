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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const InventoryFormSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().refine((val) => val >= 1, {
    message: "Quantity should be greater than or equal to 1.00",
  }),
  amount: z.number().refine((val) => val >= 1, {
    message: "Amount should be greater than or equal to 1",
  }),
  type: z.enum(['amenities', 'audio-visual', 'seating'], {
    message: 'Invalid Type'
  })
})

export default function AddInventory() {
  const [open, setOpen] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof InventoryFormSchema>>({
    resolver: zodResolver(InventoryFormSchema),
    defaultValues: {
      name: "",
      amount: 0.00,
      quantity: 0
    }
  })

  function handleClose() {
    setOpen(false)
    form.reset()
  }

  async function onSubmit(values: z.infer<typeof InventoryFormSchema>) {
    setIsLoading(true)
    await _addDoc("inventory", values)
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
        <Button className='rounded-full bg-[#558134]'>Add Inventory</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Item</DialogTitle>
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
                <FormItem>
                  <FormLabel htmlFor='name'>Name:</FormLabel>
                  <FormControl>
                    <Input id='name' {...field} placeholder='Enter name of item' disabled={isLoading} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='amount'>Amount:</FormLabel>
                  <FormControl>
                    <Input
                      id='amount'
                      {...field}
                      type="number"
                      placeholder='Enter amount'
                      disabled={isLoading}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))} // Convert to number
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='quantity'>Quantity:</FormLabel>
                  <FormControl>
                    <Input 
                      id='quantity'
                      {...field}
                      placeholder='Enter quantity'
                      type='number'
                      disabled={isLoading}
                      onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add-ons Type:</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                    <FormControl>
                      <SelectTrigger className="w-[220px]">
                        <SelectValue placeholder="Select Add-ons Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Add-ons</SelectLabel>
                        <SelectItem value="amenities">Amenities</SelectItem>
                        <SelectItem value="audio-visual">Audio-Visual Equipment</SelectItem>
                        <SelectItem value="seating">Seating</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <DialogFooter className='mt-4 flex gap-2'>
              <Button type='submit' className='rounded-xl' disabled={isLoading}>Save</Button>
              <Button type='button' className='rounded-xl' variant='destructive'
                onClick={handleClose}
                disabled={isLoading}
              >Close</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
