import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const senderEmail = process.env.SENDER_EMAIL || process.env.EMAIL_FROM || '';
const allowDevFallback = process.env.DEBUG_OTP === 'true' && process.env.NODE_ENV !== 'production';

export type SendEmailResult = {
  success: boolean;
  debug?: string;
  message?: string;
};

function hasResendConfig() {
  return Boolean(resendApiKey && senderEmail);
}

const resendClient = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendOtpEmail(email: string, code: string): Promise<SendEmailResult> {
  if (!hasResendConfig()) {
    if (!allowDevFallback) {
      const message = 'Resend não configurado. Configure RESEND_API_KEY e SENDER_EMAIL para enviar e-mails reais.';
      console.error('[auth/sendOtp] Resend config missing:', message);
      return {
        success: false,
        message,
      };
    }

    const message = `DEBUG OTP: Resend não configurado. OTP de desenvolvimento para ${email}: ${code}`;
    console.log('[auth/sendOtp] dev fallback:', message);
    return {
      success: true,
      debug: 'dev-fallback',
      message,
    };
  }

  const subject = 'Seu código Liggo';
  const text = `Seu código de login Liggo é ${code}. Ele expira em 10 minutos.`;
  const html = `
    <body style="margin:0;padding:0;background:#f8fafc;font-family:Inter,system-ui,sans-serif;color:#0f172a;">
      <table width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;background:#f8fafc;padding:24px 0;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:28px;overflow:hidden;box-shadow:0 20px 80px rgba(15,23,42,0.08);">
              <tr>
                <td style="padding:32px 32px 24px; text-align:center; background:linear-gradient(180deg,#f97316 0%,#fb923c 100%);">
                  <p style="margin:0;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.8);">Liggo</p>
                  <h1 style="margin:14px 0 0;color:#ffffff;font-size:28px;line-height:1.1;font-weight:700;">Seu código de acesso</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:32px 32px 24px;">
                  <p style="margin:0 0 18px;color:#475569;font-size:16px;line-height:1.7;">Use o código abaixo para entrar no Liggo. Ele expira em 10 minutos.</p>
                  <div style="margin:0 auto 24px;display:inline-flex;padding:0 18px;min-height:80px;align-items:center;justify-content:center;border-radius:20px;background:#f8fafc;border:1px solid #e2e8f0;">
                    <span style="font-size:34px;font-weight:800;letter-spacing:0.16em;color:#0f172a;">${code}</span>
                  </div>
                  <p style="margin:0;color:#64748b;font-size:14px;line-height:1.7;">Ainda não recebeu? Aguarde alguns instantes e verifique sua caixa de entrada ou a aba de promoções.</p>
                </td>
              </tr>
              <tr>
                <td style="padding:0 32px 32px;">
                  <div style="padding:18px 20px;border-radius:18px;background:#f8fafc;border:1px solid #e2e8f0;">
                    <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">Se você não solicitou este código, pode ignorar este e-mail. Liggo protege seu acesso com segurança moderna.</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:0 32px 32px;text-align:center;">
                  <p style="margin:0;font-size:12px;color:#94a3b8;">Liggo • Serviços locais</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  `;

  try {
    await resendClient!.emails.send({
      from: senderEmail,
      to: email,
      subject,
      html,
      text,
    });

    console.log('[auth/sendOtp] email enviado para', email);
    return {
      success: true,
      message: 'Email enviado com Resend',
    };
  } catch (error: any) {
    console.error('[auth/sendOtp] failed to send email with Resend', error);
    return {
      success: false,
      message: error?.message || 'Falha ao enviar o e-mail OTP',
    };
  }
}
