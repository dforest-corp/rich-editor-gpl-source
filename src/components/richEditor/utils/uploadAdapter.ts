import type ClassicEditor from 'ckeditor5-custom-build/build/ckeditor'

/** @package */
type Loader = {
  get file(): Promise<File | null>
}

class UploadAdapter {
  loader: Loader

  constructor(loader: Loader) {
    this.loader = loader
  }

  async upload() {
    const file = await this.loader.file
    if (!file) {
      throw new Error('ファイルが選択されていません。')
    }
    if (file.size > 1024 * 10240) {
      throw new Error(
        'ファイルサイズが10MBを超えています。ファイルを小さくして再度アップロードしてください。'
      )
    }

    try {
      const cookies = document.cookie.split('; ')
      const cookie = cookies.find((_) => _.startsWith('XSRF-TOKEN')) || ''
      const xsrfToken = decodeURIComponent(cookie.split('=')[1])
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(route('console.editorImage.upload'), {
        method: 'POST',
        headers: {
          'X-XSRF-TOKEN': xsrfToken,
        },
        body: formData,
        credentials: 'same-origin',
      })
      const data = (await response.json()) as { url: string }

      return {
        default: data.url,
      }
    } catch (error) {
      console.error(error)
      throw new Error('ファイルのアップロードに失敗しました。')
    }
  }
}

export default function UploadAdapterPlugin(editor: unknown) {
  ;(editor as ClassicEditor).plugins.get('FileRepository').createUploadAdapter = (
    loader: Loader
  ) => {
    return new UploadAdapter(loader)
  }
}
