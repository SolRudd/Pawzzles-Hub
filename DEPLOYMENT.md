# Pawzzles Resource Hub Deployment

Vercel project URL: add the project dashboard URL here when available.

Production URL: https://resources.pawzzles.co.uk

Main Pawzzles shop: https://pawzzles.co.uk

Privacy policy URL: https://pawzzles.co.uk/privacy-policy

Google Tag Manager container: GTM-TBF7XNZ2

Required Vercel environment variables:

- `SENDGRID_API_KEY`
- `SENDGRID_MARKETING_LIST_ID`
- `NEWSLETTER_PROVIDER=sendgrid`

Optional SendGrid custom field variables:

- `SENDGRID_CUSTOM_FIELD_SOURCE`
- `SENDGRID_CUSTOM_FIELD_INTERESTS`

Newsletter signups post to `/api/newsletter/subscribe`. SendGrid custom field IDs can be added later once the Marketing Contacts fields have been created in SendGrid.
