import nodemailer from 'nodemailer'

type MailPayload = {
  to: string
  subject: string
  text: string
  html?: string
}

/**
 * Sends transactional mail through Nodemailer when SMTP credentials exist.
 * Without credentials the message is logged so local checkout and application
 * flows still complete successfully.
 */
export async function sendMail({ to, subject, text, html }: MailPayload) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.info('[kezia-craft:mail] SMTP is not configured. Message skipped.', { to, subject })
    return { delivered: false as const }
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  await transporter.sendMail({
    from: SMTP_FROM ?? `Kezia Craft <${SMTP_USER}>`,
    to,
    subject,
    text,
    html: html ?? `<p>${text.replace(/\n/g, '<br />')}</p>`,
  })

  return { delivered: true as const }
}
