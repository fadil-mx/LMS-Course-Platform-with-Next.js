import React from 'react'
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/sideBar/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from '@/components/ui/sonner'
import { AppSidebar } from '@/components/sideBar/app-sidebar'

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
      <SessionProvider>
        <SidebarProvider
          style={
            {
              '--sidebar-width': 'calc(var(--spacing) * 72)',
              '--header-height': 'calc(var(--spacing) * 12)',
            } as React.CSSProperties
          }
        >
          <AppSidebar variant='inset' />
          <SidebarInset>
            <SiteHeader />
            <main>
              {children}
              <Toaster />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </SessionProvider>
    </div>
  )
}
