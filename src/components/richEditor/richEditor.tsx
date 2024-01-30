/**
 * @licence GNU GPL v2+
 * This code contains the source code of CKEditor5 under the GNU GPL v2+ license.
 * Please refer to the following URL for the license of CKEditor5.
 * https://ckeditor.com/legal/ckeditor-oss-license
 */

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor'
import UploadAdapterPlugin from '@/components/richEditor/utils/uploadAdapter'
import { clsx } from 'clsx'
import { RichEditorProps } from '@/components/richEditor/types'
import '../../../css/ckEditor.css'

const sizes = {
  sm: 'rich-editor-sm',
  md: 'rich-editor-md',
  lg: 'rich-editor-lg',
}

export default function RichEditor({ value, onChange, size = 'md' }: RichEditorProps) {
  return (
    <div className={clsx('rich-editor', sizes[size])}>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
          language: 'ja',
          toolbar: [
            'heading',
            '|',
            'style',
            '|',
            'alignment',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'blockQuote',
            'imageUpload',
            'mediaEmbed',
            '|',
            'undo',
            'redo',
          ],
          style: {
            definitions: [
              {
                name: '見出し1上下ボーダー',
                element: 'h2',
                classes: ['border-y-2', 'border-app-primary', 'py-1'],
              },
              {
                name: '見出し2上下ボーダー',
                element: 'h3',
                classes: ['border-y-2', 'border-app-primary', 'py-1'],
              },
              {
                name: '見出し3上下ボーダー',
                element: 'h4',
                classes: ['border-y-2', 'border-app-primary', 'py-1'],
              },
            ],
          },
          link: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
          },
          image: {
            toolbar: [
              'imageTextAlternative',
              'toggleImageCaption',
              '|',
              'imageStyle:inline',
              'imageStyle:block',
              'imageStyle:side',
              '|',
              'linkImage',
            ],
          },
          alignment: {
            options: [
              {
                name: 'left',
                className: 'text-left',
              },
              {
                name: 'center',
                className: 'text-center',
              },
              {
                name: 'right',
                className: 'text-right',
              },
              {
                name: 'justify',
                className: 'text-justify',
              },
            ],
          },
          extraPlugins: [UploadAdapterPlugin],
        }}
        onChange={(_, editor) => {
          const data = editor.getData()
          onChange(data)
        }}
      />
    </div>
  )
}
