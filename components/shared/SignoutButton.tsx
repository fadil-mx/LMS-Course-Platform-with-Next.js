'use client'
import { SignOut } from '@/lib/actions/user'
import React from 'react'
import { Button } from '../ui/button'

const SignoutButton = () => {
  return (
    <div>
      {' '}
      <p
        onClick={() => {
          SignOut()
        }}
      >
        signout
      </p>
    </div>
  )
}

export default SignoutButton
