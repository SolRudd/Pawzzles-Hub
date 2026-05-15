# Pawzzles Resource Hub Deployment

Vercel project URL: add the project dashboard URL here when available.

Production URL: https://resources.pawzzles.co.uk

Main Pawzzles shop: https://pawzzles.co.uk

Privacy policy URL: https://pawzzles.co.uk/privacy-policy

Terms URL: https://pawzzles.co.uk/terms-and-conditions

Google Tag Manager container: GTM-TBF7XNZ2

Required Vercel environment variables:

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

Newsletter signups post to `/api/newsletter/subscribe`. Calculator result emails post to `/api/results/email`. Supabase table setup lives in `supabase/schema.sql`, and Brevo request logic lives in `api/_lib/brevo.js`.

Before deployment:

- Run `supabase/schema.sql` in the Supabase SQL editor so consent proof, Brevo sync and result email status columns exist.
- Confirm Brevo list ID 8 is set as `BREVO_MARKETING_LIST_ID`.
- Add optional Brevo list IDs for feeding, enrichment, puppy and calculator users if those lists exist.
- Add Brevo transactional template IDs if you want templates. Without them, the API sends branded fallback HTML.
- Keep cookie consent separate from email marketing consent. Newsletter marketing consent is required. Calculator result email consent is required, while calculator marketing consent is optional.
