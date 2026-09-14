import { GraduationCap, Code2, Sparkles, BarChart3 } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"

const highlights = [
  {
    icon: GraduationCap,
    title: "Master's at UIUC",
    description:
      "Pursuing an M.S. in Information Management at the University of Illinois Urbana-Champaign.",
  },
  {
    icon: Code2,
    title: "CS Foundation",
    description:
      "A strong Computer Science background powering everything I design and build.",
  },
  {
    icon: Sparkles,
    title: "AI & Machine Learning",
    description:
      "Applying ML and AI research to create genuinely useful, human-centered products.",
  },
  {
    icon: BarChart3,
    title: "Data & Product",
    description:
      "Turning analytics and business intelligence into clear product decisions.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="About"
            title="Building at the intersection of product, data, and AI"
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-10 max-w-3xl space-y-5 text-center text-lg leading-relaxed text-muted-foreground">
            <p>
              I&apos;m a Master&apos;s student in Information Management at UIUC
              with a foundation in Computer Science and hands-on experience
              across Product Management, Software Engineering, AI/ML, Data
              Analytics, and Business Intelligence.
            </p>
            <p>
              I love working where strategy meets execution — understanding user
              needs, exploring data for insight, and shipping technology that
              makes a measurable difference. Whether I&apos;m defining a product
              roadmap, training a model, or writing production code, my goal is
              always the same: build things that matter.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
                <div
                  aria-hidden="true"
                  className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-opacity duration-300 group-hover:bg-primary/10"
                />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-fuchsia-500/10 text-primary ring-1 ring-inset ring-primary/10 transition-transform duration-300 group-hover:scale-110">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
