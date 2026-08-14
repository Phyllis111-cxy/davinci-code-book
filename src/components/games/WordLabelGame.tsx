import { useMemo, useState } from 'react'
import type { WordLabelItem } from '../../types'

const GLYPH: Record<string, string> = {
  spiral: 'φ',
  museum: '⌂',
  portrait: '◈',
  cylinder: '◎',
  chalice: '♛',
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface WordLabelGameProps {
  prompt?: string
  items: WordLabelItem[]
}

/**
 * 羊皮纸友好版 word-label：
 * 点选暗号格 → 再点下方词条贴上（不再用巨量字盘拼字）。
 */
export function WordLabelGame({ prompt, items }: WordLabelGameProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null)
  const [solved, setSolved] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('先点上方暗号，再点下方词条。')

  const bank = useMemo(() => shuffle(items.map((i) => i.answer)), [items])
  const used = new Set(Object.values(solved))
  const done = items.every((i) => solved[i.id])
  const progress = `${Object.keys(solved).length}/${items.length}`

  function assign(word: string) {
    if (!activeId || solved[activeId] || used.has(word)) return
    const target = items.find((i) => i.id === activeId)
    if (!target) return

    if (word === target.answer) {
      const nextSolved = { ...solved, [activeId]: word }
      setSolved(nextSolved)
      setMessage(`「${word}」贴合。`)
      const next = items.find((i) => !nextSolved[i.id])
      setActiveId(next?.id ?? activeId)
    } else {
      setMessage('词条与此暗号不合。')
    }
  }

  return (
    <div className="game-panel">
      <div className="game-panel__head">
        <p className="game-prompt">{prompt ?? '为暗号贴上正确的词'}</p>
        <span className="game-progress">{progress}</span>
      </div>

      <div className="word-grid" role="list">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="listitem"
            className={`glyph-card${activeId === item.id ? ' is-active' : ''}${
              solved[item.id] ? ' is-done' : ''
            }`}
            onClick={() => {
              if (!solved[item.id]) {
                setActiveId(item.id)
                setMessage('再从下方选一个词条。')
              }
            }}
          >
            <div className="glyph-card__icon">{GLYPH[item.glyph] ?? '※'}</div>
            <div className="glyph-card__label">
              {solved[item.id] ?? (activeId === item.id ? '…' : '？')}
            </div>
          </button>
        ))}
      </div>

      {!done ? (
        <div className="label-bank" role="group" aria-label="词条">
          {bank.map((word) => (
            <button
              key={word}
              type="button"
              className={`label-chip${used.has(word) ? ' is-used' : ''}`}
              disabled={used.has(word)}
              onClick={() => assign(word)}
            >
              {word}
            </button>
          ))}
        </div>
      ) : null}

      <p className="game-status">
        {done ? '数列与暗号全部对齐。' : message}
      </p>
    </div>
  )
}
