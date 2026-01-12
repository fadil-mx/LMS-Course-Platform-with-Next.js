import { NextRequest, NextResponse } from 'next/server'
import authConfig from './auth.config'
import NextAuth from 'next-auth'
import arcjet, { detectBot, slidingWindow } from '@arcjet/next'

const { auth } = NextAuth(authConfig)

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

export default auth(async function middleware(req: NextRequest) {
  return NextResponse.next()
})
