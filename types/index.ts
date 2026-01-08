import { signinValidator, signupValidator } from '@/lib/validator'
import z from 'zod'

export type signinValidatorType = z.infer<typeof signinValidator>
export type signupValidatorType = z.infer<typeof signupValidator>
