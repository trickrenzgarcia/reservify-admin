import DataTable from '@/components/Interface/DataTable';
import Sidebar from '@/components/Layout/Sidebar'
import { getCollection } from '@/lib/firebase/service';
import React from 'react'
import { columns } from './components/columns';
import { Inventory, Venue } from '@/lib/firebase/types';
import ViewVenue from './components/view-venue';

export default async function VenueAndInventory() {
  const inventory = await getCollection<Inventory>("inventory");
  const venues = await getCollection<Venue>("venues");

  return (
    <div className="min-h-[calc(100vh-94px)] flex w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Content area takes the remaining space */}
      <div className="flex-1 overflow-x-auto p-4 lg:px-10">
        <ViewVenue inventory={inventory} venues={venues} />
        <DataTable data={inventory} columns={columns} />
      </div>
    </div>
  )
}
