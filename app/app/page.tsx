import { AppNavBar } from '@/components/AppNavBar';
import { ServiceFlow } from '@/components/ServiceFlow';
import { getActiveProviders, getServiceCategories } from '@/services/service';
import type { Professional, ServiceCategory } from '@/types/flow';

export default async function LiggoAppPage() {
  const [serviceCategories, professionals] = await Promise.all([
    getServiceCategories(),
    getActiveProviders(),
  ]);

  const activeCount = professionals.length;
  const categoryCount = serviceCategories.length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <AppNavBar />
      <main>
        <section className="bg-white pb-8 pt-6 shadow-sm shadow-slate-200/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 sm:p-8 lg:grid-cols-[2fr_1fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-orange-500">Marketplace instantâneo</p>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  Resolva seu serviço em menos de 5 minutos.
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                  Serviços locais com profissionais prontos para atender agora. Simples, rápido e confiável como um app premium.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 font-semibold text-slate-700 shadow-sm">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    {activeCount} prestadores ativos
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 font-semibold text-slate-700 shadow-sm">
                    <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                    {categoryCount} categorias disponíveis
                  </span>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-950 p-4 text-center text-white shadow-sm shadow-slate-900/10">
                  <p className="text-2xl font-semibold">{activeCount}</p>
                  <p className="mt-1 text-[0.65rem] uppercase tracking-[0.32em] text-slate-300">Prestadores online</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-semibold text-slate-950">{categoryCount}</p>
                  <p className="mt-1 text-[0.65rem] uppercase tracking-[0.32em] text-slate-500">Categorias</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-semibold text-slate-950">15 min</p>
                  <p className="mt-1 text-[0.65rem] uppercase tracking-[0.32em] text-slate-500">Tempo médio</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ServiceFlow serviceCategories={serviceCategories} professionals={professionals} />
      </main>
    </div>
  );
}
