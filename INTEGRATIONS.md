# Pawzzles Resource Hub Integrations

Production URL: https://resources.pawzzles.co.uk

Main Pawzzles shop: https://pawzzles.co.uk

Privacy policy URL: https://pawzzles.co.uk/privacy-policy

## Required Vercel Env Vars

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `BREVO_API_KEY`
- `BREVO_RESULT_TEMPLATE_ID`
- `BREVO_MARKETING_LIST_ID`
- `BREVO_CALCULATOR_USERS_LIST_ID`
- `BREVO_FEEDING_LIST_ID`
- `BREVO_ENRICHMENT_LIST_ID`
- `BREVO_PUPPY_LIST_ID`
- `NEWSLETTER_PROVIDER=brevo`
- `SITE_URL=https://resources.pawzzles.co.uk`
- `SHOP_URL=https://pawzzles.co.uk`
- `PRIVACY_URL=https://pawzzles.co.uk/privacy-policy`

Optional sender settings:

- `BREVO_SENDER_EMAIL`
- `BREVO_SENDER_NAME`

## Supabase

Create the project tables by running `supabase/schema.sql` in the Supabase SQL editor.

The schema creates:

- `calculator_results` for saved calculator inputs and result summaries.
- `newsletter_signups` for newsletter form submissions.
- `consent_events` for form consent records.

The frontend never imports Supabase directly. Server code uses `api/_lib/supabase.js` with `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

## Brevo

Create Brevo contact lists for:

- Main marketing list.
- Calculator users.
- Feeding.
- Enrichment.
- Puppy.

Add the list IDs to the matching Vercel env vars. Newsletter signups only sync to Brevo when the user opts in to marketing emails.

Calculator result emails are sent through `api/results/email.js`. If `BREVO_RESULT_TEMPLATE_ID` is set, Brevo sends that template with `dogName`, `calculatorType`, `resultData` and `resultUrl` params. If no template ID is set, `api/_lib/brevo.js` sends the fallback HTML email from `buildFallbackResultEmail`.

## Newsletter Flow

Newsletter forms post to `/api/newsletter/subscribe`.

The API route:

- Validates the email address.
- Saves the signup to Supabase.
- Saves a consent event to Supabase.
- Adds or updates the Brevo contact only when marketing consent is true.
- Adds the contact to interest lists based on selected interests.

## Calculator Result Flow

Calculator email forms post to `/api/results/email`.

The API route:

- Validates the email, calculator type and result data.
- Saves the result to Supabase.
- Creates a saved result URL using `SITE_URL`.
- Sends the Brevo transactional email.
- Syncs marketing contact lists only when marketing consent is true.

Saved public results are fetched through `/api/results/get?token=...` and rendered at `/results/:token`.

## Consent

Cookie consent controls analytics and marketing tracking only. The marketing email checkbox is separate and must be checked before Brevo marketing contact sync runs.

Form submissions include:

- `consentAnalytics`
- `consentMarketing`

Cookie consent logic lives in `src/components/CookieConsent.jsx` and `src/lib/cookieConsent.js`. Google Tag Manager consent loading lives in `src/lib/googleTagManager.js`.
