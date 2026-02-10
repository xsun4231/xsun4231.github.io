"use client"

import Link from 'next/link'
import { useState } from 'react'
import { ThemeToggle } from './theme-toggle'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const navItems = [
    { label: 'Blog', href: '/blog' },
    { label: 'Tags', href: '/tags' },
    { label: 'About', href: '/about' },
    { label: 'Search', href: '/search' },
  ]

  return (
    <header className="border-b border-foreground/10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            XSun
          </Link>

          <nav className="hidden md:flex items-center gap-8">
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

          <button
            className="md:hidden flex flex-col gap-1 w-6 h-6 justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`h-0.5 w-full bg-foreground transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`h-0.5 w-full bg-foreground transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-full bg-foreground transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-4 border-t border-foreground/10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm hover:text-foreground/60 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
