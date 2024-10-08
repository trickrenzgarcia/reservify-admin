"use client"

import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { inventorySchema } from '../data/schema'
//import { deleteInventory, editInventory } from '@/lib/firebase/service'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { _editDoc } from '@/lib/firebase/service'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter(); 
  const inventory = inventorySchema.parse(row.original)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)


  const form = useForm<z.infer<typeof inventorySchema>>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      name: inventory.name,
      quantity: inventory.quantity,
      amount: inventory.amount
    }
  });

  async function handleDeleteInventory() {
    setIsLoading(true)
    //await deleteInventory(inventory.id)
    setIsLoading(false)
    router.refresh();
  }

  async function handleEditInventory(values: z.infer<typeof inventorySchema>) {
    setIsLoading(true)
    // await _editDoc("inventory", inventory.id, {
    //   name: inventoryDetails.name,
    //   quantity: inventoryDetails.quantity,
    //   amount: inventoryDetails.amount
    // })
    console.log("Values: ", values)
    setIsLoading(false)
    router.refresh();
  }

  return (
    <div className='flex gap-4'>
      <AlertDialog>
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
            Edit user details
          </AlertDialogDescription>
          <div className='space-y-4'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleEditInventory)}>

                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='quantity'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          {...field}
                          type="number"
                          onChange={(e) => field.onChange(parseInt(e.target.value, 10))} // Convert to number
                        />
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
                      <FormControl>
                        <Input 
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