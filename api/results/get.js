import { getPublicCalculatorResult } from '../_lib/supabase.js'

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return sendJson(res, 405, { ok: false, error: 'Method not allowed.' })
  }

  const token = String(req.query?.token || '').trim()
  if (!UUID_PATTERN.test(token)) {
    return sendJson(res, 400, { ok: false, error: 'Invalid result link.' })
  }

  try {
    const result = await getPublicCalculatorResult(token)
    return sendJson(res, 200, {
      ok: true,
      result: {
        createdAt: result.created_at,
        dogName: result.dog_name,
        calculatorType: result.calculator_type,
        resultData: result.result_data,
      },
    })
  } catch (error) {
    console.error('Public result lookup failed', error)
    return sendJson(res, 404, { ok: false, error: 'Result not found.' })
  }
}
