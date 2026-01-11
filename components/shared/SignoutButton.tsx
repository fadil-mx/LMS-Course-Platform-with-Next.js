'use client'
import { SignOut } from '@/lib/actions/user'
import React from 'react'
import { Button } from '../ui/button'

const SignoutButton = () => {
  return (
    <div>
      {' '}
      <Button
        onClick={() => {
          SignOut()
        }}
      >
        signout
      </Button>
    </div>
  )
}

export default SignoutButton
