"use client"

import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { userSchema } from '../data/schema'
import { _editDoc, deleteUser } from '@/lib/firebase/service'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { dateToday } from '@/lib/utils'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'


interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter(); 
  const user = userSchema.parse(row.original)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [userDetails, setUserDetails] = React.useState({
    name: user.name ? user.name : `${user.firstname} ${user.lastname}`,
    email: user.email,
  })
  const { toast } = useToast()

  async function handleDeleteUser() {
    setIsLoading(true)
    await deleteUser(user.id)
    setIsLoading(false)
    router.refresh();
  }

  async function handleEditUser() {
    if(userDetails.name === user.name) return;

    setIsLoading(true)
    await _editDoc("users", user.id, {
      name: userDetails.name,
      email: userDetails.email,
    })
    toast({
      title: "Updated!",
      description: "timestamp: " + dateToday(new Date()),
      action: <ToastAction altText="Okay">Okay</ToastAction>,
    });
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
              <Input id='name' value={userDetails.name} onChange={(e) => setUserDetails({...userDetails, name: e.target.value})} />
            </section>
            <section>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' value={userDetails.email} onChange={(e) => setUserDetails({...userDetails, email: e.target.value})} disabled />
            </section> 
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleEditUser} disabled={isLoading} className='bg-blue-600'>Save</AlertDialogAction>
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
            <AlertDialogAction onClick={handleDeleteUser} disabled={isLoading} className='bg-red-600'>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}