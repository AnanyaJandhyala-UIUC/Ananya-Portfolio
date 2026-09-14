import { ArrowUpRight, Video, Brain, LineChart } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"

const projects = [
  {
    icon: Video,
    title: "DyslexiEase",
    description:
      "An AI-powered text-to-video accessibility platform that transforms dense text into engaging, easy-to-follow videos — making reading more approachable for people with dyslexia.",
    tags: ["AI", "Accessibility", "Text-to-Video", "NLP"],
    gradient: "from-violet-500/25 to-fuchsia-500/20",
    href: "#",
  },
  {
    icon: Brain,
    title: "AI / ML Model Suite",
    description:
      "A machine learning project exploring model training, evaluation, and deployment — turning raw datasets into predictive insight with a clean, reproducible pipeline.",
    tags: ["Python", "PyTorch", "Scikit-learn", "MLOps"],
    gradient: "from-sky-500/25 to-indigo-500/20",
    href: "#",
  },
  {
    icon: LineChart,
    title: "Data & Product Analytics",
    description:
      "An analytics project uncovering product and business insights through interactive dashboards, cohort analysis, and metrics that inform real decisions.",
    tags: ["SQL", "Tableau", "Analytics", "BI"],
    gradient: "from-emerald-500/25 to-teal-500/20",
    href: "#",
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Projects"
            title="Selected work"
            description="A few projects that showcase how I combine AI, data, and product thinking."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 110}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/15">
                <div
                  className={`relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient}`}
                >
                  <div className="absolute inset-0 bg-dots opacity-40" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border/50 bg-card/80 text-primary shadow-lg backdrop-blur transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    <project.icon className="h-8 w-8" />
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-3 right-4 font-display text-sm font-bold text-foreground/30"
                  >
                    0{i + 1}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.href}
                    className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    View Project
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
