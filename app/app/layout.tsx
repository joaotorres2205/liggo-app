import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/jwt';

export const metadata: Metadata = {
  title: 'Liggo App | Solicitar serviço',
  description: 'Fluxo de solicitação de serviço do Liggo para resolver seu problema em minutos.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default async function AppRouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const token = cookieStore.get('liggo_token')?.value;
  const user = token ? verifyToken(token as string) : null;
  if (!user) redirect('/auth');
  return <>{children}</>;
}
