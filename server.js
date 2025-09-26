const http = require('http')
const fs = require('fs').promises
const path = require('path')

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000
const PUBLIC_DIR = path.join(__dirname, 'public')

const CONTENT_TYPES = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
])

const serveFile = async (reqPath) => {
  let filePath = path.join(PUBLIC_DIR, reqPath)

  try {
    const stat = await fs.stat(filePath)
    if (stat.isDirectory()) {
      filePath = path.join(filePath, 'index.html')
    }
  } catch (_) {
    // fallback to index.html for unknown paths (SPA-friendly)
    filePath = path.join(PUBLIC_DIR, 'index.html')
  }

  const ext = path.extname(filePath).toLowerCase()
  const contentType = CONTENT_TYPES.get(ext) || 'application/octet-stream'
  const data = await fs.readFile(filePath)
  return { data, contentType }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host}`)
    const { data, contentType } = await serveFile(url.pathname)
    res.writeHead(200, { 'Content-Type': contentType })
    res.end(data)
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Internal Server Error')
    console.error(err)
  }
})

server.listen(PORT, () => {
  console.log(`Watermelon Farm running at http://localhost:${PORT}`)
})

