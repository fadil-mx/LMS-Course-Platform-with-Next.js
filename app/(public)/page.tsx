import { auth } from '@/auth'
import { ModeToggle } from '@/components/buttons/darkmode-button'
import SignoutButton from '@/components/shared/SignoutButton'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SignOut } from '@/lib/actions/user'
import { features } from '@/lib/data'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const session = await auth()
  return (
    <div className=''>
      <div className=' flex items-center flex-col gap-8 mt-20'>
        <Badge variant='outline' className='text-lg px-5'>
          {' '}
          The future of Online Education
        </Badge>
        <h1 className='text-4xl text-center md:text-5xl  lg:text-7xl font-bold tracking-tight '>
          Elevate Your Learning Experience
        </h1>
        <p className='  text-lg   md:text-2xl text-center max-w-4xl   text-foreground-muted'>
          Discover a world of knowledge at your fingertips with our cutting-edge
          online education platform.Access high-quality courses anytime ,
          anywhere.
        </p>
        <Link href='/course' className={cn(buttonVariants({ size: 'lg' }))}>
          {' '}
          Explore Courses
        </Link>
      </div>
      <div className='max-md:px-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-15'>
        {features.map((feature, index) => (
          <Card key={index} className='hover:shadow-lg transition-shadow '>
            <CardHeader className=' space-y-3'>
              <feature.icon className='h-8 w-8 text-primary' />

              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className='h-72'></div>
    </div>
  )
}

export default page
