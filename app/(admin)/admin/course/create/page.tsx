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
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
import { categoriesList, levelsList, statusList } from '@/lib/data'
import { RichTextEditor } from '@/components/shared/richEditor'
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
      level: 'Beginner',
      category: 'Development',
      smallDescription: '',
      status: 'Draft',
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
              <form onSubmit={form.handleSubmit(onSubmit)} id='form-rhf-demo'>
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
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                        />

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
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <Controller
                      name='category'
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor='form-category'>
                            Category
                          </FieldLabel>
                          <Select
                            value={field.value.toString()}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className=''>
                              <SelectValue placeholder='Theme'>
                                {field.value}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {categoriesList.map((category, index) => (
                                  <SelectItem key={index} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />{' '}
                    <Controller
                      name='level'
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor='form-level'>Level</FieldLabel>
                          <Select
                            value={field.value.toString()}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className='w-52'>
                              <SelectValue placeholder='Level'>
                                {field.value}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {levelsList.map((level, index) => (
                                  <SelectItem key={index} value={level}>
                                    {level}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <Controller
                      name='duration'
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor='form-duration'>
                            Duration (in hours)
                          </FieldLabel>
                          <Input
                            {...field}
                            id='form-duration'
                            aria-invalid={fieldState.invalid}
                            placeholder='duration in hours'
                            autoComplete='off'
                            type='number'
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name='price'
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor='form-price'>
                            Price ($)
                          </FieldLabel>
                          <Input
                            {...field}
                            id='form-price'
                            aria-invalid={fieldState.invalid}
                            placeholder='price in USD'
                            autoComplete='off'
                            type='number'
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                  <Controller
                    name='status'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor='form-status'>Status</FieldLabel>
                        <Select
                          value={field.value.toString()}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className=''>
                            <SelectValue placeholder='Status'>
                              {field.value}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {statusList.map((category, index) => (
                                <SelectItem key={index} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />{' '}
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
                  Create Course
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
