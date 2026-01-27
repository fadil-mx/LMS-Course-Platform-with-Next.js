import React from 'react'
import { SessionProvider } from 'next-auth/react'

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className=''>
      <main>
        <SessionProvider>{children}</SessionProvider>
      </main>
    </div>
  )
}
