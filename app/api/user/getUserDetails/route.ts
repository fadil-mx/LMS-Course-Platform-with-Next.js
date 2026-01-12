import { ConnectDB } from '@/lib/db'
import User from '@/lib/db/models/User'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    await ConnectDB()
    const userdata = await User.find()
    return NextResponse.json({ data: userdata, success: true }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to fetch user details', success: false },
      { status: 500 }
    )
  }
}
