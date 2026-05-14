# Pawzzles Resource Hub Deployment

Vercel project URL: add the project dashboard URL here when available.

Production URL: https://resources.pawzzles.co.uk

Main Pawzzles shop: https://pawzzles.co.uk

Privacy policy URL: https://pawzzles.co.uk/privacy-policy

Google Tag Manager container: GTM-TBF7XNZ2

Required Vercel environment variables:

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

Optional Brevo variables:

- `BREVO_RESULT_TEMPLATE_ID`

Newsletter signups post to `/api/newsletter/subscribe`. Calculator result emails post to `/api/results/email`. Supabase table setup lives in `supabase/schema.sql`, and Brevo request logic lives in `api/_lib/brevo.js`.
