import { NextResponse } from 'next/server';
import { setPassword } from '@/services/auth';

export async function POST(req: Request) {
  const body = await req.json();
  const contact = body.contact || body.email;
  const via = body.via === 'whatsapp' ? 'whatsapp' : 'email';
  const { password } = body;

  if (!contact || !password) return NextResponse.json({ error: 'contact and password required' }, { status: 400 });

  try {
    await setPassword(contact, via, password);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Não foi possível salvar a senha' }, { status: 400 });
  }
}
