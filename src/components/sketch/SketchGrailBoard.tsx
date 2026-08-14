import { INK, INK_SOFT } from './ink'

/** Grail page — thin plate frame and composition arc. */
export function SketchGrailBoard({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect
        x="9"
        y="11"
        width="82"
        height="70"
        fill="none"
        stroke={INK}
        strokeWidth="1.15"
        rx="1.2"
      />
      <path
        d="M20 68 L38 44 L52 56 L68 30 L80 52"
        fill="none"
        stroke={INK_SOFT}
        strokeWidth="1.05"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="50"
        cy="48"
        r="15.5"
        fill="none"
        stroke="rgba(139, 46, 46, 0.32)"
        strokeWidth="1.05"
      />
    </svg>
  )
}

type IconKind = 'rose' | 'knights' | 'vitruvian' | 'cryptex' | 'chalice'

/** Compact ink glyphs — plate engraving weight. */
export function SketchSymbolIcon({
  kind,
  className,
}: {
  kind: IconKind
  className?: string
}) {
  const stroke = INK
  const sw = 1.25

  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {kind === 'rose' ? (
        <>
          <circle cx="16" cy="15" r="7.5" fill="none" stroke={stroke} strokeWidth={sw} />
          <circle cx="16" cy="15" r="2.6" fill="none" stroke={stroke} strokeWidth={1.1} />
          <path
            d="M16 7.5 C18 11, 18 13, 16 15 C14 13, 14 11, 16 7.5"
            fill="none"
            stroke={stroke}
            strokeWidth={1.05}
          />
          <path
            d="M23.5 15 C20 17, 18 17, 16 15 C18 13, 20 13, 23.5 15"
            fill="none"
            stroke={stroke}
            strokeWidth={1.05}
          />
          <path
            d="M16 22.5 C14 19, 14 17, 16 15 C18 17, 18 19, 16 22.5"
            fill="none"
            stroke={stroke}
            strokeWidth={1.05}
          />
          <path
            d="M8.5 15 C12 13, 14 13, 16 15 C14 17, 12 17, 8.5 15"
            fill="none"
            stroke={stroke}
            strokeWidth={1.05}
          />
        </>
      ) : null}
      {kind === 'knights' ? (
        <>
          <circle cx="11.5" cy="10" r="2.8" fill="none" stroke={stroke} strokeWidth={sw} />
          <circle cx="20.5" cy="10" r="2.8" fill="none" stroke={stroke} strokeWidth={sw} />
          <path
            d="M8 14 H24 V22 H8 Z"
            fill="none"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
          <line x1="11" y1="22" x2="11" y2="27" stroke={stroke} strokeWidth={1.1} strokeLinecap="round" />
          <line x1="21" y1="22" x2="21" y2="27" stroke={stroke} strokeWidth={1.1} strokeLinecap="round" />
        </>
      ) : null}
      {kind === 'vitruvian' ? (
        <>
          <circle cx="16" cy="16" r="9.5" fill="none" stroke={stroke} strokeWidth={sw} />
          <rect x="9" y="9" width="14" height="14" fill="none" stroke={stroke} strokeWidth={1.1} />
          <line x1="16" y1="6.5" x2="16" y2="25.5" stroke={stroke} strokeWidth={1.05} />
          <line x1="6.5" y1="16" x2="25.5" y2="16" stroke={stroke} strokeWidth={1.05} />
        </>
      ) : null}
      {kind === 'cryptex' ? (
        <>
          <rect x="8" y="11.5" width="16" height="9" fill="none" stroke={stroke} strokeWidth={sw} rx="0.8" />
          <line x1="12" y1="11.5" x2="12" y2="20.5" stroke={stroke} strokeWidth={1.05} />
          <line x1="16" y1="11.5" x2="16" y2="20.5" stroke={stroke} strokeWidth={1.05} />
          <line x1="20" y1="11.5" x2="20" y2="20.5" stroke={stroke} strokeWidth={1.05} />
          <ellipse cx="8" cy="16" rx="2" ry="4.5" fill="none" stroke={stroke} strokeWidth={1.1} />
          <ellipse cx="24" cy="16" rx="2" ry="4.5" fill="none" stroke={stroke} strokeWidth={1.1} />
        </>
      ) : null}
      {kind === 'chalice' ? (
        <>
          <path
            d="M11 9 H21 L19.5 15.5 Q16 20 16 20 Q16 20 12.5 15.5 Z"
            fill="none"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
          <line x1="16" y1="20" x2="16" y2="24.5" stroke={stroke} strokeWidth={1.15} strokeLinecap="round" />
          <line x1="12" y1="24.5" x2="20" y2="24.5" stroke={stroke} strokeWidth={1.15} strokeLinecap="round" />
        </>
      ) : null}
    </svg>
  )
}
