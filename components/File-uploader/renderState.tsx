import { cn } from '@/lib/utils'
import { ImageOff, UploadCloudIcon } from 'lucide-react'

const RenderState = ({ isDragActive }: { isDragActive: boolean }) => {
  return (
    <div className='text-center'>
      <div className=''>
        <UploadCloudIcon
          className={cn(
            'mx-auto mb-4 h-12 w-12 text-gray-400 transition-colors ease-in-out duration-300',
            isDragActive ? 'text-primary' : '',
          )}
        />
        {isDragActive ? (
          <p className='text-md text-black'>Drop the files here ...</p>
        ) : (
          <p className='text-md text-gray-600'>
            DropYour files here, or{' '}
            <span className='text-primary font-bold  '>click to upload</span>
          </p>
        )}
      </div>
    </div>
  )
}

const ErrorUploading = () => {
  return (
    <div className='text-center'>
      <div className=''>
        <ImageOff
          className={cn(
            'mx-auto mb-4 h-12 w-12 text-gray-400 transition-colors ease-in-out duration-300',
          )}
        />
      </div>
      <h1 className='text-red-500 font-bold text-2xl'>Upload Failed</h1>
      <p className='text-sm'>something went wrong</p>
      <p className='mt-3 text-3xl text-muted-foreground'>
        Click or drag file to retry
      </p>
    </div>
  )
}

export { RenderState, ErrorUploading }
