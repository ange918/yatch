import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dispatchNodeContact, loadEnvFile } from './server/node-contact.js'

loadEnvFile('.env')
loadEnvFile('.env.local')

function contactApiPlugin() {
  const attach = (middlewares, devMode) => {
    middlewares.use('/api/contact', async (req, res, next) => {
      const path = (req.url || '/').split('?')[0]
      if (path !== '/' && path !== '') return next()
      await dispatchNodeContact(req, res, { devMode })
    })
  }

  return {
    name: 'contact-api-middleware',
    configureServer(server) {
      attach(server.middlewares, true)
    },
    configurePreviewServer(server) {
      attach(server.middlewares, false)
    },
  }
}

export default defineConfig({
  plugins: [react(), contactApiPlugin()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
})
