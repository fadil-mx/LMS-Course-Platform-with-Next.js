import {
  signinValidator,
  signupValidator,
  UserDBValidator,
} from '@/lib/validator'
import z from 'zod'

export type signinValidatorType = z.infer<typeof signinValidator>
export type signupValidatorType = z.infer<typeof signupValidator>
export type UserDBType = z.infer<typeof UserDBValidator>
