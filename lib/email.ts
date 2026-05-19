import nodemailer from 'nodemailer';

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const emailFrom = process.env.EMAIL_FROM || 'Liggo <no-reply@liggo.app>';

export type SendEmailResult = {
  success: boolean;
  debug?: string;
  message?: string;
};

function hasSmtpConfig() {
  return Boolean(smtpHost && smtpUser && smtpPass);
}

export async function sendOtpEmail(email: string, code: string): Promise<SendEmailResult> {
  if (!hasSmtpConfig()) {
    const message = `SMTP não configurado. OTP de desenvolvimento para ${email}: ${code}`;
    console.log('[auth/sendOtp] dev fallback:', message);
    return {
      success: true,
      debug: 'dev-fallback',
      message,
    };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const subject = 'Seu código Liggo';
  const text = `Seu código de login Liggo é ${code}. Ele expira em 10 minutos.`;
  const html = `
    <div style="font-family:system-ui, sans-serif; color:#0f172a;">
      <h2 style="margin-bottom:12px;">Seu código Liggo</h2>
      <p style="font-size:16px; margin:0 0 12px 0;">Use o código abaixo para entrar no Liggo:</p>
      <p style="font-size:28px; font-weight:700; margin:0 0 16px 0;">${code}</p>
      <p style="font-size:14px; color:#475569; margin:0;">O código expira em 10 minutos.</p>
    </div>
  `;

  const info = await transporter.sendMail({
    from: emailFrom,
    to: email,
    subject,
    text,
    html,
  });

  console.log('[auth/sendOtp] email enviado para', email, 'messageId=', info.messageId);
  return {
    success: true,
    message: info.messageId,
  };
}
