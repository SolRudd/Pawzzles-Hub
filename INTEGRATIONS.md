# Pawzzles Resource Hub Integrations

Production URL: https://resources.pawzzles.co.uk

Main Pawzzles shop: https://pawzzles.co.uk

Privacy policy URL: https://pawzzles.co.uk/privacy-policy

Terms URL: https://pawzzles.co.uk/terms-and-conditions

## Required Vercel Env Vars

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `BREVO_API_KEY`
- `BREVO_MARKETING_LIST_ID=8`
- `BREVO_NEWSLETTER_TEMPLATE_ID`
- `BREVO_RESULT_TEMPLATE_ID`
- `BREVO_CALCULATOR_USERS_LIST_ID`
- `BREVO_FEEDING_LIST_ID`
- `BREVO_ENRICHMENT_LIST_ID`
- `BREVO_PUPPY_LIST_ID`
- `BREVO_SENDER_EMAIL=info@pawzzles.co.uk`
- `BREVO_SENDER_NAME=Pawzzles`
- `NEWSLETTER_PROVIDER=brevo`
- `SITE_URL=https://resources.pawzzles.co.uk`
- `SHOP_URL=https://pawzzles.co.uk`
- `PRIVACY_URL=https://pawzzles.co.uk/privacy-policy`
- `TERMS_URL=https://pawzzles.co.uk/terms-and-conditions`
- `GTM_CONTAINER_ID=GTM-TBF7XNZ2`

## Supabase

Create the project tables by running `supabase/schema.sql` in the Supabase SQL editor.

The schema creates:

- `calculator_results` for saved calculator inputs and result summaries.
- `newsletter_signups` for newsletter form submissions.
- `consent_events` for form consent records.

Consent proof fields include privacy and terms acceptance, consent text, consent version, consent method, policy URLs, user agent, IP address and the submitted timestamp. Newsletter rows also track `brevo_synced` and `brevo_sync_error`. Calculator result rows track transactional email delivery and optional Brevo marketing sync.

The frontend never imports Supabase directly. Server code uses `api/_lib/supabase.js` with `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

`SUPABASE_SERVICE_ROLE_KEY` must be the `service_role` API key from Supabase Project Settings > API. It is not the database password, JWT secret or anon key. If Vercel logs show `Invalid API key`, replace the Vercel Production value with the `service_role` key from the same Supabase project as `SUPABASE_URL`.

## Brevo

Create the main Brevo contact list:

- Main marketing list, configured as `BREVO_MARKETING_LIST_ID=8`.

Optional interest lists can be configured with:

- `BREVO_FEEDING_LIST_ID`
- `BREVO_ENRICHMENT_LIST_ID`
- `BREVO_PUPPY_LIST_ID`
- `BREVO_CALCULATOR_USERS_LIST_ID`

Newsletter signups sync to Brevo only after explicit email marketing consent. Calculator users are added to Brevo marketing lists only when the optional marketing checkbox is ticked.

If `BREVO_NEWSLETTER_TEMPLATE_ID` or `BREVO_RESULT_TEMPLATE_ID` is set, Brevo receives transactional template params for that email. If no template ID is set, `api/_lib/brevo.js` sends branded fallback HTML.

Supabase remains the source of truth for full calculator inputs, dog details, result summaries and saved result tokens.

## Newsletter Flow

Newsletter forms post to `/api/newsletter/subscribe`.

The API route:

- Validates the email address.
- Requires the newsletter marketing, Privacy Policy and Terms checkbox.
- Saves the signup to Supabase with consent proof.
- Saves a consent event to Supabase.
- Adds or updates the Brevo contact in list 8 and any configured interest lists.
- Sends a Brevo newsletter welcome email to the customer.
- Returns success only when Supabase save and Brevo sync/email complete.

## Calculator Result Flow

Calculator email forms post to `/api/results/email`.

The API route:

- Validates the email, calculator type and result data.
- Requires the result email Privacy Policy and Terms checkbox.
- Saves the result to Supabase with consent proof.
- Saves a consent event to Supabase.
- Creates a saved result URL using `SITE_URL`.
- Sends the Brevo transactional email.
- If marketing consent is ticked, syncs the contact to Brevo list 8 and configured interest lists.
- If marketing sync fails after the transactional email is sent, the request still succeeds and Supabase stores the marketing sync error.

Saved public results are fetched through `/api/results/get?token=...` and rendered at `/results/:token`.

## Consent

Cookie consent controls analytics and marketing tracking only. Cookie consent is separate from email marketing consent and must not be treated as permission to send marketing emails.

Newsletter consent is required because newsletter signup is marketing. Calculator result email consent is required because the user is asking Pawzzles to send a requested transactional result. Marketing consent on calculator forms is optional.

Form submissions include:

- `consentAnalytics`
- `consentMarketing`
- `privacyAccepted`
- `termsAccepted`
- `resultEmailConsent` for calculator result forms
- `consentText`
- `marketingConsentText` for calculator result forms
- `consentVersion=pawzzles-consent-v1`
- `consentMethod=checkbox`
- `privacyUrl`
- `termsUrl`

Cookie consent logic lives in `src/components/CookieConsent.jsx` and `src/lib/cookieConsent.js`. Google Tag Manager consent loading lives in `src/lib/googleTagManager.js`.
