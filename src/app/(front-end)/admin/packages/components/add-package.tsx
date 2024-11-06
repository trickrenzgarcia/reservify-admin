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
import { ScrollArea } from '@/components/ui/scroll-area'
import { Trash2 } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const PackageFormSchema = z.object({
  name: z.string().min(1),
  price: z
    .number()
    .positive()
    .refine((val) => val >= 0, {
      message: "Amount should be greater than or equal to 0",
    }),
  cycle: z.string().min(1).default('day'),
  endTime: z.string().min(1),
  endCycle: z.string().min(1),
  startTime: z.string().min(1),
  startCycle: z.string().min(1),
  inclusions: z.string().array(),
})

export default function AddPackage() {
  const [open, setOpen] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [inclusions, setInclusions] = React.useState<string[]>([])
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof PackageFormSchema>>({
    resolver: zodResolver(PackageFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      cycle: "day",
      endTime: "",
      endCycle: "",
      startTime: "",
      startCycle: "",
      inclusions: [],
    }
  })

  React.useEffect(() => {
    if(!open) {
      handleClose()
    }
  }, [open])

  function handleClose() {
    setOpen(false)
    setInclusions([])
    form.reset()
  }

  function appendInclusion() {
    setInclusions((prev) => [...prev, ""])
  }

  function removeInclusion(index: number) {
    setInclusions((prev) => prev.filter((_, i) => i !== index))
  }

  async function onSubmit(values: z.infer<typeof PackageFormSchema>) {
    setIsLoading(true)
    await _addDoc("package", {...values, inclusions: inclusions})
    setIsLoading(false)
    setOpen(false)
    toast({
      title: "Package Added!",
      description: "timestamp: " + dateToday(new Date()),
      action: <ToastAction altText="Okay">Okay</ToastAction>,
    });
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className='mb-4'>
                  <FormLabel htmlFor="name">Name of the Package:</FormLabel>
                  <FormControl>
                    <Input id="name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Dynamic inclusions fields */}
            <FormLabel htmlFor="inclusions">Package Inclusion:</FormLabel>
            {inclusions && (
              <ScrollArea id='inclusions' className='h-32 max-h-48 bg-gray-50'>
                <div className='p-4'>
                  {inclusions.map((field, index) => (
                    <FormItem key={index} className="flex items-center">
                      <FormControl className="">
                        <Input
                          value={inclusions[index]} // Controlled input value
                          onChange={(e) => {
                            const newInclusions = [...inclusions];
                            newInclusions[index] = e.target.value; // Update specific inclusion
                            setInclusions(newInclusions);
                          }}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeInclusion(index)}
                        className=""
                      >
                        <Trash2 size={18} />
                      </Button>
                    </FormItem>
                  ))}
                </div>  
              </ScrollArea>
            )}

            {/* Button to add a new inclusion */}
            <Button className='rounded-xl mt-2 mb-4' size='sm' type="button" onClick={() => appendInclusion()}>
              Add Inclusion
            </Button>

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className='mb-4'>
                  <FormLabel htmlFor="price">Price:</FormLabel>
                  <FormControl>
                    <Input 
                      type='number'
                      id="price"
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      placeholder='Enter the price'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='flex justify-between'>
              <section className='flex'>
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem className='mb-4'>
                      <FormLabel htmlFor="startTime">Start Time</FormLabel>
                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue id='startTime' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value='1:00'>1:00</SelectItem>
                              <SelectItem value='2:00'>2:00</SelectItem>
                              <SelectItem value='3:00'>3:00</SelectItem>
                              <SelectItem value='4:00'>4:00</SelectItem>
                              <SelectItem value='5:00'>5:00</SelectItem>
                              <SelectItem value='6:00'>6:00</SelectItem>
                              <SelectItem value='7:00'>7:00</SelectItem>
                              <SelectItem value='8:00'>8:00</SelectItem>
                              <SelectItem value='9:00'>9:00</SelectItem>
                              <SelectItem value='10:00'>10:00</SelectItem>
                              <SelectItem value='11:00'>11:00</SelectItem>
                              <SelectItem value='12:00'>12:00</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startCycle"
                  render={({ field }) => (
                    <FormItem className='mb-4'>
                      <FormLabel htmlFor="startCycle">Start Cycle</FormLabel>
                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue id='startCycle' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value='AM'>AM</SelectItem>
                              <SelectItem value='PM'>PM</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                    </FormItem>
                  )}
                />
              </section>
              <section className='flex'>
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem className='mb-4'>
                      <FormLabel htmlFor="endTime">End Time</FormLabel>
                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue id='endTime' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value='1:00'>1:00</SelectItem>
                              <SelectItem value='2:00'>2:00</SelectItem>
                              <SelectItem value='3:00'>3:00</SelectItem>
                              <SelectItem value='4:00'>4:00</SelectItem>
                              <SelectItem value='5:00'>5:00</SelectItem>
                              <SelectItem value='6:00'>6:00</SelectItem>
                              <SelectItem value='7:00'>7:00</SelectItem>
                              <SelectItem value='8:00'>8:00</SelectItem>
                              <SelectItem value='9:00'>9:00</SelectItem>
                              <SelectItem value='10:00'>10:00</SelectItem>
                              <SelectItem value='11:00'>11:00</SelectItem>
                              <SelectItem value='12:00'>12:00</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endCycle"
                  render={({ field }) => (
                    <FormItem className='mb-4'>
                      <FormLabel htmlFor="endCycle">End Cycle</FormLabel>
                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue id='endCycle' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value='AM'>AM</SelectItem>
                              <SelectItem value='PM'>PM</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      
                    </FormItem>
                  )}
                />
              </section>
            </div>

            <DialogFooter>
              <Button className='rounded-xl' type="submit" disabled={isLoading}>Save</Button>
              <Button className='rounded-xl' type='button' onClick={handleClose} disabled={isLoading} variant='destructive'>Cancel</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
