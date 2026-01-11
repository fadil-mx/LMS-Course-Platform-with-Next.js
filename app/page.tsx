import { auth } from '@/auth'
import { ModeToggle } from '@/components/buttons/darkmode-button'
import SignoutButton from '@/components/shared/SignoutButton'
import { SignOut } from '@/lib/actions/user'
import React from 'react'

const page = async () => {
  const session = await auth()
  return (
    <div className=''>
      <h1 className='text-3xl font-bold'>This AAA uses Bold (700)</h1>
      <p className='text-lg font-medium'>This uses Regular (400)</p>
      <p className='text-lg font-semibold'>This uses Bold (700) too!</p>
      <p> {session?.user.email}</p>
      <p> {session?.user.name}</p>
      <SignoutButton />
      <ModeToggle />
    </div>
  )
}

export default page
