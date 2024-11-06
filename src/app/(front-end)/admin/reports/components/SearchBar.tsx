'use client'

import { Input } from '@/components/ui/input'
import { Search } from "lucide-react"
import React from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value)
  }

  return (
    <div className="relative w-full lg:w-[280px]">
      <span className="absolute inset-y-0 left-1 flex items-center">
        <div className='bg-[#558134] p-1 rounded-full'>
          <Search className="w-5 h-5 text-white" /> 
        </div>
      </span>
      <Input
        placeholder="Search"
        className="h-10 pl-10 rounded-full focus-visible:ring-gray-400 bg-gray-100"
        onChange={handleSearchChange}
      />
    </div>
  )
}