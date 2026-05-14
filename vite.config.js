import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const publicEnv = {
  __PAWZZLES_SITE_URL__: JSON.stringify(
    process.env.SITE_URL || 'https://resources.pawzzles.co.uk',
  ),
  __PAWZZLES_SHOP_URL__: JSON.stringify(
    process.env.SHOP_URL || 'https://pawzzles.co.uk',
  ),
  __PAWZZLES_PRIVACY_URL__: JSON.stringify(
    process.env.PRIVACY_URL || 'https://pawzzles.co.uk/privacy-policy',
  ),
  __PAWZZLES_GTM_CONTAINER_ID__: JSON.stringify(
    process.env.GTM_CONTAINER_ID || 'GTM-TBF7XNZ2',
  ),
}

export default defineConfig({
  plugins: [react()],
  define: publicEnv,
})
