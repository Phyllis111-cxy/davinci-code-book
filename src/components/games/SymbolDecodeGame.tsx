import { useMemo, useState } from 'react'
import type { SymbolDecodeGame as SymbolDecodeGameData } from '../../types'
import { SketchGrailBoard, SketchSymbolIcon } from '../sketch/SketchGrailBoard'

const ICON_KIND: Record<
  string,
  'rose' | 'knights' | 'vitruvian' | 'cryptex' | 'chalice'
> = {
  rose: 'rose',
  knights: 'knights',
  vitruvian: 'vitruvian',
  cryptex: 'cryptex',
  chalice: 'chalice',
}

interface SymbolDecodeGameProps {
  game: SymbolDecodeGameData
  title: string
  summary: string
  label: string
  index: number
  total: number
  onPrev: () => void
  onNext: () => void
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function SymbolDecodeGame({
  game,
  title,
  summary,
  label,
  index,
  total,
  onPrev,
  onNext,
}: SymbolDecodeGameProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [solved, setSolved] = useState<Record<string, string>>({})
  const [message, setMessage] = useState(
    game.prompt ?? '先点左页符号察看线索，再在右页选出正解。',
  )

  const optionMap = useMemo(() => {
    const map: Record<string, string[]> = {}
    for (const s of game.symbols) {
      map[s.id] = shuffle(s.options)
    }
    return map
  }, [game.symbols])

  const active = game.symbols.find((s) => s.id === activeId)
  const done = game.symbols.every((s) => solved[s.id])
  const progress = `${Object.keys(solved).length}/${game.symbols.length}`

  function choose(option: string) {
    if (!active || solved[active.id]) return
    if (option === active.answer) {
      const next = { ...solved, [active.id]: option }
      setSolved(next)
      if (game.symbols.every((s) => next[s.id])) {
        setMessage(game.unlockText ?? '符号语法已展开。')
      } else {
        setMessage(`「${active.name}」解读正确。继续点选左页。`)
        const nextSym = game.symbols.find((s) => !next[s.id])
        setActiveId(nextSym?.id ?? null)
      }
    } else {
      setMessage(`不对——再读一遍左页线索：${active.clue}`)
    }
  }

  function reset() {
    setActiveId(null)
    setSolved({})
    setMessage(game.prompt ?? '先点左页符号察看线索，再在右页选出正解。')
  }

  return (
    <>
      <section className="page page--left page--cipher">
        <div className="cipher-board symbol-board">
          <p className="cipher-board__eyebrow">GRAIL GRAMMAR · 草图页</p>

          <SketchGrailBoard className="symbol-sketch" />

          {game.symbols.map((sym) => {
            const isSolved = Boolean(solved[sym.id])
            const isActive = activeId === sym.id
            const kind = ICON_KIND[sym.id] ?? 'rose'
            return (
              <button
                key={sym.id}
                type="button"
                className={`symbol-node ink-chip${isActive ? ' is-active' : ''}${
                  isSolved ? ' is-solved' : ''
                }`}
                style={{ left: `${sym.x}%`, top: `${sym.y}%` }}
                onClick={() => {
                  setActiveId(sym.id)
                  setMessage(
                    isSolved
                      ? `已解读：${sym.name} → ${solved[sym.id]}`
                      : `线索：${sym.clue}`,
                  )
                }}
              >
                <SketchSymbolIcon kind={kind} className="symbol-node__sketch" />
                <span className="symbol-node__name">{sym.name}</span>
              </button>
            )
          })}

          <p className="cipher-board__hint">
            {game.hint ?? '点选图中符号，右侧会出现三种可能解读——对照线索选择。'}
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
              <p className="game-prompt">左页察看 · 右页裁定</p>
              <span className="game-progress">{progress}</span>
            </div>

            {active ? (
              <div className="symbol-decode">
                <p className="symbol-decode__focus">
                  当前符号：<strong>{active.name}</strong>
                </p>
                <p className="symbol-decode__clue">{active.clue}</p>
                {solved[active.id] ? (
                  <p className="symbol-decode__done">
                    已裁定 → {solved[active.id]}
                  </p>
                ) : (
                  <div className="symbol-options">
                    {optionMap[active.id]?.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className="label-chip"
                        onClick={() => choose(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="symbol-decode__idle">请先在左页点选一枚符号。</p>
            )}

            <ul className="symbol-ledger">
              {game.symbols.map((s) => (
                <li key={s.id} className={solved[s.id] ? 'is-done' : ''}>
                  <span>{s.glyph}</span>
                  <span>{s.name}</span>
                  <span>{solved[s.id] ?? '…'}</span>
                </li>
              ))}
            </ul>

            <div className={`fib-unlock${done ? ' is-open' : ''}`}>
              {done ? (
                <>
                  <p className="fib-unlock__label">解密结果</p>
                  <p className="fib-unlock__keyword">{game.keyword}</p>
                  <p className="fib-unlock__text">
                    {game.unlockText ?? '圣杯语法已经展开。'}
                  </p>
                </>
              ) : (
                <p className="fib-unlock__locked">五枚符号裁定前，关键词保持封印</p>
              )}
            </div>

            <p className="game-status">{message}</p>
            <button type="button" className="ghost-btn" onClick={reset}>
              重置解密
            </button>
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
