import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyOtp } from '@/services/auth';

export async function POST(req: Request) {
  const body = await req.json();
  const contact = body.contact || body.email;
  const via = body.via === 'whatsapp' ? 'whatsapp' : 'email';
  const code = body.code;

  if (!contact || !code) return NextResponse.json({ error: 'contact and code required' }, { status: 400 });

  try {
    const result = await verifyOtp(contact, code, via);
    const res = NextResponse.json({ ok: true, contact: result.contact, via });
    res.cookies.set('liggo_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Código inválido' }, { status: 400 });
  }
}
