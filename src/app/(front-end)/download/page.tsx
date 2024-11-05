"use client"

import Image from 'next/image'
import React from 'react'

export default function DownloadPage() {

  function handleDownloadAPK() {
    // Trigger download
    const link = document.createElement('a');
    link.href = '/Reservify.apk';
    link.download = 'Reservify.apk';
    link.click();
  }

  return (
    <div className='w-full flex justify-center items-center my-16'>
      <div className='cursor-pointer' onClick={handleDownloadAPK}>
        <Image src='/Android_Download.png' alt='' width={1117} height={527} />
      </div>
    </div>
  )
}
