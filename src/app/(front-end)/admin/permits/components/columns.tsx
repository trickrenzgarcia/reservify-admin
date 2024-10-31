"use client"

import { ColumnDef } from "@tanstack/react-table"

import { labels, priorities, statuses } from "../data/data"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Permit } from '@/lib/firebase/types'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export const columns: ColumnDef<Permit>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const permit = row.original;

      return (
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <span className="max-w-[500px] truncate font-medium hover:text-blue-600 hover:cursor-pointer">
                {row.getValue("name")}
              </span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Details</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="flex gap-2">
                <span className="font-bold">Name:</span>
                <span>{permit.name}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Amount:</span>
                <span>{permit.amount}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Expired at: </span>
                <span>{permit.expiredAt}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Updated at: </span>
                <span>{permit.updatedAt}</span>
              </div>
              <DialogClose>Close</DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      )
    },
  },
  {
    accessorKey: "expiredAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expiration" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex w-[100px] items-center">
          {row.getValue("expiredAt")}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex w-[100px] items-center">
          {row.getValue("amount")}
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