'use client'

import React from 'react'
import BarChartComponent from './bar-chart'
import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { WebVisitorsChart } from './web-visitors';
import { PackageChartComponent } from './package-chart';
import { Payment } from '../../payments/data/payment';
import { calculatePaymentsSummary } from '../calculator';

export default function DataAnalytics({ payments }: { payments: Payment[] }) {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const targetMonth = new Date().toLocaleString("default", { month: "short" });
  const { chartData, totalAmount, totalFee, totalNetAmount, paidPaymentsCount } = calculatePaymentsSummary(payments, targetMonth);
  const chartRef = React.useRef<HTMLDivElement>(null)
  
  async function handleDownloadPDF() {
    const data = chartRef.current
    if(!data) return;
    try {
      const canvas = await html2canvas(data)
      const imgData = canvas.toDataURL("image/png")

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4"
      })

      const width = pdf.internal.pageSize.getWidth()
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 15, 15, width, height);
      pdf.save("chart.pdf")
    } catch (error) {

    }
  }

  return (
    <div>
      <div className='pb-4'>
        <Button onClick={handleDownloadPDF} className='bg-[#558134] text-lg px-6 py-5 rounded-full'>Download PDF</Button>
      </div>
      <div ref={chartRef} className='grid grid-cols-1 lg:grid-cols-12  gap-4'>
        <div className='col-span-12 lg:col-span-12 mb-10'>
          <h1 className='text-3xl font-bold'>BoardMart&apos;s Event Place</h1>
          <h2 className='text-lg'>Date: {new Date().toLocaleDateString('en-PH')}</h2>
        </div>
        <div className='col-span-12 lg:col-span-5 p-4 flex flex-col gap-4'>
          <h1 className='text-3xl font-bold text-orange-600'>Total Sales for {currentMonth}</h1>
          <div className='flex justify-between w-3/4'>
            <h2>Sales</h2>
            <p>{totalAmount}</p>
          </div>
          <div className='flex justify-between w-3/4'>
            <h2>Taxes</h2>
            <p>{totalFee}</p>
          </div>
          <div className='h-1 bg-gray-200 w-3/4' />
          <div className='flex justify-between w-3/4'>
            <h2>Net Sales</h2>
            <p>{totalNetAmount}</p>
          </div>
        </div>
        <div className='col-span-12 lg:col-span-7'>
          <BarChartComponent payments={payments}/>
        </div>
        <div className='col-span-12 lg:col-span-5'>
          <WebVisitorsChart />
        </div>
        <div className='col-span-12 lg:col-span-7'>
          <PackageChartComponent />
        </div>
      </div>
    </div>
  )
}
