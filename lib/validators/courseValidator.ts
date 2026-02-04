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
      ['Beginner', 'Intermediate', 'Advanced'],
      'Level must be one of: Beginner, Intermediate, Advanced',
    )
    .default('Beginner'),
  category: z.enum(
    [
      'Development',
      'Finance',
      'IT & Software',
      'Design',
      'Marketing',
      'Business',
      'Photography',
      'Music',
      'Personal Development',
      'Health & Fitness',
      'Language Learning',
      'Teaching',
      'Lifestyle',
    ],
    'Category must be one of the predefined categories',
  ),
  smallDescription: z.string().min(100),
  status: z
    .enum(
      ['Draft', 'Published', 'Archived  '],
      'Status must be one of: draft, published, archived',
    )
    .default('Draft'),
  published: z.boolean().default(false),
})
