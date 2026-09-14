import { Compass, Code2, Brain, Database, Wrench } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"

const skillGroups = [
  {
    icon: Compass,
    title: "Product & Analytics",
    skills: [
      "Product Management",
      "Roadmapping",
      "User Research",
      "A/B Testing",
      "Business Intelligence",
      "Agile / Scrum",
    ],
  },
  {
    icon: Code2,
    title: "Programming",
    skills: ["Python", "Java", "JavaScript", "TypeScript", "C++", "SQL"],
  },
  {
    icon: Brain,
    title: "AI / Machine Learning",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
    ],
  },
  {
    icon: Database,
    title: "Data & Visualization",
    skills: ["Pandas", "NumPy", "Tableau", "Power BI", "Excel", "Data Modeling"],
  },
  {
    icon: Wrench,
    title: "Tools",
    skills: ["Git", "Jira", "Figma", "Docker", "AWS", "Notion"],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-20 bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Skills"
            title="My toolkit"
            description="Technologies and disciplines I use to take products from idea to impact."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 80}>
              <div className="group h-full rounded-2xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-fuchsia-500/10 text-primary ring-1 ring-inset ring-primary/10 transition-transform duration-300 group-hover:scale-110">
                    <group.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-semibold">
                    {group.title}
                  </h3>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border/70 bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
