import { useEffect, useId, useState } from 'react'
import { clearUploadedArt, resolveArt, setUploadedArt } from '../services/artStorage'

interface PageArtProps {
  artId: string
  image: string | null | undefined
  title: string
  prompt: string
}

export function PageArt({ artId, image, title, prompt }: PageArtProps) {
  const inputId = useId()
  const [src, setSrc] = useState<string | null>(() => resolveArt(artId, image))

  useEffect(() => {
    setSrc(resolveArt(artId, image))
  }, [artId, image])

  function onFile(file: File | undefined) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = String(reader.result)
      setUploadedArt(artId, dataUrl)
      setSrc(dataUrl)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="page-art">
      <div className="page-art__frame">
        {src ? (
          <img src={src} alt={title} />
        ) : (
          <div className="page-art__placeholder">
            <strong>{title}</strong>
            {prompt}
          </div>
        )}
      </div>
      <label className="page-art__upload" htmlFor={inputId}>
        上传配图
        <input
          id={inputId}
          type="file"
          accept="image/*"
          onChange={(e) => onFile(e.target.files?.[0])}
        />
        {src ? (
          <button
            type="button"
            className="ghost-btn"
            onClick={() => {
              clearUploadedArt(artId)
              setSrc(image ?? null)
            }}
          >
            清除
          </button>
        ) : null}
      </label>
    </div>
  )
}
