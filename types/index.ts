import { signinValidator } from '@/lib/validator'
import z from 'zod'

export type signinValidatorType = z.infer<typeof signinValidator>
