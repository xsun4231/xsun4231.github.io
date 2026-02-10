import { Github, Mail, Twitter } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-block p-4 rounded-full bg-primary/10">
            <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center mx-auto">
              <span className="text-4xl font-bold text-primary-foreground">X</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold">About Me</h1>
          <p className="text-lg text-muted-foreground">
            Software developer, blogger, and lifelong learner
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            Hello! I'm XSun, a software developer passionate about building useful tools
            and sharing knowledge through writing. This blog is my personal space where
            I document my learning journey, share technical insights, and explore
            interesting topics in technology.
          </p>

          <h2>Background</h2>
          <p>
            With several years of experience in software development, I've worked on
            various projects ranging from web applications to backend systems. My
            interests include modern web technologies, programming languages, system
            design, and developer tooling.
          </p>

          <h2>What I Write About</h2>
          <ul>
            <li>Web development with Next.js, React, and TypeScript</li>
            <li>Software architecture and best practices</li>
            <li>Developer productivity and tooling</li>
            <li>Learning resources and tutorials</li>
            <li>Personal projects and experiments</li>
          </ul>

          <h2>Connect</h2>
          <p>
            I'm always open to interesting conversations and collaborations. Feel free
            to reach out through any of these channels:
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <Link
              href="https://github.com/xsun4231"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              <Github className="h-5 w-5 mr-2" />
              GitHub
            </Link>
            <Link
              href="mailto:xsun4231@gmail.com"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              <Mail className="h-5 w-5 mr-2" />
              Email
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              <Twitter className="h-5 w-5 mr-2" />
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}