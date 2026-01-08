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
import { Eye, EyeOff, Github, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { signinValidatorType, signupValidatorType } from '@/types'
import { signupValidator } from '@/lib/validator'
import { FieldDescription, FieldSeparator } from '@/components/ui/field'
import Link from 'next/link'

const Signupform = () => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const form = useForm<signupValidatorType>({
    resolver: zodResolver(signupValidator),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(values: signinValidatorType) {
    console.log(values)
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
