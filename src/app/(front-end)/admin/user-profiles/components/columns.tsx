"use client"

import { ColumnDef } from "@tanstack/react-table"

import { labels, priorities, statuses } from "../data/data"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { User } from '@/lib/firebase/types'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <span className="max-w-[500px] truncate font-medium hover:text-blue-600 hover:cursor-pointer">
                {user.name ? user.name : `${user.firstname} ${user.lastname}` }
              </span>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>User Details</DialogTitle>
              <div className="flex flex-col space-y-2">
                <span className="font-bold">ID</span>
                <span>{user.id}</span>
                <span className="font-bold">Name</span>
                <span>{user.name ? user.name : `${user.firstname} ${user.lastname}`}</span>
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
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex w-[100px] items-center">
          <span>CLIENT</span>
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