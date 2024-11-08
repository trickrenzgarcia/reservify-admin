"use client"

import { ColumnDef } from "@tanstack/react-table"

import { labels, priorities, statuses } from "../data/data"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { User } from '@/lib/firebase/types'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "firstname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <span className="max-w-[500px] truncate font-medium hover:text-blue-600 hover:cursor-pointer">
                {user.firstname ? user.firstname : user.name.split(' ')[0]}
              </span>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>User Details</DialogTitle>
              <div className="flex flex-col space-y-2">
                <span className="font-bold">ID</span>
                <span>{user.id}</span>
                <span className="font-bold">Name</span>
                <span>{user.name ? user.name : `${user.firstname} ${user.lastname}`}</span>
                <span className="font-bold">Email</span>
                <span>{user.email}</span>
                {user.gender && (
                  <>
                    <span className="font-bold">Gender</span>
                    <span>{user.gender}</span>
                  </>
                )}
                {user.idType && (
                  <>
                    <span className="font-bold">ID Submitted</span>
                    <span>{user.idType}</span>
                  </>
                )}
                {user.phoneNumber && (
                  <>
                    <span className="font-bold">Phone Number</span>
                    <span>{user.phoneNumber}</span>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )
    },
  },
  {
    accessorKey: "lastname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    cell: ({ row }) => {
      const user = row.original;
      let name: string[];
      if(user.name) {
        name = user.name.split(' ')
      }  
      return (
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <span className="max-w-[500px] truncate font-medium hover:text-blue-600 hover:cursor-pointer">
                {user.lastname ? user.lastname : user.name.split(' ')[1]}
              </span>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>User Details</DialogTitle>
              <div className="flex flex-col space-y-2">
                <span className="font-bold">ID</span>
                <span>{user.id}</span>
                <span className="font-bold">Name</span>
                <span>{user.name ? user.name : `${user.firstname} ${user.lastname}`}</span>
                <span className="font-bold">Email</span>
                <span>{user.email}</span>
                {user.gender && (
                  <>
                    <span className="font-bold">Gender</span>
                    <span>{user.gender}</span>
                  </>
                )}
                {user.idType && (
                  <>
                    <span className="font-bold">ID Submitted</span>
                    <span>{user.idType}</span>
                  </>
                )}
                {user.phoneNumber && (
                  <>
                    <span className="font-bold">Phone Number</span>
                    <span>{user.phoneNumber}</span>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <span className="max-w-[500px] truncate font-medium hover:text-blue-600 hover:cursor-pointer">
                {user.email}
              </span>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>User Details</DialogTitle>
              <div className="flex flex-col space-y-2">
                <span className="font-bold">ID</span>
                <span>{user.id}</span>
                <span className="font-bold">Name</span>
                <span>{user.name ? user.name : `${user.firstname} ${user.lastname}`}</span>
                <span className="font-bold">Email</span>
                <span>{user.email}</span>
                {user.gender && (
                  <>
                    <span className="font-bold">Gender</span>
                    <span>{user.gender}</span>
                  </>
                )}
                {user.idType && (
                  <>
                    <span className="font-bold">ID Submitted</span>
                    <span>{user.idType}</span>
                  </>
                )}
                {user.phoneNumber && (
                  <>
                    <span className="font-bold">Phone Number</span>
                    <span>{user.phoneNumber}</span>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account Type" />
    ),
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex w-[100px] items-center">
          <Badge className={cn('text-sm font-medium', user.name ? 'bg-blue-500' : 'bg-orange-500')}>{`${user.name ? 'GOOGLE' : 'SYSTEM'}`}</Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]