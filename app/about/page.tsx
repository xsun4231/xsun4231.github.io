export default function AboutPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">About</h1>
      </div>

      <div className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Introduction</h2>
          <p className="text-foreground/80 leading-relaxed">
            Software developer with a passion for clean code and elegant solutions.
            Building web applications and exploring new technologies.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Java'].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 border border-foreground/20 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
