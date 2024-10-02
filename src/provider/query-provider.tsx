'use client'

import { QueryClient, QueryClientProvider as QueryProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'

export default function QueryClientProvider(
  { children }: Readonly<{ children: React.ReactNode }>
) {
  const queryClient = new QueryClient()
  return (
    <QueryProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryProvider>
  )
}