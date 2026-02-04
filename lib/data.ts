import { Feature } from '@/types'
import { BookOpen, Lightbulb, Clock, Users } from 'lucide-react'

export const features: Feature = [
  {
    title: 'Comprehensive Course Library',
    description:
      'Explore a wide range of high-quality courses across tech, design, and business, curated by industry experts.',
    icon: BookOpen,
  },
  {
    title: 'Interactive Learning',
    description:
      'Learn faster with hands-on exercises, quizzes, and real-world projects designed for practical understanding.',
    icon: Lightbulb,
  },
  {
    title: 'Learn at Your Own Pace',
    description:
      'Access courses anytime with flexible schedules that fit your personal and professional commitments.',
    icon: Clock,
  },
  {
    title: 'Expert Mentors',
    description:
      'Get guidance from experienced professionals and industry leaders with real-world expertise.',
    icon: Users,
  },
]

export const categoriesList: string[] = [
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
]

export const levelsList: string[] = ['Beginner', 'Intermediate', 'Advanced']
export const statusList: string[] = ['Draft', 'Published', 'Archived']
