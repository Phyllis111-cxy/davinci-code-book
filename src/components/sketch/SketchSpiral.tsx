const GOLD = '#c4a35a'
const GOLD_EDGE = '#6b4e24'

/** Fibonacci spiral — same path as the cipher nodes, manuscript gold ink. */
export function SketchSpiral({ className }: { className?: string }) {
  const d = `M16 76
           C 16 52, 30 26, 52 22
           C 74 18, 88 34, 86 52
           C 84 68, 68 80, 50 78
           C 36 76, 28 68, 28 58
           C 28 48, 38 42, 48 44
           C 58 46, 64 54, 60 62
           C 57 68, 50 70, 46 66`

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d={d}
        fill="none"
        stroke={GOLD_EDGE}
        strokeWidth="2.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={d}
        fill="none"
        stroke={GOLD}
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="50"
        cy="52"
        r="2.6"
        fill="none"
        stroke={GOLD_EDGE}
        strokeWidth="2.1"
      />
      <circle
        cx="50"
        cy="52"
        r="2.6"
        fill="none"
        stroke={GOLD}
        strokeWidth="1.15"
      />
    </svg>
  )
}
