"use client"

import { ColumnDef } from "@tanstack/react-table"

import { labels, priorities, statuses } from "../data/data"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Package } from '@/lib/firebase/types'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export const columns: ColumnDef<Package>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const pack = row.original;

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
                <span>{pack.name}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Price:</span>
                <span>{pack.price}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Start Time: </span>
                <span>{pack.startTime} {pack.startCycle}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">End Time: </span>
                <span>{pack.endTime} {pack.endCycle}</span>
              </div>
              <DialogClose>Close</DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex w-[100px] items-center">
          {row.getValue("price")}
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