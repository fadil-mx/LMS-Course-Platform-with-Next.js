'use server'

import { signinValidatorType, signupValidatorType } from '@/types'
import { ConnectDB } from '../db'
import { signupValidator } from '../validators/signvalidator'
import User from '../db/models/User'
import bcrypt from 'bcryptjs'
import { formatError } from '../utils'
import { signIn, signOut } from '@/auth'
import { redirect } from 'next/navigation'

export const createUser = async (userdata: signupValidatorType) => {
  try {
    await ConnectDB()
    const parseuser = await signupValidator.parseAsync(userdata)
    await User.create({
      ...parseuser,
      password: await bcrypt.hash(parseuser.password, 10),
    })
    return {
      success: true,
      message: 'signup successful',
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
      error: error,
    }
  }
}

export const signinWithCredentials = async (userdata: signinValidatorType) => {
  try {
    await signIn('credentials', {
      redirect: false,
      ...userdata,
    })
  } catch (error) {
    console.log(error)
    throw new Error('Invalid email or password')
  }
}

export async function SignOut() {
  const redirectTO = await signOut({ redirect: false })
  redirect(redirectTO.redirect)
}
