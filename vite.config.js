import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function siteOrigin() {
  const explicit = process.env.VITE_SITE_URL || process.env.SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  if (vercel) return `https://${String(vercel).replace(/^https?:\/\//, '')}`
  return ''
}

function invitationMetaPlugin() {
  return {
    name: 'invitation-meta',
    transformIndexHtml(html) {
      const origin = siteOrigin()
      const imagePath = '/images/couple.png'
      const ogImage = origin ? `${origin}${imagePath}` : imagePath
      const ogUrl = origin ? `${origin}/` : '/'
      return html.replaceAll('__OG_IMAGE__', ogImage).replaceAll('__OG_URL__', ogUrl)
    },
  }
}

export default defineConfig({
  plugins: [react(), invitationMetaPlugin()],
})
