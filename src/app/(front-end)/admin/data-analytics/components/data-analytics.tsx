'use client'

import React from 'react'
import BarChartComponent from './bar-chart'
import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { WebVisitorsChart } from './web-visitors';
import { PackageChartComponent } from './package-chart';

export default function DataAnalytics() {
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
        <div className='col-span-12 lg:col-span-5'>
          <h1></h1>
        </div>
        <div className='col-span-12 lg:col-span-7'>
          <BarChartComponent />
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
