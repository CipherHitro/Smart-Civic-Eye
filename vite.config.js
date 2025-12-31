import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "./",
  server : {
    allowedHosts : ['.ngrok-free.app']
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate', // Updates app immediately when you deploy new changes
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Smart Civic Eye',
        short_name: 'CivicEye',
        description: 'AI-Powered Citizen Reporting Agent',
        theme_color: '#2563EB', // Your Electric Blue
        background_color: '#ffffff',
        display: 'standalone', // Makes it look like a native app (no browser bar)
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          // {
          //   src: '/pwa-512x512.png',
          //   sizes: '512x512',
          //   type: 'image/png',
          //   purpose: 'any'
          // },
          // {
          //   src: '/pwa-maskable-192x192.png',
          //   sizes: '192x192',
          //   type: 'image/png',
          //   purpose: 'maskable'
          // },
          // {
          //   src: '/pwa-maskable-512x512.png',
          //   sizes: '512x512',
          //   type: 'image/png',
          //   purpose: 'maskable'
          // }
        ]
      }
    })
  ]
})