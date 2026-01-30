import React from 'react'
import type { Metadata } from 'next'

import { SessionProvider } from 'next-auth/react'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard layout for managing the application.',
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className=''>
      <main>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </main>
    </div>
  )
}
