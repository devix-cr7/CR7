export function PulseMark({ className = 'w-8 h-8', animate = true }: { className?: string; animate?: boolean }) {
  return (
    <svg viewBox="0 0 64 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 12H14L18 4L26 20L32 8L36 16L40 12H64"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animate ? 'pulse-line' : ''}
      />
    </svg>
  )
}
