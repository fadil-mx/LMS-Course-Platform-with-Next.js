'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { CourseType } from '@/types'
import { courseValidator } from '@/lib/validators/courseValidator'

import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'
import slugify from 'slugify'
const page = () => {
  const form = useForm<CourseType>({
    resolver: zodResolver(courseValidator),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      filekey: '',
      price: 0,
      duration: 1,
      level: 'beginner',
      category: 'health-fitness',
      smallDescription: '',
      status: 'draft',
      published: false,
    },
  })

  const onSubmit = (data: CourseType) => {
    // Do something with the form values.
    console.log(data)
  }

  const generateSlug = () => {
    const data = form.getValues('title')
    const slug = slugify(data, { lower: true })
    form.setValue('slug', slug)
  }
  return (
    <div className='flex flex-col flex-1'>
      <div className='  flex  flex-1 flex-col gap-2 py-4 lg:pt-6  md:gap-6  px-5 '>
        <div className='flex gap-4 '>
          <Link href='/admin/course'>
            <ArrowLeft
              className={cn(buttonVariants({ variant: 'outline' }))}
              height={40}
              width={40}
            />
          </Link>
          <h1 className='text-2xl font-bold'>Create Course</h1>
        </div>
        <div className='flex-1  '>
          <Card className='w-full '>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                provide the basic information about the course.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Controller
                    name='title'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor='form-title'>Title</FieldLabel>
                        <Input
                          {...field}
                          id='form-title'
                          aria-invalid={fieldState.invalid}
                          placeholder='Enter course title'
                          autoComplete='off'
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <div className=' flex gap-4 '>
                    <Controller
                      name='slug'
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor='form-slug'>Slug</FieldLabel>
                          <Input
                            {...field}
                            id='form-slug'
                            aria-invalid={fieldState.invalid}
                            placeholder='Enter course slug'
                            autoComplete='off'
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Button
                      type='button'
                      className=' mt-8 '
                      onClick={generateSlug}
                    >
                      Generate Slug
                    </Button>
                  </div>
                  <Controller
                    name='smallDescription'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor='form-rhf-demo-smallDescription'>
                          Small Description
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            {...field}
                            id='form-rhf-demo-smallDescription'
                            placeholder='describe your course in brief.'
                            rows={6}
                            className='h-18 max-h-26  resize-none'
                            aria-invalid={fieldState.invalid}
                          />
                          <InputGroupAddon align='block-end'>
                            <InputGroupText className='tabular-nums'>
                              {field.value.length}/200 characters
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name='description'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor='form-rhf-demo-description'>
                          Description
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            {...field}
                            id='form-rhf-demo-description'
                            placeholder='Describe your course in detail.'
                            rows={6}
                            className='h-18 max-h-26  resize-none'
                            aria-invalid={fieldState.invalid}
                          />
                          <InputGroupAddon align='block-end'>
                            <InputGroupText className='tabular-nums'>
                              {field.value.length}/500 characters
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name='filekey'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor='form-filekey'>File Key</FieldLabel>
                        <Input
                          {...field}
                          id='form-filekey'
                          aria-invalid={fieldState.invalid}
                          placeholder='thumbnail url'
                          autoComplete='off'
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </form>
            </CardContent>
            <CardFooter>
              <Field orientation='horizontal'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
                <Button type='submit' form='form-rhf-demo'>
                  Submit
                </Button>
              </Field>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default page
