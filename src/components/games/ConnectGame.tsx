import { useMemo, useState } from 'react'
import type { ConnectPair } from '../../types'

interface ConnectGameProps {
  pairs: ConnectPair[]
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function ConnectGame({ pairs }: ConnectGameProps) {
  const lefts = useMemo(() => pairs.map((p) => p.left), [pairs])
  const rights = useMemo(() => shuffle(pairs.map((p) => p.right)), [pairs])
  const answer = useMemo(() => {
    const map = new Map<string, string>()
    for (const p of pairs) map.set(p.left, p.right)
    return map
  }, [pairs])

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [matched, setMatched] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('点选左侧象征，再点右侧含义。')

  function pickLeft(left: string) {
    if (matched[left]) return
    setSelectedLeft(left)
    setMessage(`已选「${left}」——请连接含义`)
  }

  function pickRight(right: string) {
    if (!selectedLeft) {
      setMessage('请先选择左侧象征')
      return
    }
    if (Object.values(matched).includes(right)) return
    if (answer.get(selectedLeft) === right) {
      setMatched((m) => ({ ...m, [selectedLeft]: right }))
      setMessage(`相连：${selectedLeft} ↔ ${right}`)
      setSelectedLeft(null)
    } else {
      setMessage('这两枚符号并不对应')
    }
  }

  const done = lefts.every((l) => matched[l])

  return (
    <div className="game-panel">
      <p className="game-prompt">将象征与其含义连成一线。</p>
      <div className="connect-board">
        <div className="connect-col">
          {lefts.map((left) => (
            <button
              key={left}
              type="button"
              className={`connect-item${selectedLeft === left ? ' is-selected' : ''}${
                matched[left] ? ' is-matched' : ''
              }`}
              onClick={() => pickLeft(left)}
            >
              {left}
            </button>
          ))}
        </div>
        <div className="connect-col">
          {rights.map((right) => (
            <button
              key={right}
              type="button"
              className={`connect-item${
                Object.values(matched).includes(right) ? ' is-matched' : ''
              }`}
              onClick={() => pickRight(right)}
            >
              {right}
            </button>
          ))}
        </div>
      </div>
      <div className="game-status">
        {done ? '圣杯语法已经展开。' : message}
      </div>
    </div>
  )
}
