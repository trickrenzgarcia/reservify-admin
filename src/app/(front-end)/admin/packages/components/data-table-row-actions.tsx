"use client"

import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { packageSchema } from '../data/schema'
//import { deleteInventory, editInventory } from '@/lib/firebase/service'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Input } from '@/components/ui/input'
import { _deleteDoc, _editDoc } from '@/lib/firebase/service'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { dateToday } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter(); 
  const pack = packageSchema.parse(row.original)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [open, setOpen] = React.useState<boolean>(false);
  const { toast } = useToast()

  const form = useForm<z.infer<typeof packageSchema>>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      id: pack.id,
      details: pack.details,
      amount: pack.amount,
      materials: pack.materials
    }
  })

  async function handleDeleteInventory() {
    setIsLoading(true)
    await _deleteDoc("package", pack.id)
    router.refresh();
    setIsLoading(false)
  }

  async function handleEdit(values: z.infer<typeof packageSchema>) {
    setIsLoading(true)
    setOpen(false)
    await _editDoc("package", values.id, {
      name: values.name,
      details: values.details,
      amount: values.amount,
      materials: values.materials
    })
    toast({
      title: 'Item Updated!',
      description: 'timestamp: ' + dateToday(new Date()),
      action: (
        <ToastAction altText='Okay'>Okay</ToastAction>
      )
    })
    setIsLoading(false)
    router.refresh()
  }

  return (
    <div className='flex gap-4'>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button className="lg:text-lg h-8 rounded-2xl py-5 hover:bg-blue-600" disabled={isLoading} size='responsive'>
            Edit
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Item</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Edit Package
          </AlertDialogDescription>
          <div className='space-y-4'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleEdit)}
                className='space-y-6'
                >
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='name'>Name of the item:</FormLabel>
                      <FormControl>
                        <Input id='name' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='details'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='quantity'>Details:</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='amount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='amount'>Amount:</FormLabel>
                      <FormControl>
                        <Input
                          id='amount'
                          {...field}
                          type="number"
                          onChange={(e) => field.onChange(parseInt(e.target.value, 10))} // Convert to number
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button>Save</Button>
              </form>
            </Form>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="lg:text-lg h-8 rounded-2xl py-5 hover:bg-red-600" disabled={isLoading} size='responsive'>
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteInventory} disabled={isLoading} className='bg-red-600'>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}