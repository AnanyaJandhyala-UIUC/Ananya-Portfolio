import { createClient, type SupabaseClient } from "@supabase/supabase-js"

export type Feedback = {
  id: string
  name: string
  message: string
  rating: number
  created_at: string
}

function getSupabaseUrl() {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  if (!raw) return ""
  return raw.replace(/\/rest\/v1\/?$/i, "").replace(/\/$/, "")
}

let browserClient: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (browserClient) return browserClient

  const url = getSupabaseUrl()
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    )
  }

  browserClient = createClient(url, anonKey)
  return browserClient
}

export function isSupabaseConfigured() {
  return Boolean(
    getSupabaseUrl() && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim(),
  )
}
