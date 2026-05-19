import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { registerProvider } from '@/services/provider';

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('liggo_token')?.value;
  if (!token) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

  const user = verifyToken(token);
  if (!user?.sub) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

  const { name, role, city, phone, description, specialties, serviceIds } = await req.json();

  if (!name || !role || !city || !phone || !serviceIds?.length) {
    return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 });
  }

  try {
    await registerProvider(user.sub, {
      name,
      role,
      city,
      phone,
      description,
      specialties,
      serviceIds,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message || 'Erro ao cadastrar prestador' }, { status: 500 });
  }
}
