import React from 'react'
import Signupform from './signup-form'

const page = () => {
  return (
    <div className=' bg-muted dark:bg-black flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='max-w-sm w-full'>
        <Signupform />
      </div>
    </div>
  )
}

export default page
