import { book } from '../data'
import type { Phase } from '../types'
import { PageArt } from './PageArt'

interface ChapterSpreadProps {
  phase: Phase
  index: number
  total: number
  onPrev: () => void
  onNext: () => void
}

export function ChapterSpread({
  phase,
  index,
  total,
  onPrev,
  onNext,
}: ChapterSpreadProps) {
  return (
    <>
      <section className="page page--left">
        <PageArt
          image={phase.image}
          title={phase.titleLocal}
          prompt={phase.imagePrompt}
        />
      </section>
      <section className="page page--right">
        <p className="page-kicker">
          {book.motif.primaryViewTitle} · CHAPTER {phase.phase}
        </p>
        <h2 className="page-title">{phase.titleLocal}</h2>
        <p className="page-title-en">{phase.title}</p>
        <p className="page-summary">{phase.summary}</p>
        {phase.quote ? <blockquote className="page-quote">{phase.quote}</blockquote> : null}
        <div className="page-nav">
          <button
            type="button"
            className="ghost-btn"
            disabled={index <= 0}
            onClick={onPrev}
          >
            {book.motif.prevLabel}
          </button>
          <button
            type="button"
            className="ghost-btn primary"
            disabled={index >= total - 1}
            onClick={onNext}
          >
            {book.motif.nextLabel}
          </button>
        </div>
      </section>
    </>
  )
}
