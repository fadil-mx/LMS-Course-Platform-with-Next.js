import { CourseType } from '@/types'
import mongoose from 'mongoose'
const { Schema, Document, models, model } = mongoose

interface ICourse extends CourseType, Document {
  _id: string
  createdAt: Date
  updatedAt: Date
}

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    filekey: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    duration: { type: Number, required: true, min: 1 },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    category: { type: String, required: true },
    smallDescription: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    published: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

const Course = models.Course || model<ICourse>('Course', courseSchema)

export default Course
