import { useState } from 'react'
import { book } from './data'
import type { AppMode, BookmarkId } from './types'
import { ClosedBook } from './components/ClosedBook'
import { OpenBook } from './components/OpenBook'
import { ChapterSpread } from './components/ChapterSpread'
import { PointSpread } from './components/PointSpread'
import { LineageSpread } from './components/LineageSpread'

export default function App() {
  const [mode, setMode] = useState<AppMode>('closed')
  const [bookmark, setBookmark] = useState<BookmarkId>('chapters')
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [pointIndex, setPointIndex] = useState(0)

  function openBook() {
    if (mode !== 'closed') return
    setMode('closing-out')
    window.setTimeout(() => {
      setBookmark('chapters')
      setMode('open')
    }, 400)
  }

  function closeBook() {
    setMode('closed')
  }

  return (
    <div className={`stage${mode !== 'closed' ? ' is-open' : ''}`}>
      {mode !== 'open' ? (
        <ClosedBook dissolving={mode === 'closing-out'} onOpen={openBook} />
      ) : (
        <OpenBook bookmark={bookmark} onBookmark={setBookmark} onClose={closeBook}>
          {bookmark === 'chapters' ? (
            <ChapterSpread
              phase={book.phases[phaseIndex]}
              index={phaseIndex}
              total={book.phases.length}
              onPrev={() => setPhaseIndex((i) => Math.max(0, i - 1))}
              onNext={() =>
                setPhaseIndex((i) => Math.min(book.phases.length - 1, i + 1))
              }
            />
          ) : null}
          {bookmark === 'points' ? (
            <PointSpread
              point={book.points[pointIndex]}
              index={pointIndex}
              total={book.points.length}
              onPrev={() => setPointIndex((i) => Math.max(0, i - 1))}
              onNext={() =>
                setPointIndex((i) => Math.min(book.points.length - 1, i + 1))
              }
            />
          ) : null}
          {bookmark === 'lineage' ? <LineageSpread /> : null}
        </OpenBook>
      )}
      {mode === 'closed' ? (
        <p className="stage-tagline">{book.tagline}</p>
      ) : null}
    </div>
  )
}
