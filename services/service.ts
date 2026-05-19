import { getSupabaseServer } from '@/lib/supabase-server';
import { providers as fallbackProfessionals, services as fallbackCategories } from '@/seeds';
import type { Professional, ServiceCategory } from '@/types/flow';

function normalizeServiceCategory(service: typeof fallbackCategories[number]): ServiceCategory {
  return {
    id: service.slug,
    label: service.name,
    description: service.description,
    icon: service.icon,
    accent: service.accent,
  };
}

export async function getServiceCategories(): Promise<ServiceCategory[]> {
  if (!process.env.SUPABASE_URL) return fallbackCategories.map(normalizeServiceCategory);

  const supabase = getSupabaseServer() as any;
  const { data, error }: { data: any[] | null; error: any } = await supabase
    .from('services')
    .select('id,name,slug,description,icon,accent')
    .order('created_at', { ascending: true });

  if (error || !data?.length) return fallbackCategories.map(normalizeServiceCategory);

  return data.map((service: any) => ({
    id: service.slug,
    label: service.name,
    description: service.description ?? '',
    icon: service.icon ?? '🔧',
    accent: service.accent ?? 'from-orange-300 to-orange-500',
  }));
}

export async function getActiveProviders(): Promise<Professional[]> {
  if (!process.env.SUPABASE_URL) return fallbackProfessionals;

  const supabase = getSupabaseServer() as any;
  const { data, error }: { data: any[] | null; error: any } = await supabase
    .from('providers')
    .select('id,name,role,rating,avatar_url,description,specialties,city,distance,eta')
    .order('rating', { ascending: false })
    .limit(20);

  if (error || !data?.length) {
    return fallbackProfessionals.map((provider: any) => ({
      id: provider.id,
      name: provider.name,
      role: provider.role,
      rating: provider.rating,
      distance: provider.distance,
      eta: provider.eta,
      photo: provider.avatar_url,
      specialties: provider.specialties,
      city: provider.city,
      availability: 'Disponível agora',
      headline: provider.description,
    }));
  }

  return data.map((provider: any) => ({
    id: provider.id,
    name: provider.name,
    role: provider.role,
    rating: provider.rating ?? 4.8,
    distance: provider.distance ?? '1,4 km',
    eta: provider.eta ?? '10 min',
    photo: provider.avatar_url ?? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
    specialties: provider.specialties ?? provider.description ?? 'Profissional de confiança para o seu serviço.',
    city: provider.city ?? 'Região central',
    availability: 'Disponível agora',
    headline: provider.description ?? 'Especialista local com histórico de excelentes avaliações.',
  }));
}
