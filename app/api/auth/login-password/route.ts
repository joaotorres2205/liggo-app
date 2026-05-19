import { NextResponse } from 'next/server';
import { loginWithPassword } from '@/services/auth';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ error: 'email and password required' }, { status: 400 });

  try {
    const result = await loginWithPassword(email, password);
    const res = NextResponse.json({ ok: true });
    res.cookies.set('liggo_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Credenciais inválidas' }, { status: 400 });
  }
}
