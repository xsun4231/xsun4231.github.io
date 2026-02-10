import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl text-foreground/60">Page not found</p>
      <Link
        href="/"
        className="px-6 py-2 border border-foreground/20 hover:border-foreground/60 transition-colors"
      >
        Go home
      </Link>
    </div>
  )
}
