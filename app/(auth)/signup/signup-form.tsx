'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { signupValidatorType } from '@/types'
import { signupValidator } from '@/lib/validators/signvalidator'
import { FieldDescription, FieldSeparator } from '@/components/ui/field'
import Link from 'next/link'
import { createUser, signinWithCredentials } from '@/lib/actions/user'
import { toast } from 'sonner'

const Signupform = () => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const searchparam = useSearchParams()
  const callback = searchparam?.get('callback') || '/'

  const defaultValues =
    process.env.NODE_ENV === 'development'
      ? {
          name: 'Test User',
          email: 'test@gmail.com',
          password: 'test1234',
          confirmPassword: 'test1234',
        }
      : {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }

  const form = useForm<signupValidatorType>({
    resolver: zodResolver(signupValidator),
    defaultValues: defaultValues,
  })

  async function onSubmit(values: signupValidatorType) {
    try {
      const res = await createUser(values)
      if (!res.success) {
        console.log(res.error)
        toast.error(res.message)
        return
      }
      toast.success(res.message)
      await signinWithCredentials({
        email: values.email,
        password: values.password,
      })

      router.push(callback)
    } catch (error) {
      console.log(error)
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong',
      )
    }
  }

  return (
    <div className='   '>
      <Card className=' '>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=''>Full name</FormLabel>
                    <FormControl>
                      <Input placeholder='max' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    <FormDescription>
                      Must be at least 4 characters long.{' '}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
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
                    <FormDescription>
                      Please confirm your password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='w-full' type='submit'>
                Create Account
              </Button>
              <FieldSeparator className='*:data-[slot=field-separator-content]:bg-card   mb-5'>
                Or continue with
              </FieldSeparator>
              <Button className='w-full' variant='outline' type='submit'>
                Signup with google
              </Button>
              <FieldDescription className='px-6 text-center tracking-wide'>
                Already have an account? <Link href='/signin'>Sign in</Link>
              </FieldDescription>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Signupform
