export default function AboutPage() {
  return (
    <div className="space-y-16 max-w-2xl">
      <div className="space-y-6">
        <h1 className="text-5xl font-bold">About Me</h1>
        <div className="h-px bg-foreground/10 w-24" />
      </div>

      <div className="space-y-12">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Introduction</h2>
          <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
            <p>
              I'm a software developer focused on building elegant and efficient web applications.
            </p>
            <p>
              I believe in writing clean code, embracing simplicity, and continuously learning new technologies.
            </p>
            <p>
              This blog is where I share my thoughts on programming, technology, and software development.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Skills & Technologies</h2>
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground/60">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 border border-foreground/20 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground/60">Backend & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {['Node.js', 'Python', 'Git', 'Docker'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 border border-foreground/20 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <div className="space-y-3">
            <a
              href="https://github.com/xsun4231"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-foreground/80 hover:text-foreground transition-colors border-b border-foreground/20 hover:border-foreground/60 pb-0.5 inline-block"
            >
              GitHub
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
