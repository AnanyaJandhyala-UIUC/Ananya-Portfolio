"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { Loader2, MessageSquareHeart, Send, Star } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import {
  getSupabase,
  isSupabaseConfigured,
  type Feedback,
} from "@/lib/supabase"
import { cn } from "@/lib/utils"

const STAR_VALUES = [1, 2, 3, 4, 5] as const

function formatTimestamp(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "Just now"

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

function StarRow({
  rating,
  size = "md",
}: {
  rating: number
  size?: "sm" | "md"
}) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {STAR_VALUES.map((value) => (
        <Star
          key={value}
          className={cn(
            size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4",
            value <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-transparent text-muted-foreground/30",
          )}
        />
      ))}
    </div>
  )
}

function FeedbackCard({ item, highlight }: { item: Feedback; highlight?: boolean }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border bg-card p-5 shadow-sm transition-all",
        highlight
          ? "border-primary/50 shadow-lg shadow-primary/10 ring-1 ring-primary/20"
          : "border-border/70 hover:border-primary/30 hover:shadow-md",
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-fuchsia-500 text-xs font-bold text-primary-foreground">
          {initialsFor(item.name)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <h3 className="truncate font-display text-sm font-semibold">
              {item.name}
            </h3>
            <time
              dateTime={item.created_at}
              className="text-xs text-muted-foreground"
            >
              {formatTimestamp(item.created_at)}
            </time>
          </div>
          <div className="mt-1">
            <StarRow rating={item.rating} size="sm" />
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {item.message}
      </p>
    </article>
  )
}

export function FeedbackSection() {
  const configured = isSupabaseConfigured()
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [rating, setRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [items, setItems] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(configured)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [highlightedId, setHighlightedId] = useState<string | null>(null)

  const previewRating = hoveredStar || rating

  const sortedItems = useMemo(
    () =>
      [...items].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    [items],
  )

  useEffect(() => {
    if (!configured) {
      setError("Supabase is not configured, so feedback cannot be loaded yet.")
      return
    }

    const supabase = getSupabase()
    let cancelled = false

    async function loadFeedback() {
      const { data, error: loadError } = await supabase
        .from("feedback")
        .select("id, name, message, rating, created_at")
        .order("created_at", { ascending: false })

      if (cancelled) return

      if (loadError) {
        setError("Could not load feedback. Please try again in a moment.")
        setLoading(false)
        return
      }

      setItems((data ?? []) as Feedback[])
      setLoading(false)
    }

    void loadFeedback()

    const channel = supabase
      .channel("public:feedback")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "feedback" },
        (payload) => {
          const incoming = payload.new as Feedback
          if (!incoming?.id) return
          setItems((current) => {
            if (current.some((item) => item.id === incoming.id)) return current
            return [incoming, ...current]
          })
        },
      )
      .subscribe()

    return () => {
      cancelled = true
      void supabase.removeChannel(channel)
    }
  }, [configured])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    const trimmedName = name.trim()
    const trimmedMessage = message.trim()

    if (!trimmedName || !trimmedMessage || rating < 1) {
      setError("Please add your name, a message, and a rating from 1 to 5.")
      return
    }

    if (!configured) {
      setError("Supabase is not configured, so feedback cannot be saved yet.")
      return
    }

    setSubmitting(true)

    try {
      const supabase = getSupabase()
      const { data, error: insertError } = await supabase
        .from("feedback")
        .insert({
          name: trimmedName,
          message: trimmedMessage,
          rating,
        })
        .select("id, name, message, rating, created_at")
        .single()

      if (insertError || !data) {
        setError("Something went wrong while saving your feedback. Please try again.")
        return
      }

      const saved = data as Feedback
      setItems((current) => {
        if (current.some((item) => item.id === saved.id)) return current
        return [saved, ...current]
      })
      setHighlightedId(saved.id)
      setName("")
      setMessage("")
      setRating(0)
      setHoveredStar(0)
      setSuccess("Thanks — your feedback is live below.")
      window.setTimeout(() => {
        setHighlightedId(null)
        setSuccess(null)
      }, 3200)
    } catch {
      setError("Something went wrong while saving your feedback. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="feedback" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Guestbook"
            title="Feedback"
            description="Leave a note, a rating, or a kind word. Submissions are saved live and appear here for everyone to see."
          />
        </Reveal>

        <Reveal delay={80}>
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-3xl border border-border/70 bg-card shadow-xl shadow-primary/5"
          >
            <div className="flex items-center gap-3 border-b border-border/60 bg-gradient-to-r from-primary/10 to-fuchsia-500/10 px-6 py-4">
              <MessageSquareHeart className="h-5 w-5 text-primary" />
              <p className="font-display text-sm font-semibold">Share your feedback</p>
            </div>

            <div className="space-y-5 p-6 sm:p-8">
              <div>
                <label htmlFor="fb-name" className="mb-1.5 block text-sm font-medium">
                  Name
                </label>
                <input
                  id="fb-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  maxLength={80}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label htmlFor="fb-message" className="mb-1.5 block text-sm font-medium">
                  Feedback message
                </label>
                <textarea
                  id="fb-message"
                  name="message"
                  required
                  rows={5}
                  maxLength={800}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="What stood out, what could be better, or a note you’d like to leave..."
                  className="w-full resize-y rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <p id="fb-rating-label" className="mb-1.5 text-sm font-medium">
                  Rating
                </p>
                <div
                  role="radiogroup"
                  aria-labelledby="fb-rating-label"
                  className="flex items-center gap-1"
                  onMouseLeave={() => setHoveredStar(0)}
                >
                  {STAR_VALUES.map((value) => {
                    const active = value <= previewRating
                    return (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={rating === value}
                        aria-label={`${value} star${value === 1 ? "" : "s"}`}
                        onMouseEnter={() => setHoveredStar(value)}
                        onFocus={() => setHoveredStar(value)}
                        onBlur={() => setHoveredStar(0)}
                        onClick={() => setRating(value)}
                        className="rounded-lg p-1.5 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                      >
                        <Star
                          className={cn(
                            "h-7 w-7 transition-colors",
                            active
                              ? "fill-amber-400 text-amber-400"
                              : "fill-transparent text-muted-foreground/35",
                          )}
                        />
                      </button>
                    )
                  })}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {rating ? `${rating} / 5` : "Pick 1 to 5"}
                  </span>
                </div>
              </div>

              {error && (
                <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}
              {success && (
                <p className="rounded-xl border border-primary/20 bg-primary/10 px-4 py-2.5 text-sm text-primary" role="status">
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70 sm:w-auto"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit
                  </>
                )}
              </button>
            </div>
          </form>
        </Reveal>

        <div className="mt-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-semibold">Latest notes</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {loading
                  ? "Loading feedback..."
                  : sortedItems.length === 1
                    ? "1 note so far"
                    : `${sortedItems.length} notes so far`}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-40 animate-pulse rounded-2xl border border-border/60 bg-muted/50"
                />
              ))}
            </div>
          ) : sortedItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
              <p className="font-medium">No feedback yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Be the first to leave a note above.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {sortedItems.map((item) => (
                <FeedbackCard
                  key={item.id}
                  item={item}
                  highlight={item.id === highlightedId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
