import { NextResponse } from 'next/server';
import { sendOtp } from '@/services/auth';
import { normalizePhoneNumber } from '@/lib/phone';

export async function POST(req: Request) {
  const body = await req.json();
  const contact = body.contact || body.email;
  const via = body.via === 'whatsapp' ? 'whatsapp' : 'email';
  const name = body.name?.trim();

  if (!contact) return NextResponse.json({ error: 'contact required' }, { status: 400 });
  if (!name) return NextResponse.json({ error: 'name required' }, { status: 400 });
  if (via === 'whatsapp' && !normalizePhoneNumber(contact)) {
    return NextResponse.json({ error: 'WhatsApp inválido. Use +55DDD999999999 ou formato internacional válido.' }, { status: 400 });
  }

  try {
    const result = await sendOtp(contact, via, name);
    const showDevCode = process.env.DEBUG_OTP === 'true' && process.env.NODE_ENV !== 'production';
    return NextResponse.json({
      ok: true,
      via,
      hint: 'OTP enviado',
      code: showDevCode ? result.code : undefined,
      debug: result?.debug,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Não foi possível enviar o código' }, { status: 500 });
  }
}
