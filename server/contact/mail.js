import nodemailer from 'nodemailer'
import { isEmail } from './validate.js'

function parseFrom(value) {
  const raw = String(value || '').trim()
  if (!raw || /[\r\n]/.test(raw)) return null
  const wrapped = raw.match(/^(?:"?([^"<>]{1,80})"?\s*)?<([^<>\s]+)>$/)
  if (wrapped) {
    const email = wrapped[2]
    const name = (wrapped[1] || '').trim()
    if (!isEmail(email) || (name && /[<>]/.test(name))) return null
    return name ? `${name} <${email}>` : email
  }
  return isEmail(raw) ? raw : null
}

/**
 * Resend si RESEND_API_KEY est défini, sinon SMTP si les quatre variables sont là.
 * Ne contacte le réseau que lors de send().
 */
export function resolveMailer(env, fetchImpl = globalThis.fetch) {
  const resendKey = (env.RESEND_API_KEY || '').trim()
  if (resendKey) {
    const from = parseFrom(env.MAIL_FROM)
    if (!from) return { provider: 'resend', error: 'missing_from' }
    return {
      provider: 'resend',
      from,
      async send(message) {
        let response
        try {
          response = await fetchImpl('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${resendKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from,
              to: [message.to],
              reply_to: message.replyTo,
              subject: message.subject,
              html: message.html,
              text: message.text,
              attachments: message.attachments?.length
                ? message.attachments.map((file) => ({
                  filename: file.filename,
                  content: file.content.toString('base64'),
                  content_type: file.contentType,
                }))
                : undefined,
            }),
            signal: AbortSignal.timeout(12_000),
          })
        } catch (error) {
          console.error('[contact] resend_network', error?.name || 'error')
          throw Object.assign(new Error('send_failed'), { code: 'send_failed' })
        }
        if (!response.ok) {
          console.error('[contact] resend_http', response.status)
          throw Object.assign(new Error('send_failed'), { code: 'send_failed' })
        }
      },
    }
  }

  const host = (env.SMTP_HOST || '').trim()
  const port = Number((env.SMTP_PORT || '').trim())
  const user = (env.SMTP_USER || '').trim()
  const pass = (env.SMTP_PASS || '').trim()
  if (host && Number.isInteger(port) && port > 0 && port < 65536 && user && pass) {
    const from = parseFrom(env.MAIL_FROM) || (isEmail(user) ? user : null)
    if (!from) return { provider: 'smtp', error: 'missing_from' }
    return {
      provider: 'smtp',
      from,
      async send(message) {
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
        })
        try {
          await transporter.sendMail({
            from,
            to: message.to,
            replyTo: message.replyTo,
            subject: message.subject,
            text: message.text,
            html: message.html,
            attachments: (message.attachments || []).map((file) => ({
              filename: file.filename,
              content: file.content,
              contentType: file.contentType,
            })),
          })
        } catch (error) {
          console.error('[contact] smtp_failed', error?.code || 'error')
          throw Object.assign(new Error('send_failed'), { code: 'send_failed' })
        }
      },
    }
  }

  return null
}
