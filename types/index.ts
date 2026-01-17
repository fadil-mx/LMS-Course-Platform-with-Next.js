import {
  signinValidator,
  signupValidator,
  UserDBValidator,
} from '@/lib/validator'
import { LucideIcon } from 'lucide-react'
import z from 'zod'

export type signinValidatorType = z.infer<typeof signinValidator>
export type signupValidatorType = z.infer<typeof signupValidator>
export type UserDBType = z.infer<typeof UserDBValidator>

export type Feature = {
  title: string
  description: string
  icon: LucideIcon
}[]
