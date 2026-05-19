import { getSupabaseServer } from '@/lib/supabase-server';

export interface RegisterProviderPayload {
  name: string;
  role: string;
  city: string;
  phone: string;
  description: string;
  specialties: string;
  serviceIds: string[];
}

export async function registerProvider(userId: string, payload: RegisterProviderPayload) {
  const supabase = getSupabaseServer() as any;

  if (payload.phone) {
    const { error: userError } = await supabase
      .from('users')
      .update({ phone: payload.phone, name: payload.name })
      .eq('id', userId);

    if (userError) throw new Error(userError.message);
  }

  const { error } = await supabase.from('providers').upsert(
    {
      id: userId,
      user_id: userId,
      name: payload.name,
      role: payload.role,
      description: payload.description,
      specialties: payload.specialties,
      service_ids: payload.serviceIds,
      city: payload.city,
      rating: 4.9,
      avatar_url: `https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80`,
      distance: '1,5 km',
      eta: '12 min',
      created_at: new Date().toISOString(),
    },
    { onConflict: 'id' },
  );

  if (error) throw new Error(error.message);
  return true;
}
