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
      <div ref={chartRef} className='grid grid-cols-1 lg:grid-cols-2  gap-4'>
        <div className='col-span-1 lg:col-span-2 mb-10'>
          <h1 className='text-3xl font-bold'>BoardMart&apos;s Event Place</h1>
          <h2 className='text-lg'>Date: {new Date().toLocaleDateString('en-PH')}</h2>
        </div>
        <BarChartComponent />
        <WebVisitorsChart />
        <PackageChartComponent />
      </div>
      <Button onClick={handleDownloadPDF}>Download PDF</Button>
    </div>
  )
}