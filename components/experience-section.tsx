import { Briefcase, Cpu, FlaskConical } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"

const experiences = [
  {
    icon: Briefcase,
    role: "Product Management Intern",
    company: "Hewlett Packard Enterprise",
    period: "Product",
    points: [
      "Drove product discovery and roadmap planning by translating customer needs into prioritized requirements.",
      "Partnered with engineering and design to ship features, using data to measure impact and iterate.",
    ],
    tags: ["Product Strategy", "Roadmapping", "Stakeholder Mgmt"],
  },
  {
    icon: Cpu,
    role: "IT Developer / Engineer",
    company: "Hewlett Packard Enterprise",
    period: "Engineering",
    points: [
      "Built and maintained internal tools and services, improving reliability and developer workflows.",
      "Collaborated across teams to deliver scalable, well-tested software in a fast-paced environment.",
    ],
    tags: ["Software Engineering", "Automation", "Systems"],
  },
  {
    icon: FlaskConical,
    role: "Software & AI Research",
    company: "Research & Internship Experience",
    period: "AI / ML",
    points: [
      "Explored applied machine learning and AI research, from experimentation to prototype development.",
      "Bridged research and engineering to turn models and ideas into usable, real-world applications.",
    ],
    tags: ["Machine Learning", "Research", "Prototyping"],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-20 bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="Where I've made an impact"
            description="A blend of product, engineering, and research roles across industry and academia."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {experiences.map((exp, i) => (
            <Reveal key={exp.role} delay={i * 110}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-5 top-4 font-display text-5xl font-bold text-foreground/[0.04] transition-colors group-hover:text-primary/10"
                >
                  0{i + 1}
                </span>

                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-fuchsia-500/10 text-primary ring-1 ring-inset ring-primary/10 transition-transform duration-300 group-hover:scale-110">
                    <exp.icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {exp.period}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-semibold leading-snug">
                  {exp.role}
                </h3>
                <p className="text-sm font-medium text-primary">
                  {exp.company}
                </p>

                <ul className="mt-4 flex-1 space-y-2.5">
                  {exp.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-border/60 pt-4">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/70 bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
