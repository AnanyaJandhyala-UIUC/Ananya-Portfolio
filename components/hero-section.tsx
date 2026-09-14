import Image from "next/image"
import type { SVGProps } from "react"
import { ArrowRight, Mail, MapPin } from "lucide-react"

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  )
}

const stats = [
  { value: "5+", label: "Domains bridged" },
  { value: "3+", label: "Product & Eng roles" },
  { value: "10+", label: "Projects shipped" },
]

const quickLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ananya-jandhyala",
    icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/ananya-jandhyala",
    icon: GitHubIcon,
  },
  { label: "Email", href: "mailto:ananya22@illinois.edu", icon: Mail },
]

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      {/* background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute top-20 right-0 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent,var(--background))]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-500" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to Product &amp; AI roles
          </span>

          <h1 className="mt-6 text-balance font-display text-4xl font-bold leading-[1.03] tracking-tight sm:text-6xl">
            Hi, I&apos;m{" "}
            <span className="inline-block bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              Ananya Jandhyala
            </span>
          </h1>

          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-lg font-semibold text-foreground sm:text-xl">
            {["Product", "AI", "Data", "Software"].map((word, i) => (
              <span key={word} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="h-1 w-1 rounded-full bg-primary/50" />
                )}
                {word}
              </span>
            ))}
          </p>

          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            I build technology and data-driven products that turn complex
            problems into intuitive experiences — bridging product strategy,
            machine learning, and thoughtful engineering.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#feedback"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              <Mail className="h-4 w-4 text-primary" />
              Get in Touch
            </a>

            <div className="flex items-center gap-2 sm:ml-1">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                >
                  <link.icon className="h-[1.15rem] w-[1.15rem]" />
                </a>
              ))}
            </div>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border/60 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {stat.value}
                </dd>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative animate-fade-in-up [animation-delay:150ms]">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/30 to-fuchsia-500/20 blur-2xl" />
            <div className="animate-float-slow relative h-full w-full overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-2xl shadow-primary/10">
              <Image
                src="/images/ananya-photo.png"
                alt="Ananya Jandhyala"
                width={640}
                height={640}
                priority
                className="h-full w-full object-cover object-[50%_30%]"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
            </div>
            <div className="absolute -bottom-5 -left-4 flex items-center gap-2.5 rounded-2xl border border-border/70 bg-card/90 px-4 py-3 shadow-xl backdrop-blur sm:-left-6">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              <div className="leading-tight">
                <p className="text-sm font-semibold">UIUC</p>
                <p className="text-xs text-muted-foreground">
                  M.S. Information Management
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
