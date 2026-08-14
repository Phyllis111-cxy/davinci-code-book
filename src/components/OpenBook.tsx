import type { ReactNode } from 'react'
import { book } from '../data'
import type { BookmarkId } from '../types'

interface OpenBookProps {
  bookmark: BookmarkId
  onBookmark: (id: BookmarkId) => void
  onClose: () => void
  children: ReactNode
}

const BOOKMARKS: { id: BookmarkId; depth: 'front' | 'mid' | 'back'; label: string }[] = [
  { id: 'chapters', depth: 'front', label: book.motif.bookmarkChapters },
  { id: 'points', depth: 'mid', label: book.motif.bookmarkPoints },
  { id: 'lineage', depth: 'back', label: book.motif.bookmarkLineage },
]

export function OpenBook({ bookmark, onBookmark, onClose, children }: OpenBookProps) {
  return (
    <div className="open-book-shell">
      {/* Visual ribbons — painted under the parchment lip */}
      <div className="bookmarks" aria-hidden="true">
        {BOOKMARKS.map((b) => (
          <span
            key={b.id}
            className={`bookmark ${b.depth}${bookmark === b.id ? ' is-active' : ''}`}
          >
            {b.label}
          </span>
        ))}
      </div>

      {/* Hit targets only on the peek above the page lip */}
      <div className="bookmark-hits" role="tablist" aria-label="书签">
        {BOOKMARKS.map((b) => (
          <button
            key={b.id}
            type="button"
            role="tab"
            aria-selected={bookmark === b.id}
            className={`bookmark-hit ${b.depth}`}
            onClick={() => onBookmark(b.id)}
          >
            {b.label}
          </button>
        ))}
      </div>

      <button type="button" className="close-btn" onClick={onClose}>
        {book.motif.closeLabel}
      </button>
      <div className="open-spread">{children}</div>
    </div>
  )
}
