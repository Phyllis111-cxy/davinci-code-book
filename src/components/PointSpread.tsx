import type { Point } from '../types'
import { PageArt } from './PageArt'
import { ConnectGame } from './games/ConnectGame'
import { CryptexRingsGame } from './games/CryptexRingsGame'
import { FibonacciCipherGame } from './games/FibonacciCipherGame'
import { SymbolDecodeGame } from './games/SymbolDecodeGame'
import { WordLabelGame } from './games/WordLabelGame'

interface PointSpreadProps {
  point: Point
  index: number
  total: number
  onPrev: () => void
  onNext: () => void
}

export function PointSpread({
  point,
  index,
  total,
  onPrev,
  onNext,
}: PointSpreadProps) {
  if (point.game?.type === 'fibonacci-sequence') {
    return (
      <FibonacciCipherGame
        game={point.game}
        title={point.title}
        summary={point.summary}
        label={point.label}
        index={index}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      />
    )
  }

  if (point.game?.type === 'symbol-decode') {
    return (
      <SymbolDecodeGame
        game={point.game}
        title={point.title}
        summary={point.summary}
        label={point.label}
        index={index}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      />
    )
  }

  if (point.game?.type === 'cryptex-rings') {
    return (
      <CryptexRingsGame
        game={point.game}
        title={point.title}
        summary={point.summary}
        label={point.label}
        index={index}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      />
    )
  }

  return (
    <>
      <section className="page page--left">
        <PageArt
          artId={point.id}
          image={point.image}
          title={point.title}
          prompt={point.imagePrompt}
        />
      </section>

      <section className="page page--right page--play">
        <div className="play-scroll">
          <p className="page-kicker">{point.label}</p>
          <h2 className="page-title">{point.title}</h2>
          <p className="page-summary page-summary--tight">{point.summary}</p>

          {point.game?.type === 'word-label' && point.game.items ? (
            <WordLabelGame prompt={point.game.prompt} items={point.game.items} />
          ) : null}
          {point.game?.type === 'connect' && point.game.pairs ? (
            <ConnectGame pairs={point.game.pairs} />
          ) : null}
          {!point.game ? (
            <p className="page-quote">此处仅供阅读，无小游戏。</p>
          ) : null}
        </div>

        <footer className="play-footer">
          <button
            type="button"
            className="ghost-btn"
            disabled={index <= 0}
            onClick={onPrev}
          >
            上一局
          </button>
          <button
            type="button"
            className="ghost-btn primary"
            disabled={index >= total - 1}
            onClick={onNext}
          >
            下一局
          </button>
        </footer>
      </section>
    </>
  )
}
