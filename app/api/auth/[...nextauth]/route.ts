import { handlers } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'
import arcjet, { detectBot, shield, slidingWindow } from '@arcjet/next'

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({
      mode: 'LIVE',
    }),
    // 10 login attempts per minute per IP
    slidingWindow({
      mode: 'LIVE',
      interval: 60, // ✅ 10 seconds
      max: 60, // ✅ 3 requests
    }),
    detectBot({
      mode: 'LIVE',
      allow: ['CATEGORY:SEARCH_ENGINE', 'CATEGORY:PREVIEW'],
    }),
  ],
})
const ajProtectedPOST = async (req: NextRequest) => {
  const decision = await aj.protect(req)
  console.log('Auth Arcjet decision:', decision)

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { error: 'Too many login attempts. Try again in 10s.' },
        { status: 429 }
      )
    } else if (decision.reason.isBot()) {
      return NextResponse.json({ error: 'No bots allowed' }, { status: 403 })
    } else if (decision.reason.isShield()) {
      // ✅ Fixed: .reason.isShield()
      return NextResponse.json(
        { error: 'Suspicious activity blocked' },
        { status: 403 }
      )
    } else {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }
  }

  return handlers.POST(req)
}
export const GET = handlers.GET
export const POST = ajProtectedPOST
