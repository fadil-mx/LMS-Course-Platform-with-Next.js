import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Auth Layout',
  description: 'Authentication Layout',
}

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className='tracking-wide'>{children}</main>
    </div>
  )
}

export default layout
