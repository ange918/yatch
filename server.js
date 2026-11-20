import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { dispatchNodeContact, loadEnvFile } from './server/node-contact.js'

loadEnvFile('.env')
loadEnvFile('.env.local')

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, 'dist')
const port = Number(process.env.PORT || 3000)

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase()
  res.statusCode = 200
  res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream')
  fs.createReadStream(filePath).pipe(res)
}

const server = http.createServer(async (req, res) => {
  const pathname = (req.url || '/').split('?')[0]

  if (pathname === '/api/contact') {
    await dispatchNodeContact(req, res, { devMode: false })
    return
  }

  if (pathname.startsWith('/api/')) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ ok: false, error: 'not_found' }))
    return
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405
    res.end('Method Not Allowed')
    return
  }

  const safePath = path.normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, '')
  const candidate = path.join(distDir, safePath === '/' ? 'index.html' : safePath)

  if (candidate.startsWith(distDir) && fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
    sendFile(res, candidate)
    return
  }

  const indexPath = path.join(distDir, 'index.html')
  if (fs.existsSync(indexPath)) {
    sendFile(res, indexPath)
    return
  }

  res.statusCode = 404
  res.end('Not Found')
})

server.listen(port, '0.0.0.0', () => {
  console.log(`[server] listening on http://0.0.0.0:${port}`)
})
