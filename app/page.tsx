import { ModeToggle } from '@/components/buttons/darkmode-button'
import React from 'react'

const page = () => {
  return (
    <div className=''>
      <h1 className='text-3xl font-bold'>This AAA uses Bold (700)</h1>
      <p className='text-lg font-medium'>This uses Regular (400)</p>
      <p className='text-lg font-semibold'>This uses Bold (700) too!</p>
      <ModeToggle />
    </div>
  )
}

export default page
