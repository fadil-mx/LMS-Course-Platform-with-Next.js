import mongoose from 'mongoose'
let isconnected = false

export async function ConnectDB() {
  if (!process.env.MONGODB_URL) {
    console.log('mongodb url error')
    return
  }
  if (isconnected) {
    console.log('connected to existing db')
    return
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    isconnected = true
    console.log('new db connection ')
  } catch (error) {
    console.log(error)
  }
}
