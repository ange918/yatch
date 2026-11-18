const INPUT_MAX_BYTES = 10 * 1024 * 1024
const UPLOAD_MAX_BYTES = Math.floor(1.2 * 1024 * 1024)

function fail(code) {
  const error = new Error(code)
  error.code = code
  return error
}

function normalizeType(file) {
  const type = (file.type || '').toLowerCase()
  if (type === 'image/jpg' || type === 'image/jpeg') return 'image/jpeg'
  if (type === 'image/png') return 'image/png'
  if (type === 'application/pdf' || type === 'application/x-pdf') return 'application/pdf'
  const ext = file.name.split('.').pop()?.toLowerCase()
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg'
  if (ext === 'png') return 'image/png'
  if (ext === 'pdf') return 'application/pdf'
  return ''
}

function readAsDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(fail('file'))
    reader.readAsDataURL(blob)
  })
}

export async function filesPayload(files) {
  const out = {}
  for (const [key, file] of Object.entries(files)) {
    if (!file) continue
    if (file.size <= 0 || file.size > INPUT_MAX_BYTES) throw fail('file')
    const type = normalizeType(file)
    if (!type) throw fail('file')
    if (type === 'application/pdf' && file.size > UPLOAD_MAX_BYTES) throw fail('file')
    let blob = file
    let sendType = type
    let name = file.name
    if (type !== 'application/pdf' && file.size > UPLOAD_MAX_BYTES) {
      blob = await shrinkImage(file)
      if (!blob || blob.size > UPLOAD_MAX_BYTES) throw fail('file')
      sendType = 'image/jpeg'
      name = file.name.replace(/\.[^.]+$/, '') + '.jpg'
    }
    const dataUrl = await readAsDataUrl(blob)
    const data = dataUrl.includes(',') ? dataUrl.split(',')[1] : ''
    if (!data) throw fail('file')
    out[key] = { name, type: sendType, data }
  }
  return out
}

function shrinkImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const image = new Image()
    image.onload = () => {
      const maxSide = 1600
      const longest = Math.max(image.width, image.height) || 1
      const scale = Math.min(1, maxSide / longest)
      const canvas = document.createElement('canvas')
      canvas.width = Math.max(1, Math.round(image.width * scale))
      canvas.height = Math.max(1, Math.round(image.height * scale))
      const ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)
      canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.72)
    }
    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(fail('file'))
    }
    image.src = url
  })
}

export function requestErrorMessage(t, error) {
  const code = error?.code
  if (code === 'validation') return t('request.errorValidation')
  if (code === 'rate_limit') return t('request.errorRate')
  if (code === 'spam') return t('request.errorSpam')
  if (code === 'file') return t('request.errorFile')
  if (code === 'network') return t('request.errorNetwork')
  return t('request.errorSend')
}

export async function submitRequest(payload) {
  let response
  try {
    response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw fail('network')
  }
  let data = {}
  try {
    data = await response.json()
  } catch {
    data = {}
  }
  if (!response.ok || data.ok !== true) throw fail(data.error || 'send_failed')
  return data
}
