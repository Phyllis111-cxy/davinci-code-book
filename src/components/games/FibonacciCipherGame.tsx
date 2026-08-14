import { useMemo, useState } from 'react'
import type { FibonacciSequenceGame } from '../../types'
import { SketchSpiral } from '../sketch/SketchSpiral'

/** 螺旋上固定锚点（百分比），数字打乱后填入 */
const SPIRAL_ANCHORS = [
  { x: 22, y: 70 },
  { x: 30, y: 48 },
  { x: 48, y: 32 },
  { x: 68, y: 28 },
  { x: 82, y: 42 },
  { x: 78, y: 62 },
  { x: 60, y: 76 },
  { x: 42, y: 72 },
]

interface FibonacciCipherGameProps {
  game: FibonacciSequenceGame
  title: string
  summary: string
  label: string
  index: number
  total: number
  onPrev: () => void
  onNext: () => void
}

export function FibonacciCipherGame({
  game,
  title,
  summary,
  label,
  index,
  total,
  onPrev,
  onNext,
}: FibonacciCipherGameProps) {
  const nodes = useMemo(
    () =>
      game.scrambled.map((value, i) => ({
        id: `${value}-${i}`,
        value,
        ...SPIRAL_ANCHORS[i % SPIRAL_ANCHORS.length],
      })),
    [game.scrambled],
  )

  const [collected, setCollected] = useState<number[]>([])
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set())
  const [shakeId, setShakeId] = useState<string | null>(null)
  const [message, setMessage] = useState(
    game.prompt ?? '按斐波那契数列，依次点选左页数字。',
  )

  const step = collected.length
  const expect = game.answer[step]
  const done = collected.length === game.answer.length
  const progress = `${collected.length}/${game.answer.length}`

  function pick(id: string, value: number) {
    if (done || usedIds.has(id)) return

    if (value === expect) {
      const next = [...collected, value]
      setCollected(next)
      setUsedIds(new Set([...usedIds, id]))
      if (next.length === game.answer.length) {
        setMessage(game.unlockText ?? '数列归位——封印打开。')
      } else {
        setMessage(`正确。下一项应是 ${game.answer[next.length]}`)
      }
    } else {
      setShakeId(id)
      setMessage(
        step === 0
          ? `不对。斐波那契从 ${game.answer[0]} 开始。`
          : `不对。前一项是 ${collected[collected.length - 1]}，下一项应为 ${expect}。`,
      )
      window.setTimeout(() => setShakeId(null), 420)
    }
  }

  function reset() {
    setCollected([])
    setUsedIds(new Set())
    setShakeId(null)
    setMessage(game.prompt ?? '按斐波那契数列，依次点选左页数字。')
  }

  return (
    <>
      <section className="page page--left page--cipher">
        <div className="cipher-board">
          <p className="cipher-board__eyebrow">LOUVRE CIPHER · 展厅地面</p>
          <SketchSpiral className="cipher-spiral" />

          {nodes.map((node) => {
            const used = usedIds.has(node.id)
            return (
              <button
                key={node.id}
                type="button"
                className={`cipher-node ink-chip${used ? ' is-used' : ''}${
                  shakeId === node.id ? ' is-shake' : ''
                }`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                disabled={used || done}
                onClick={() => pick(node.id, node.value)}
              >
                {node.value}
              </button>
            )
          })}

          <p className="cipher-board__hint">
            {game.hint ?? '数字被打乱写在螺旋上——按自然数列点选归位。'}
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
              <p className="game-prompt">左页点选 · 右页收束成序</p>
              <span className="game-progress">{progress}</span>
            </div>

            <div className="fib-slots" aria-label="已归位数列">
              {game.answer.map((n, i) => (
                <div
                  key={`${n}-${i}`}
                  className={`fib-slot${collected[i] != null ? ' is-filled' : ''}${
                    i === step && !done ? ' is-next' : ''
                  }`}
                >
                  {collected[i] ?? (i === step ? '?' : '·')}
                </div>
              ))}
            </div>

            <p className="fib-expect">
              {done ? (
                <>封印已开</>
              ) : (
                <>
                  下一项：<strong>{expect}</strong>
                  <span className="fib-expect__sub">（前两项之和）</span>
                </>
              )}
            </p>

            <div className={`fib-unlock${done ? ' is-open' : ''}`}>
              {done ? (
                <>
                  <p className="fib-unlock__label">解密结果</p>
                  <p className="fib-unlock__keyword">{game.keyword}</p>
                  <p className="fib-unlock__text">
                    {game.unlockText ?? '数列归位后，展厅讯息重新可读。'}
                  </p>
                </>
              ) : (
                <p className="fib-unlock__locked">归位完成前，关键词保持封印</p>
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
