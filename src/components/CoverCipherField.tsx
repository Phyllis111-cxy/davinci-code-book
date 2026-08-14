import { useEffect, useRef } from 'react'

type Tone = 'key' | 'line' | 'quiet'

const PHRASES: { text: string; tone: Tone }[] = [
  { text: '圣杯不在杯中', tone: 'key' },
  { text: '玫瑰之下', tone: 'key' },
  { text: '符号之下，另有圣杯', tone: 'key' },
  { text: '卢浮宫之夜', tone: 'line' },
  { text: '馆长写下最后的坐标', tone: 'line' },
  { text: '乱序本身就是锁', tone: 'line' },
  { text: '斐波那契', tone: 'key' },
  { text: '一 一 二 三 五 八 十三 二十一', tone: 'quiet' },
  { text: '自然用加法写密码', tone: 'line' },
  { text: '索菲·奈芙', tone: 'quiet' },
  { text: '罗伯特·兰登', tone: 'quiet' },
  { text: '雅克·索尼埃', tone: 'quiet' },
  { text: '赛拉斯', tone: 'quiet' },
  { text: '五瓣玫瑰常作圣杯的隐喻', tone: 'line' },
  { text: '双骑士共乘一马', tone: 'key' },
  { text: '贫穷与誓约', tone: 'quiet' },
  { text: '维特鲁威', tone: 'line' },
  { text: '比例即神性', tone: 'quiet' },
  { text: '密码筒', tone: 'key' },
  { text: '先读懂象征，再转动金属', tone: 'line' },
  { text: '杯的外形未必是答案', tone: 'line' },
  { text: '文字即钥匙', tone: 'key' },
  { text: '真相写在展厅地板上', tone: 'line' },
  { text: '历史从不消失，只是换了一套符号', tone: 'line' },
  { text: '圣殿骑士', tone: 'quiet' },
  { text: '锡安隐修会', tone: 'quiet' },
  { text: '圣叙尔皮斯', tone: 'quiet' },
  { text: '蒙娜丽莎', tone: 'line' },
  { text: '最后的晚餐', tone: 'quiet' },
  { text: '倒五芒星', tone: 'quiet' },
  { text: '伦敦圣堂', tone: 'line' },
  { text: '石头比证人更长久', tone: 'line' },
  { text: '罗斯林的回响', tone: 'key' },
  { text: '回声不是答案，只是答案的形状', tone: 'line' },
  { text: '血脉与石刻', tone: 'quiet' },
  { text: '门槛前请停步', tone: 'line' },
  { text: '合上书之前，先听心跳', tone: 'line' },
  { text: '巴黎 · 伦敦 · 圣杯', tone: 'quiet' },
  { text: '她不是花，是方向', tone: 'key' },
  { text: '读懂符号，才能读懂留白', tone: 'line' },
]

const WALL = Array.from({ length: 3 }, (_, copy) =>
  PHRASES.map((phrase, index) => ({
    ...phrase,
    id: `${copy}-${index}`,
  })),
).flat()

function Pack() {
  return (
    <div className="cipher-field__pack">
      {WALL.map((item) => (
        <span key={item.id} className={`cipher-field__word is-${item.tone}`}>
          {item.text}
        </span>
      ))}
    </div>
  )
}

interface CoverCipherFieldProps {
  fading?: boolean
}

export function CoverCipherField({ fading = false }: CoverCipherFieldProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const stage = root?.closest('.stage')
    if (!root || !stage || !(stage instanceof HTMLElement)) return

    const onMove = (event: PointerEvent) => {
      const overBook = Boolean(
        event.target instanceof Element &&
          event.target.closest('.closed-book-float'),
      )
      const box = stage.getBoundingClientRect()
      stage.style.setProperty('--lamp-x', `${event.clientX - box.left}px`)
      stage.style.setProperty('--lamp-y', `${event.clientY - box.top}px`)
      stage.classList.toggle('is-lamping', !overBook)
    }

    const onLeave = () => {
      stage.classList.remove('is-lamping')
    }

    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerleave', onLeave)
    return () => {
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
      stage.classList.remove('is-lamping')
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className={`cipher-field${fading ? ' is-fading' : ''}`}
      aria-hidden="true"
    >
      <div className="cipher-field__whisper">
        <Pack />
      </div>
      <div className="cipher-field__beam" />
      <div className="cipher-field__lamp">
        <Pack />
      </div>
    </div>
  )
}
