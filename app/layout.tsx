import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'

export const metadata: Metadata = {
  title: {
    default: 'XSun - Software Developer',
    template: '%s | XSun'
  },
  description: 'Personal website and blog about technology, programming, and software development',
  keywords: ['Software Developer', 'Web Development', 'React', 'Next.js', 'TypeScript', 'Programming'],
  authors: [{ name: 'XSun' }],
  creator: 'XSun',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://xsun4231.github.io',
    title: 'XSun - Software Developer',
    description: 'Personal website and blog about technology and programming',
    siteName: 'XSun',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XSun - Software Developer',
    description: 'Personal website and blog about technology and programming',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="container mx-auto px-4 py-16 max-w-4xl">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
