import { cn } from "@/lib/utils"

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string
  title: string
  description?: string
  align?: "center" | "left"
}) {
  const centered = align === "center"

  return (
    <div
      className={cn(
        "max-w-2xl",
        centered ? "mx-auto text-center" : "text-left",
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary",
          centered && "justify-center",
        )}
      >
        <span className="h-px w-6 bg-primary/50" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.6rem] md:leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-pretty text-base leading-relaxed text-muted-foreground",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
