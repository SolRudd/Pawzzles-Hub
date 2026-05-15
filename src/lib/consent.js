import { SITE } from '../data/site.js'

export const CONSENT_VERSION = 'pawzzles-consent-v1'
export const CONSENT_METHOD = 'checkbox'

export const NEWSLETTER_CONSENT_TEXT =
  'Yes, send me Pawzzles tips, guides and product updates. I agree to the Privacy Policy and Terms.'

export const RESULT_EMAIL_CONSENT_TEXT =
  'I agree to Pawzzles emailing this result to me and understand my details will be handled in line with the Privacy Policy and Terms.'

export const MARKETING_CONSENT_TEXT =
  'Yes, send me Pawzzles tips, guides and product updates.'

export const NEWSLETTER_CONSENT_ERROR =
  'Please tick the box so we can send you Pawzzles emails.'

export const RESULT_EMAIL_CONSENT_ERROR =
  'Please confirm you are happy for us to email this result to you.'

export function consentLinkProps() {
  return {
    privacyUrl: SITE.privacyPolicyUrl,
    termsUrl: SITE.termsUrl,
  }
}
