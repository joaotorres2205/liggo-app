import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('liggo_token')?.value;
  if (!token) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

  const user = verifyToken(token);
  if (!user?.sub) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

  const { serviceId, providerId, description, location } = await req.json();
  if (!serviceId || !description || !location) {
    return NextResponse.json({ error: 'serviceId, description and location are required' }, { status: 400 });
  }

  const supabase = getSupabaseServer() as any;
  const { data, error } = await supabase.from('service_requests').insert({
    user_id: user.sub,
    provider_id: providerId || null,
    service_id: serviceId,
    description,
    location,
    status: 'pending',
    created_at: new Date().toISOString(),
  }).select().single();

  if (error || !data) return NextResponse.json({ error: error?.message || 'Não foi possível criar solicitação' }, { status: 500 });
  return NextResponse.json({ ok: true, request: data });
}
