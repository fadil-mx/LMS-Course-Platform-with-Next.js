import { Metadata } from 'next'
import React from 'react'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Auth Layout',
  description: 'Authentication Layout',
}

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className='tracking-wide'>{children}</main>
      <Toaster position='top-right' expand={false} richColors />{' '}
    </div>
  )
}

export default layout
