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


interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter(); 
  const inventory = inventorySchema.parse(row.original)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [inventoryDetails, setInventoryDetails] = React.useState({
    name: inventory.name,
    quantity: inventory.quantity,
    amount: inventory.amount
  })

  async function handleDeleteInventory() {
    setIsLoading(true)
    //await deleteInventory(inventory.id)
    setIsLoading(false)
    router.refresh();
  }

  async function handleEditInventory() {
    if(inventoryDetails.name === inventory.name) return;

    setIsLoading(true)
    // await editInventory(inventory.id, {
    //   name: inventoryDetails.name,
    //   quantity: inventoryDetails.quantity,
    //   amount: inventoryDetails.amount
    // })
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
            <AlertDialogTitle>Edit User</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Edit user details
          </AlertDialogDescription>
          <div className='space-y-4'>
            <section>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' value={inventory.name} onChange={(e) => setInventoryDetails({...inventoryDetails, name: e.target.value})} />
            </section>
            <section>
              <Label htmlFor='quantity'>Quantity</Label>
              <Input id='quantity' type='number' value={inventory.quantity} onChange={(e) => setInventoryDetails({...inventoryDetails, quantity: parseInt(e.target.value)})} />
            </section>
            <section>
              <Label htmlFor='amount'>Amount</Label>
              <Input id='amount' type='number' value={inventory.amount} onChange={(e) => setInventoryDetails({...inventoryDetails, amount: parseFloat(e.target.value)})} />
            </section> 
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleEditInventory} disabled={isLoading} className='bg-blue-600'>Save</AlertDialogAction>
          </AlertDialogFooter>
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