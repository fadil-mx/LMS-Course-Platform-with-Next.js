import { LoginForm } from './login-form'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

type Props = { searchParams: Promise<{ callback: string }> }

const page = async ({ searchParams }: Props) => {
  const searchparams = await searchParams
  const { callback = '/' } = searchparams
  const session = await auth()
  if (session) {
    return redirect(callback)
  }
  return (
    <div className=' bg-muted dark:bg-black  flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <LoginForm />
      </div>
    </div>
  )
}

export default page
