'use client'
import { SignOut } from '@/lib/actions/user'

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
