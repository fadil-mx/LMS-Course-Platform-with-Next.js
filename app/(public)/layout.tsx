import { Metadata } from 'next'
import React from 'react'
import { Toaster } from '@/components/ui/sonner'
import NavBar from '@/components/shared/navBar'

export const metadata: Metadata = {
  title: 'Auth Layout',
  description: 'Authentication Layout',
}

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className='tracking-wide flex flex-col'>
        <NavBar />
        <main className='container mx-auto'>{children}</main>
      </div>
      <Toaster position='top-right' expand={false} richColors />{' '}
    </div>
  )
}

export default layout
