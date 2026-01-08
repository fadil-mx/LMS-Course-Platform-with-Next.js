'use client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Field, FieldDescription, FieldSeparator } from '@/components/ui/field'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signinValidatorType } from '@/types'
import { signinValidator } from '@/lib/validator'
import { useState } from 'react'
import { Eye, EyeOff, Github, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const form = useForm<signinValidatorType>({
    resolver: zodResolver(signinValidator),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: signinValidatorType) {
    console.log(values)
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='relative'>
        <button
          className='absolute top-7 left-5.5 cursor-pointer'
          onClick={() => router.push('/')}
        >
          <X className='h-5 w-5 ' />{' '}
        </button>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Welcome back</CardTitle>
          <CardDescription>
            Login with your Github or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field>
            <Button variant='outline' type='button'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                <path
                  d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                  fill='currentColor'
                />
              </svg>
              Login with Google
            </Button>
          </Field>
          <FieldSeparator className='*:data-[slot=field-separator-content]:bg-card m-5'>
            Or continue with
          </FieldSeparator>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=''>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='name@example.com' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder='••••••••'
                          className='pr-10'
                          {...field}
                        />
                        <Button
                          type='button'
                          variant='ghost'
                          size='sm'
                          className='absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 p-0 hover:bg-transparent'
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className='h-4 w-4' />
                          ) : (
                            <Eye className='h-4 w-4' />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='w-full' type='submit'>
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <FieldDescription className='px-6 text-center'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{' '}
        and <a href='#'>Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
