import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

export default function Header() {
  const navItems = [
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
  ]

  return (
    <header className="border-b border-foreground/10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            XSun
          </Link>

          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm hover:text-foreground/60 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
