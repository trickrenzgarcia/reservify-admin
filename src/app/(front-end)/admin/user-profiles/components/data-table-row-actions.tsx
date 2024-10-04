"use client"

import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { userSchema } from '../data/schema'
import { deleteUser } from '@/lib/firebase/service'
import { useRouter } from 'next/navigation'


interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter(); 
  const user = userSchema.parse(row.original)

  async function handleDeleteUser() {
    await deleteUser(user.id)
    console.log('Deleting user:', user.id)
    router.refresh();
  }

  return (
    <div className='flex gap-4'>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="lg:text-lg h-8 rounded-2xl py-5 hover:bg-blue-600" size='responsive'>
            Edit
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="lg:text-lg h-8 rounded-2xl py-5 hover:bg-red-600" size='responsive'>
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
            <AlertDialogAction onClick={handleDeleteUser} className='bg-red-600'>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}