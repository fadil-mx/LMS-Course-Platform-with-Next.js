import NextAuth, { DefaultSession } from 'next-auth'

import Google from 'next-auth/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

import authConfig from './auth.config'
import client from './lib/db/db'
import { ConnectDB } from './lib/db'
import User from './lib/db/models/User'

declare module 'next-auth' {
  interface Session {
    user: {
      role: string
    } & DefaultSession['user']
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  pages: {
    signIn: '/signin',
    newUser: '/signup',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: MongoDBAdapter(client),
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: 'email',
        },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        await ConnectDB()
        if (credentials == null) return null

        const user = await User.findOne({ email: credentials.email })

        if (user && user.password) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          )
          if (isMatch) {
            return {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
            }
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        if (!user.name) {
          await ConnectDB()
          await User.findByIdAndUpdate(user.id, {
            name: user.name || user.email?.split('@')[0],
            role: 'user',
          })
        }
        token.id = user.id
        token.role = (user as { role: string }).role
        token.name = user.name || user.email?.split('@')[0]
      }
      if (session?.user?.name && trigger === 'update') {
        token.name = session.user.name
      }
      return token
    },
    session({ session, user, token, trigger }) {
      session.user.id = token.sub as string
      session.user.role = token.role as string
      session.user.name = token.name
      if (trigger === 'update') {
        session.user.name = user.name
      }
      return session
    },
  },
})
