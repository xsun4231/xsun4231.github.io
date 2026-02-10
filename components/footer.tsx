export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {currentYear} XSun. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Built with Next.js, Tailwind CSS, and TypeScript
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/xsun4231"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:xsun4231@gmail.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
            <a
              href="/rss.xml"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              RSS
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}