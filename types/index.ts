import { courseValidator } from '@/lib/validators/courseValidator'
import {
  signinValidator,
  signupValidator,
  UserDBValidator,
} from '@/lib/validators/signvalidator'
import { LucideIcon } from 'lucide-react'
import z from 'zod'

export type signinValidatorType = z.infer<typeof signinValidator>
export type signupValidatorType = z.infer<typeof signupValidator>
export type UserDBType = z.infer<typeof UserDBValidator>
export type CourseType = z.infer<typeof courseValidator>

export type Feature = {
  title: string
  description: string
  icon: LucideIcon
}[]
