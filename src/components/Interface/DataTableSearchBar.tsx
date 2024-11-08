import { Input } from '@/components/ui/input'
import { Table } from "@tanstack/react-table"
import { Search } from "lucide-react"
import React from 'react'

interface DataTableSearchBarProps<TData> {
  table: Table<TData>;
}

export default function DataTableSearchBar<TData>({ table }: DataTableSearchBarProps<TData>) {
  return (
    <div className="relative w-[150px] lg:w-[250px]">
      <span className="absolute inset-y-0 left-1 flex items-center">
        <div className='bg-[#558134] p-1 rounded-full'>
          <Search className="w-5 h-5 text-white" /> 
        </div>
      </span>
      <Input
        placeholder="Search"
        value={table.getState().globalFilter ?? ""}
        onChange={(event) => table.setGlobalFilter(event.target.value)}
        className="h-10 pl-10 rounded-full focus-visible:ring-gray-400 bg-gray-100"
      />
    </div>
  );
}
