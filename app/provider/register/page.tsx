import { ProviderRegisterForm } from '@/components/ProviderRegisterForm';
import { getServiceCategories } from '@/services/service';
import type { ServiceCategory } from '@/types/flow';

export default async function RegisterProviderPage() {
  const services = await getServiceCategories();

  return (
    <div className="min-h-screen bg-slate-50 pb-10 text-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/30">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-orange-500">Onboarding de prestador</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Crie seu perfil profissional no Liggo</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Compartilhe seus serviços, sua região e sua disponibilidade para aparecer para clientes reais agora.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600 shadow-sm">
                  <p className="font-semibold text-slate-900">Mais visibilidade</p>
                  <p className="mt-2">Seu perfil aparece para clientes com serviço ativo na região.</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600 shadow-sm">
                  <p className="font-semibold text-slate-900">Confiança</p>
                  <p className="mt-2">Avaliações e especialidades ajudam sua oferta a subir primeiro.</p>
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-lg shadow-slate-950/10">
              <p className="text-sm uppercase tracking-[0.28em] text-orange-300">Perfil ativo</p>
              <h2 className="mt-4 text-3xl font-semibold">Cadastre-se em minutos</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">Comece a ser encontrado por clientes que precisam de serviços domésticos e de manutenção.</p>
              <div className="mt-6 grid gap-4 text-sm text-slate-200">
                <div className="rounded-3xl bg-slate-900/80 p-4">
                  <p className="font-semibold">Prestadores</p>
                  <p className="mt-2">+ 120 profissionais ativos</p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-4">
                  <p className="font-semibold">Solicitações</p>
                  <p className="mt-2">Respostas em menos de 15 minutos</p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-4">
                  <p className="font-semibold">Região</p>
                  <p className="mt-2">Atendimento em São Paulo, Rio e mais</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ProviderRegisterForm services={services as ServiceCategory[]} />
        </div>
      </div>
    </div>
  );
}
