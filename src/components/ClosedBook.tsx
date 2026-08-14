import { book } from '../data'
import { resolveArt } from '../services/artStorage'

interface ClosedBookProps {
  dissolving: boolean
  onOpen: () => void
}

export function ClosedBook({ dissolving, onOpen }: ClosedBookProps) {
  const coverSrc = resolveArt(book.cover.image)

  return (
    <div
      className="closed-book-float"
      role="button"
      tabIndex={0}
      aria-label="打开达芬奇密码"
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen()
        }
      }}
    >
      <div className={`closed-book${dissolving ? ' is-dissolving' : ''}`}>
        <span className="closed-book__spine" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </span>
        <span className="closed-book__pages" aria-hidden="true" />
        {coverSrc ? <img className="closed-book__art" src={coverSrc} alt="" /> : null}

        <div className="closed-book__plate">
          <p className="closed-book__eyebrow">Interactive Book</p>

          <div className="closed-book__titles">
            <h1 className="closed-book__title">{book.cover.title}</h1>
            <span className="closed-book__rule" aria-hidden="true" />
            <p className="closed-book__subtitle">{book.cover.subtitle}</p>
          </div>

          <p className="closed-book__author">{book.author}</p>
        </div>
      </div>
    </div>
  )
}
