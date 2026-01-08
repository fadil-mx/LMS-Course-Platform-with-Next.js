import z from 'zod'

export const signinValidator = z.object({
  email: z.email().min(1, 'email is  required'),
  password: z.string().min(4, 'password must be at least 4 characters'),
})
