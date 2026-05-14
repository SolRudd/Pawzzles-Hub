import { createClient } from '@supabase/supabase-js'

let supabaseAdmin

export function getSupabaseAdmin() {
  if (supabaseAdmin) return supabaseAdmin

  const url = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error('Supabase is not configured.')
  }

  supabaseAdmin = createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  return supabaseAdmin
}

export async function insertNewsletterSignup(payload) {
  const { data, error } = await getSupabaseAdmin()
    .from('newsletter_signups')
    .insert(payload)
    .select('id')
    .single()

  if (error) throw error
  return data
}

export async function insertConsentEvent(payload) {
  const { error } = await getSupabaseAdmin().from('consent_events').insert(payload)
  if (error) throw error
}

export async function insertCalculatorResult(payload) {
  const { data, error } = await getSupabaseAdmin()
    .from('calculator_results')
    .insert(payload)
    .select('public_token')
    .single()

  if (error) throw error
  return data
}

export async function getPublicCalculatorResult(publicToken) {
  const { data, error } = await getSupabaseAdmin()
    .from('calculator_results')
    .select('created_at,dog_name,calculator_type,result_data')
    .eq('public_token', publicToken)
    .single()

  if (error) throw error
  return data
}
