'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'
import Dropcursor from '@tiptap/extension-dropcursor'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'  
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Strike from '@tiptap/extension-strike'

import useEditorStore from '@/store/use-editor-store'

import { FontSizeExtension } from '@/extensions/font-size';
import { LineHeightExtension } from '@/extensions/line-height';
import Ruler from './ruler';

// import { useLiveblocksExtension, FloatingToolbar } from "@liveblocks/react-tiptap";
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { Threads } from './threads';
import { useStorage } from '@liveblocks/react';
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from '@/constants/margins';

interface EditorProps {
  initialContent?: string | undefined
}

const Editor = ({ initialContent }: EditorProps) => {

  const leftMargin = useStorage((root) => root.leftMargin);
  const rightMargin = useStorage((root) => root.rightMargin);

  const liveblocks = useLiveblocksExtension({
    initialContent,
    offlineSupport_experimental: true // for removing the delay of loading initial content
  });

  const { setEditor } = useEditorStore();

  const editor = useEditor({
    immediatelyRender: false,

    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null)
    },
    onUpdate({ editor }) {
      setEditor(editor)
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor)
    },
    onTransaction({ editor }) {
      setEditor(editor)
    },
    onFocus({ editor }) {
      setEditor(editor)
    },
    onBlur({ editor }) {
      setEditor(editor)
    },
    onContentError({ editor }) {
      setEditor(editor)
    },
    editorProps: {
      attributes: {
        style: `padding-left:${leftMargin ?? LEFT_MARGIN_DEFAULT}px; padding-right:${rightMargin ?? RIGHT_MARGIN_DEFAULT}px;`,
        class: "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text"
      }
    },
    extensions: [
      // live
      liveblocks,
      StarterKit.configure({
        history: false
      }),
      Underline,
      Strike.extend({
        addKeyboardShortcuts() {
          return {
            'Alt-Shift-5': () => this.editor.commands.toggleStrike(),
          }
        },
      }),
      FontFamily,
      TextStyle,
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Table, TableHeader, TableCell, TableRow,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Image,
      ImageResize,
      Dropcursor,
      Color,
      Highlight.configure({
        multicolor: true
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https"
      }),
      // custom ext
      FontSizeExtension,
      LineHeightExtension.configure({
        types: ['heading', 'paragraph'],
        defaultLineHeight: "normal"
      }),

    ],
  });

  return (
    <div className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
      <Ruler />
      <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  )
}
export default Editor