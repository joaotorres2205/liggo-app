import crypto from 'crypto';
import dotenv from 'dotenv';
import { getSupabaseServer } from '@/lib/supabase-server';
import { providers, services } from './index';

dotenv.config({ path: '.env.local' });
dotenv.config();

function stableUuidFromString(value: string) {
  const hash = crypto.createHash('sha256').update(value).digest('hex');
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}-${hash.slice(16, 20)}-${hash.slice(20, 32)}`;
}

function ensureUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)
    ? value
    : stableUuidFromString(value);
}

async function seed() {
  const supabase = getSupabaseServer() as any;

  console.log('Seedando serviços...');
  for (const service of services) {
    const { error } = await supabase
      .from('services')
      .upsert(
        {
          id: service.id,
          name: service.name,
          slug: service.slug,
          icon: service.icon,
          description: service.description,
          category: service.category,
          accent: service.accent,
          image_url: service.image_url,
          created_at: new Date().toISOString(),
        },
        { onConflict: 'id' },
      );

    if (error) {
      throw new Error(`Erro ao seedar serviço ${service.slug}: ${error.message}`);
    }
  }

  console.log('Seedando usuários e prestadores...');
  for (const provider of providers) {
    const userId = ensureUuid(provider.user_id);
    const { error: userError } = await supabase.from('users').upsert(
      {
        id: userId,
        name: provider.name,
        email: `${provider.id}@liggo.app`,
        phone: null,
        password_hash: null,
        otp_code_hash: null,
        otp_expires: null,
        created_at: new Date().toISOString(),
      },
      { onConflict: 'id' },
    );

    if (userError) {
      throw new Error(`Erro ao seedar usuário do prestador ${provider.id}: ${userError.message}`);
    }

    const { error: providerError } = await supabase
      .from('providers')
      .upsert(
        {
          id: provider.id,
          user_id: userId,
          name: provider.name,
          role: provider.role,
          description: provider.description,
          specialties: provider.specialties,
          service_ids: provider.service_ids,
          rating: provider.rating,
          city: provider.city,
          avatar_url: provider.avatar_url,
          distance: provider.distance,
          eta: provider.eta,
          created_at: provider.created_at,
        },
        { onConflict: 'id' },
      );

    if (providerError) {
      throw new Error(`Erro ao seedar prestador ${provider.id}: ${providerError.message}`);
    }
  }

  console.log('Seed concluída com sucesso.');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
