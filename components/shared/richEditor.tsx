'use client'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'

const lowlight = createLowlight(common)
import { Button } from '@/components/ui/button'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Code2,
  Link as LinkIcon,
  ImageIcon,
  Strikethrough,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo2,
  Redo2,
} from 'lucide-react'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  value: string
  onChange: (value: string) => void
}

export function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        codeBlock: false, // Disable default, use enhanced version
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline hover:text-blue-700',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'bg-slate-900 text-white p-4 rounded-lg overflow-x-auto',
        },
      }),
    ],
    content: value || '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert max-w-none min-h-[300px] p-4 focus:outline-none prose-h1:text-3xl prose-h1:font-bold prose-h1:my-4 prose-h2:text-2xl prose-h2:font-bold prose-h2:my-3 prose-h3:text-xl prose-h3:font-semibold prose-h3:my-2 prose-p:my-2 prose-p:leading-7 prose-ul:list-disc prose-ul:ml-6 prose-ul:my-3 prose-ol:list-decimal prose-ol:ml-6 prose-ol:my-3 prose-li:my-1 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-3 prose-code:bg-slate-200 dark:prose-code:bg-slate-700 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-slate-900 prose-pre:text-white prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-img:rounded-lg prose-img:my-4',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '')
    }
  }, [value, editor])

  if (!editor) return null

  const handleAddLink = () => {
    const url = prompt('Enter URL:')
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    }
  }

  const handleAddImage = () => {
    const url = prompt('Enter image URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <div className='border rounded-lg overflow-hidden'>
      {/* Main Toolbar */}
      <div className='flex flex-wrap gap-1 p-2 border-b bg-muted'>
        {/* Text Formatting */}
        <div className='flex gap-1'>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            title='Bold (Ctrl+B)'
          >
            <Bold size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            title='Italic (Ctrl+I)'
          >
            <Italic size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive('underline')}
            title='Underline (Ctrl+U)'
          >
            <UnderlineIcon size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive('strike')}
            title='Strikethrough'
          >
            <Strikethrough size={18} />
          </ToolbarButton>
        </div>

        {/* Divider */}
        <div className='w-px bg-slate-300 dark:bg-slate-600' />

        {/* Headings */}
        <div className='flex gap-1'>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            active={editor.isActive('heading', { level: 1 })}
            title='Heading 1'
          >
            <Heading1 size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive('heading', { level: 2 })}
            title='Heading 2'
          >
            <Heading2 size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            active={editor.isActive('heading', { level: 3 })}
            title='Heading 3'
          >
            <Heading3 size={18} />
          </ToolbarButton>
        </div>

        {/* Divider */}
        <div className='w-px bg-slate-300 dark:bg-slate-600' />

        {/* Lists */}
        <div className='flex gap-1'>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            title='Bullet List'
          >
            <List size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            title='Numbered List'
          >
            <ListOrdered size={18} />
          </ToolbarButton>
        </div>

        {/* Divider */}
        <div className='w-px bg-slate-300 dark:bg-slate-600' />

        {/* Alignment */}
        <div className='flex gap-1'>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            active={editor.isActive({ textAlign: 'left' })}
            title='Align Left'
          >
            <AlignLeft size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            active={editor.isActive({ textAlign: 'center' })}
            title='Align Center'
          >
            <AlignCenter size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            active={editor.isActive({ textAlign: 'right' })}
            title='Align Right'
          >
            <AlignRight size={18} />
          </ToolbarButton>
        </div>

        {/* Divider */}
        <div className='w-px bg-slate-300 dark:bg-slate-600' />

        {/* Block Elements */}
        <div className='flex gap-1'>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
            title='Blockquote'
          >
            <Quote size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive('codeBlock')}
            title='Code Block'
          >
            <Code2 size={18} />
          </ToolbarButton>
        </div>

        {/* Divider */}
        <div className='w-px bg-slate-300 dark:bg-slate-600' />

        {/* Media */}
        <div className='flex gap-1'>
          <ToolbarButton onClick={handleAddLink} title='Add Link'>
            <LinkIcon size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={handleAddImage} title='Add Image'>
            <ImageIcon size={18} />
          </ToolbarButton>
        </div>

        {/* Divider */}
        <div className='w-px bg-slate-300 dark:bg-slate-600' />

        {/* Undo/Redo */}
        <div className='flex gap-1'>
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title='Undo'
          >
            <Undo2 size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title='Redo'
          >
            <Redo2 size={18} />
          </ToolbarButton>
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  )
}

interface ToolbarButtonProps {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  children: React.ReactNode
  title?: string
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  children,
  title,
}: ToolbarButtonProps) {
  return (
    <Button
      type='button'
      size='sm'
      variant={active ? 'default' : 'outline'}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        'h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-700',
        active && 'bg-blue-500 text-white hover:bg-blue-600',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
    >
      {children}
    </Button>
  )
}
