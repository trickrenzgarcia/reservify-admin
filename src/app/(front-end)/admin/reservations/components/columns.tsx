"use client"

import { ColumnDef } from "@tanstack/react-table"

import { labels, priorities, statuses } from "../data/data"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Reserve } from '@/lib/firebase/types'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export const columns: ColumnDef<Reserve>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const reserve = row.original;

      return (
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <span className="max-w-[500px] truncate font-medium hover:text-blue-600 hover:cursor-pointer">
                {row.original.bookingData.email}
              </span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reservation Details</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="flex gap-2">
                <span className="font-bold">BookingID:</span>
                <span>{reserve.bookingData.bookingId}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Email:</span>
                <span>{reserve.bookingData.email}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Package: </span>
                <span>{reserve.packageData.name}</span>
              </div>
              <div className="flex gap-2 ml-4">
                <span className="font-bold">Amenities: </span>
                <span>{reserve.customPackageData.amenities.map((v, i) => (
                  <p key={v+i}>{v}</p>
                ))}</span>
              </div>
              <div className="flex gap-2 ml-4">
                <span className="font-bold">Equipments: </span>
                <span>{reserve.customPackageData.equipment.map((v, i) => (
                  <p key={v+i}>{v}</p>
                ))}</span>
              </div>
              <div className="flex gap-2 ml-4">
                <span className="font-bold">Chairs: </span>
                <span>{reserve.customPackageData.chairs}</span>
              </div>
              <div className="flex gap-2 ml-4">
                <span className="font-bold">Tables: </span>
                <span>{reserve.customPackageData.tables}</span>
              </div>
              
              <div className="flex gap-2">
                <span className="font-bold">Time: </span>
                <span>{`${reserve.packageData.startTime} ${reserve.packageData.startCycle} - ${reserve.packageData.endTime} ${reserve.packageData.endCycle}`}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Payment Method: </span>
                <span>{`${reserve.paymentMethod} (${reserve.paymentStatus})`}</span>
              </div>
              <DialogClose>Close</DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      )
    },
  },
  {
    accessorKey: "packageName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Package" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex w-[100px] items-center">
          {row.original.packageData.name}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "packagePrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pricing" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex w-[100px] items-center">
          {row.original.packageData.price}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "packageTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex w-[100px] items-center">
          {row.original.packageData.startTime} {row.original.packageData.startCycle} to {row.original.packageData.endTime} {row.original.packageData.endCycle}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex w-[100px] items-center">
          {row.original.paymentStatus}
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