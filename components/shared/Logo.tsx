import Link from 'next/link'

export function Logo({ className = "", showText = true }: { className?: string, showText?: boolean }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <div className="text-2xl font-bold">
        GPAI
      </div>
      {showText && (
        <span className="text-lg font-normal text-muted-foreground">
          Case Competition
        </span>
      )}
    </Link>
  )
}