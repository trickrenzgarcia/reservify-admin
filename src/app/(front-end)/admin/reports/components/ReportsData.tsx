'use client';

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ReactDOMServer from 'react-dom/server';
import SalesReport from './SalesReport';
import ReservationsReport from './ReservationsReport';
import InventoryReport from './InventoryReport';
import PaymentsReport from './PaymentsReport';
import { Payment } from '../../payments/data/payment';

type Props = {
  payments: Payment[]
}

export default function ReportsData({ payments }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  // Function to print Sales Report
  const handlePrint = () => {
    // Render SalesReport component to an HTML string
    const reportContent = ReactDOMServer.renderToString(<SalesReport payments={payments} />);

    // Open a new print window and write the HTML content
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Sales Report</title>
            <style>
              /* Include any custom styles you want for printing */
              body { font-family: Arial, sans-serif; padding: 20px; }
            </style>
          </head>
          <body>
            ${reportContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className='w-full flex flex-col gap-10'>
      <div>
        <SearchBar onSearch={(query) => setSearchQuery(query)} />
      </div>
      <div className='flex flex-col gap-8'>
        <div className='flex justify-evenly'>
          <div className='w-1/2'>
            <h2 className='text-center text-lg font-semibold'>Sales Report</h2>
          </div>
          <div className='w-1/2 flex gap-4'>
            <Dialog>
              <DialogTrigger asChild>
                <Button className='lg:px-10 rounded-full' type='button'>VIEW</Button>
              </DialogTrigger>
              <DialogContent id='sales-report'>
                <SalesReport payments={payments} />
              </DialogContent>
            </Dialog>
            <Button className='lg:px-10 rounded-full' onClick={handlePrint} type='button'>PRINT</Button>
          </div>
        </div>
        {/* Add other report sections like Reservations, Inventory, and Payments here */}
      </div>
    </div>
  );
}