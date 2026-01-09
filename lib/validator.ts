import z from 'zod'

export const signinValidator = z.object({
  email: z.email().min(1, 'email is  required'),
  password: z.string().min(4, 'password must be at least 4 characters'),
})

export const signupValidator = signinValidator
  .extend({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters long')
      .max(50, 'Name must be at most 50 characters long'),
    confirmPassword: z
      .string()
      .min(4, 'confirm password must be at least 4 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwords do not match',
    path: ['confirmPassword'],
  })

export const UserDBValidator = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must be at most 50 characters long'),
  email: z.email().min(1, 'email is  required'),
  password: z.string().min(4, 'password must be at least 4 characters'),
  role: z.string().default('user'),
  image: z.string().optional(),
  emailverified: z.boolean().default(true).optional(),
})
