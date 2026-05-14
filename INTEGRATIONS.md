# Pawzzles Resource Hub Integrations

Production URL: https://resources.pawzzles.co.uk

Main Pawzzles shop: https://pawzzles.co.uk

Privacy policy URL: https://pawzzles.co.uk/privacy-policy

## Required Vercel Env Vars

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `BREVO_API_KEY`
- `BREVO_MARKETING_LIST_ID=8`
- `BREVO_SENDER_EMAIL=info@pawzzles.co.uk`
- `BREVO_SENDER_NAME=Pawzzles`
- `NEWSLETTER_PROVIDER=brevo`
- `SITE_URL=https://resources.pawzzles.co.uk`
- `SHOP_URL=https://pawzzles.co.uk`
- `PRIVACY_URL=https://pawzzles.co.uk/privacy-policy`
- `GTM_CONTAINER_ID=GTM-TBF7XNZ2`

Optional Brevo settings:

- `BREVO_RESULT_TEMPLATE_ID`

## Supabase

Create the project tables by running `supabase/schema.sql` in the Supabase SQL editor.

The schema creates:

- `calculator_results` for saved calculator inputs and result summaries.
- `newsletter_signups` for newsletter form submissions.
- `consent_events` for form consent records.

The frontend never imports Supabase directly. Server code uses `api/_lib/supabase.js` with `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

`SUPABASE_SERVICE_ROLE_KEY` must be the `service_role` API key from Supabase Project Settings > API. It is not the database password, JWT secret or anon key. If Vercel logs show `Invalid API key`, replace the Vercel Production value with the `service_role` key from the same Supabase project as `SUPABASE_URL`.

## Brevo

Create one Brevo contact list for now:

- Main marketing list, configured as `BREVO_MARKETING_LIST_ID=8`.

Newsletter signups and calculator form submitters only sync to Brevo when the user opts in to marketing emails.

Calculator result emails are sent through `api/results/email.js`. Brevo contact storage is deliberately minimal. Marketing sync only receives the email address and list ID 8 when the user opts in.

If `BREVO_RESULT_TEMPLATE_ID` is set, Brevo sends that template with only lightweight template params such as `shopUrl`. If no template ID is set, `api/_lib/brevo.js` sends the fallback HTML email from `buildFallbackResultEmail`.

Full calculator inputs, dog details, result summaries and saved result tokens stay in Supabase only.

## Newsletter Flow

Newsletter forms post to `/api/newsletter/subscribe`.

The API route:

- Validates the email address.
- Saves the signup to Supabase.
- Saves a consent event to Supabase when the consent table is available.
- Adds or updates the Brevo contact only when marketing consent is true.
- Adds the contact to Brevo list 8 only.

## Calculator Result Flow

Calculator email forms post to `/api/results/email`.

The API route:

- Validates the email, calculator type and result data.
- Saves the result to Supabase.
- Creates a saved result URL using `SITE_URL`.
- Sends the Brevo transactional email.
- Syncs to Brevo list 8 only when marketing consent is true.

Saved public results are fetched through `/api/results/get?token=...` and rendered at `/results/:token`.

## Consent

Cookie consent controls analytics and marketing tracking only. The marketing email checkbox is separate and must be checked before Brevo marketing contact sync runs.

Form submissions include:

- `consentAnalytics`
- `consentMarketing`

Cookie consent logic lives in `src/components/CookieConsent.jsx` and `src/lib/cookieConsent.js`. Google Tag Manager consent loading lives in `src/lib/googleTagManager.js`.
