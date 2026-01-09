import { UserDBType } from '@/types'
import mongoose from 'mongoose'
const { Schema, model, models, Document } = mongoose

export interface IUser extends UserDBType, Document {
  _id: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    require: true,
    default: 'user',
  },
  image: {
    type: String,
  },
  emailverified: {
    default: 'true',
    type: Boolean,
  },
})

const User = models.User || model<IUser>('User', UserSchema)

export default User
