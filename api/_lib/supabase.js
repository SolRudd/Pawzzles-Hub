import { createClient } from '@supabase/supabase-js'

let supabaseAdmin

function createSupabaseConfigError(message, details, hint) {
  const error = new Error(message)
  error.status = 500
  error.details = details
  error.hint = hint
  return error
}

function logSupabaseServerError(step, error) {
  console.error('Supabase server error', {
    step,
    message: error?.message,
    status: error?.status || error?.code,
    details: error?.details,
    hint: error?.hint,
  })
}

function throwSupabaseError(step, error) {
  const normalisedError = normaliseSupabaseError(error)
  logSupabaseServerError(step, normalisedError)
  throw normalisedError
}

export function validateSupabaseEnv() {
  const missing = []
  if (!process.env.SUPABASE_URL) missing.push('SUPABASE_URL')
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY')

  if (missing.length > 0) {
    const error = createSupabaseConfigError(
      'Supabase environment is not configured.',
      `Missing required Supabase env vars: ${missing.join(', ')}`,
      'Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to the Vercel Production environment.',
    )
    logSupabaseServerError('supabase_env', error)
    throw error
  }
}

function normaliseSupabaseError(error) {
  const message = String(error?.message || '')

  if (/invalid api key/i.test(message)) {
    const invalidKeyError = new Error('Invalid Supabase API key from Supabase response.')
    invalidKeyError.status = error?.status || error?.code || 401
    invalidKeyError.details =
      'Supabase returned: Invalid API key. Double check your Supabase anon or service_role API key.'
    invalidKeyError.hint =
      'SUPABASE_SERVICE_ROLE_KEY must be the service_role key from Supabase Project Settings > API. Do not use the database password, JWT secret or anon key.'
    return invalidKeyError
  }

  return error
}

export function getSupabaseAdmin() {
  if (supabaseAdmin) return supabaseAdmin

  validateSupabaseEnv()

  const url = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

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

  if (error) throwSupabaseError('newsletter_signups_insert', error)
  return data
}

export async function updateNewsletterSignup(id, payload) {
  if (!id) return null

  const { data, error } = await getSupabaseAdmin()
    .from('newsletter_signups')
    .update(payload)
    .eq('id', id)
    .select('id')
    .single()

  if (error) throwSupabaseError('newsletter_signups_update', error)
  return data
}

export async function insertConsentEvent(payload) {
  const { error } = await getSupabaseAdmin().from('consent_events').insert(payload)
  if (error) throwSupabaseError('consent_events_insert', error)
}

export async function insertCalculatorResult(payload) {
  const { data, error } = await getSupabaseAdmin()
    .from('calculator_results')
    .insert(payload)
    .select('id,public_token')
    .single()

  if (error) {
    const message = String(error.message || '')
    const missingDogGenderColumn =
      payload?.dog_gender &&
      (message.includes('dog_gender') || message.includes('schema cache'))

    if (missingDogGenderColumn) {
      const { dog_gender, ...fallbackPayload } = payload
      const retry = await getSupabaseAdmin()
        .from('calculator_results')
        .insert(fallbackPayload)
        .select('id,public_token')
        .single()

      if (retry.error) throwSupabaseError('calculator_results_insert_retry', retry.error)
      return retry.data
    }

    throwSupabaseError('calculator_results_insert', error)
  }

  return data
}

export async function updateCalculatorResult(id, payload) {
  if (!id) return null

  const { data, error } = await getSupabaseAdmin()
    .from('calculator_results')
    .update(payload)
    .eq('id', id)
    .select('id')
    .single()

  if (error) throwSupabaseError('calculator_results_update', error)
  return data
}

export async function getPublicCalculatorResult(publicToken) {
  const { data, error } = await getSupabaseAdmin()
    .from('calculator_results')
    .select('created_at,dog_name,calculator_type,result_data')
    .eq('public_token', publicToken)
    .single()

  if (error) throwSupabaseError('calculator_results_public_get', error)
  return data
}
