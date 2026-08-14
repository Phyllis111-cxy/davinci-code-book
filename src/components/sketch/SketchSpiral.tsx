import { INK, INK_FAINT, INK_SOFT } from './ink'

/** Fibonacci spiral — clean ink line with a quiet floor mark. */
export function SketchSpiral({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M16 76
           C 16 52, 30 26, 52 22
           C 74 18, 88 34, 86 52
           C 84 68, 68 80, 50 78
           C 36 76, 28 68, 28 58
           C 28 48, 38 42, 48 44
           C 58 46, 64 54, 60 62
           C 57 68, 50 70, 46 66"
        fill="none"
        stroke={INK}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="50"
        cy="52"
        r="2.6"
        fill="none"
        stroke={INK}
        strokeWidth="1.1"
      />
      <line
        x1="14"
        y1="86"
        x2="86"
        y2="86"
        stroke={INK_FAINT}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <line
        x1="14"
        y1="18"
        x2="14"
        y2="86"
        stroke={INK_SOFT}
        strokeWidth="0.85"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  )
}
