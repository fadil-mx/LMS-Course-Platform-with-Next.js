import z from 'zod'

export const courseValidator = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters long')
    .max(100, 'Title must be at most 100 characters long'),
  slug: z.string(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long')
    .max(1000, 'Description must be at most 1000 characters long'),
  filekey: z.string(),
  price: z.coerce.number().min(0, 'Price cannot be negative'),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
  level: z
    .enum(
      ['beginner', 'intermediate', 'advanced'],
      'Level must be one of: beginner, intermediate, advanced',
    )
    .default('beginner'),
  category: z.enum(
    [
      'development',
      'finance',
      'it & software',
      'design',
      'marketing',
      'business',
      'photography',
      'music',
      'personal-development',
      'health-fitness',
      'language-learning',
      'teaching',
      'other',
    ],
    'Category must be one of the predefined categories',
  ),
  smallDescription: z.string().min(200),
  status: z
    .enum(
      ['draft', 'published', 'archived'],
      'Status must be one of: draft, published, archived',
    )
    .default('draft'),
  published: z.boolean().default(false),
})
