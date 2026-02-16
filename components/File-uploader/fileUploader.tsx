'use client'
import React, { useCallback } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { Card } from '../ui/card'
import { cn } from '@/lib/utils'
import { ErrorUploading, RenderState } from './renderState'
import { toast } from 'sonner'

const FileUploader = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles)
  }, [])

  function handlerejection(fileRejections: FileRejection[]) {
    if (fileRejections.length) {
      const tooManyFiles = fileRejections.find(
        (rejection) => rejection.errors[0].code === 'too-many-files',
      )

      const fileTooLarge = fileRejections.find(
        (rejection) => rejection.errors[0].code === 'file-too-large',
      )

      if (fileTooLarge) {
        toast.warning('File is too large. Maximum size is 5MB.')
      }

      if (tooManyFiles) {
        toast.warning('Too many files. Only one file is allowed.')
      }
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 1,
    multiple: false,
    onDropRejected: handlerejection,
  })

  return (
    <Card
      {...getRootProps()}
      className={cn(
        'border-dashed border-2 border-gray-300 rounded-md p-4  cursor-pointer w-full h-66 flex items-center justify-center transition-colors ease-in-out duration-300',
        isDragActive ? 'border-blue-500 bg-blue-500/20' : 'border-gray-300',
      )}
    >
      <input {...getInputProps()} />
      {/* <RenderState isDragActive={isDragActive} /> */}
      <ErrorUploading />
    </Card>
  )
}

export default FileUploader
