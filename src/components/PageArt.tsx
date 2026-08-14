import { resolveArt } from '../services/artStorage'

interface PageArtProps {
  image: string | null | undefined
  title: string
  prompt: string
}

export function PageArt({ image, title, prompt }: PageArtProps) {
  const src = resolveArt(image)

  return (
    <div className="page-art">
      <div className="page-art__frame">
        {src ? (
          <img src={src} alt={title} decoding="async" />
        ) : (
          <div className="page-art__placeholder">
            <strong>{title}</strong>
            {prompt}
          </div>
        )}
      </div>
    </div>
  )
}
