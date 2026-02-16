import React from 'react'
import { ModeToggle } from '../buttons/darkmode-button'
import { auth } from '@/auth'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Book, Home, LayoutDashboardIcon, LogOut } from 'lucide-react'
import SignoutButton from './SignoutButton'

const NavBar = async () => {
  const items = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Courses',
      href: '/course',
    },
    {
      name: 'Dashboard',
      href: '/dashboard',
    },
  ]
  const session = await auth()
  return (
    <div className='sticky top-0 z-50 border-b bg-background/95 w-full flex items-center justify-between container mx-auto py-4 max-lg:px-4 shadow-md'>
      <h1 className='lg:text-3xl text-2xl font-bold'>Edunexis</h1>
      <div className=''>
        <nav className='flex items-center gap-6 max-md:hidden'>
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className='text-lg font-medium hover:text-primary transition-colors hover:underline'
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className='flex items-center gap-4'>
        <ModeToggle />
        {!session ? (
          <Link
            href='/signin'
            className={cn(
              buttonVariants({
                variant: 'default',
              }),
            )}
          >
            Login
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={cn(
                    session.user?.image ?? 'https://github.com/shadcn.png',
                  )}
                  alt='@shadcn'
                />
                <AvatarFallback>
                  {session.user.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-40 lg:w-48' align='end'>
              <DropdownMenuLabel className='flex min-w-0 flex-col'>
                <span className=' truncate text-foreground text-sm font-medium'>
                  {session?.user.name}
                </span>
                <span className=' text-muted-foreground text-xs truncate'>
                  {' '}
                  {session?.user.email}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link href='/' className='flex gap-2'>
                    <Home className='mr-2 h-4 w-4' />
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href='/courses' className='flex gap-2'>
                    <Book className='mr-2 h-4 w-4' />
                    Courses
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href='/dashboard' className='flex gap-2'>
                    <LayoutDashboardIcon className='mr-2 h-4 w-4' />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className='mr-2 h-4 w-4' />
                <SignoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}

export default NavBar
