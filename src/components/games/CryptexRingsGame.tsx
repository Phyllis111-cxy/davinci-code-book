import { useMemo, useState } from 'react'
import type { CryptexRingsGame as CryptexRingsGameData } from '../../types'
import { resolveArt } from '../../services/artStorage'

interface CryptexRingsGameProps {
  game: CryptexRingsGameData
  title: string
  summary: string
  label: string
  index: number
  total: number
  onPrev: () => void
  onNext: () => void
}

export function CryptexRingsGame({
  game,
  title,
  summary,
  label,
  index,
  total,
  onPrev,
  onNext,
}: CryptexRingsGameProps) {
  const initial = useMemo(
    () => game.rings.map((r) => Math.max(0, r.glyphs.indexOf(r.glyphs[0] ?? ''))),
    [game.rings],
  )
  const [indices, setIndices] = useState<number[]>(initial)
  const [unlocked, setUnlocked] = useState(false)
  const [message, setMessage] = useState(
    game.prompt ?? '转动左页环面，对照线索拼出密语。',
  )

  const reading = game.rings.map((r, i) => r.glyphs[indices[i] ?? 0] ?? '').join('')
  const progress = `${game.rings.filter((r, i) => r.glyphs[indices[i] ?? 0] === r.answer).length}/${game.rings.length}`

  function turn(ringIndex: number, dir: 1 | -1) {
    if (unlocked) return
    setIndices((prev) => {
      const next = [...prev]
      const len = game.rings[ringIndex].glyphs.length
      next[ringIndex] = (next[ringIndex] + dir + len) % len
      return next
    })
    setMessage('环面已转动——四环对齐后点「尝试开启」。')
  }

  function tryOpen() {
    const ok = game.rings.every((r, i) => r.glyphs[indices[i] ?? 0] === r.answer)
    if (ok) {
      setUnlocked(true)
      setMessage(game.unlockText ?? '密码筒开启。')
    } else {
      setMessage('咬合失败。酸液未触发——但密语仍不对。再对照线索。')
    }
  }

  function reset() {
    setIndices(game.rings.map(() => 0))
    setUnlocked(false)
    setMessage(game.prompt ?? '转动左页环面，对照线索拼出密语。')
  }

  return (
    <>
      <section className="page page--left page--cipher">
        <div className="cipher-board cryptex-board">
          <p className="cipher-board__eyebrow">CRYPTEX · 双层筒</p>
          <div className="cryptex-stage">
            <div className="cryptex-fit">
              <img
                className="cryptex-fit__art"
                src={resolveArt('/art/cryptex-rings.webp') ?? ''}
                alt=""
              />
              <div className="cryptex-rings" aria-label="密码筒">
                {game.rings.map((ring, i) => {
                  const glyph = ring.glyphs[indices[i] ?? 0]
                  const aligned = glyph === ring.answer
                  return (
                    <div key={ring.id} className="cryptex-ring-col">
                      <button
                        type="button"
                        className="cryptex-turn ink-chip"
                        aria-label={`${ring.id} 上转`}
                        disabled={unlocked}
                        onClick={() => turn(i, -1)}
                      >
                        ▴
                      </button>
                      <button
                        type="button"
                        className={`cryptex-face${
                          aligned && unlocked ? ' is-open' : ''
                        }`}
                        disabled={unlocked}
                        onClick={() => turn(i, 1)}
                      >
                        {glyph}
                      </button>
                      <button
                        type="button"
                        className="cryptex-turn ink-chip"
                        aria-label={`${ring.id} 下转`}
                        disabled={unlocked}
                        onClick={() => turn(i, 1)}
                      >
                        ▾
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <p className="cipher-board__hint">
            {game.hint ?? '每一环点上下箭头转动；密语与上一局封印相呼应。'}
          </p>
        </div>
      </section>

      <section className="page page--right page--play">
        <div className="play-scroll">
          <p className="page-kicker">{label}</p>
          <h2 className="page-title">{title}</h2>
          <p className="page-summary page-summary--tight">{summary}</p>

          <div className="game-panel">
            <div className="game-panel__head">
              <p className="game-prompt">左页转环 · 右页核验</p>
              <span className="game-progress">{progress}</span>
            </div>

            <p className="cryptex-reading">
              当前密语：<strong>{reading || '····'}</strong>
            </p>

            <ol className="cryptex-clues">
              {game.rings.map((r, i) => (
                <li key={r.id}>
                  <span>第 {i + 1} 环</span>
                  <span>{r.clue}</span>
                </li>
              ))}
            </ol>

            <div className="cryptex-actions">
              <button
                type="button"
                className="ghost-btn primary"
                disabled={unlocked}
                onClick={tryOpen}
              >
                尝试开启
              </button>
              <button type="button" className="ghost-btn" onClick={reset}>
                重置解密
              </button>
            </div>

            <div className={`fib-unlock${unlocked ? ' is-open' : ''}`}>
              {unlocked ? (
                <>
                  <p className="fib-unlock__label">解密结果</p>
                  <p className="fib-unlock__keyword">{game.keyword}</p>
                  <p className="fib-unlock__text">
                    {game.unlockText ?? '密码筒开启。'}
                  </p>
                </>
              ) : (
                <p className="fib-unlock__locked">四环对齐前，筒芯保持封印</p>
              )}
            </div>

            <p className="game-status">{message}</p>
          </div>
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
