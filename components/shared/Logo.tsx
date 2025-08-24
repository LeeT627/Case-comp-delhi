import Link from 'next/link'

export function Logo({ className = "", showText = true }: { className?: string, showText?: boolean }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-white"
        >
          <path
            d="M12 2L2 7V12C2 16.5 4.23 20.68 7.62 23.15L12 24L16.38 23.15C19.77 20.68 22 16.5 22 12V7L12 2Z"
            fill="currentColor"
          />
        </svg>
      </div>
      {showText && (
        <span className="text-xl font-bold text-foreground">
          GPAI Case Competition
        </span>
      )}
    </Link>
  )
}