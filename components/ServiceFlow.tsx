'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { fadeIn, fadeInUp } from '@/lib/motion';
import type { Professional, ServiceCategory } from '@/types/flow';

const problemSuggestions = [
  'Tomada que não funciona',
  'Vazamento no banheiro',
  'Montar rack e armário',
  'Trocar lâmpada queimada',
];

const locationPresets = ['Minha casa', 'Próximo ao metrô', 'Escritório', 'Perto da av. principal'];

const stepMeta = [
  { title: 'Escolha do serviço', subtitle: 'Selecione o tipo de trabalho que você precisa.' },
  { title: 'Descrição do problema', subtitle: 'Conte rapidamente o que aconteceu.' },
  { title: 'Localização', subtitle: 'Onde o serviço deve ser realizado?' },
  { title: 'Buscando prestadores', subtitle: 'Liggo está encontrando alguém perto de você.' },
  { title: 'Profissionais disponíveis', subtitle: 'Escolha quem pode resolver agora.' },
];

function ServiceCard({
  category,
  selected,
  onSelect,
}: {
  category: ServiceCategory;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      aria-pressed={selected}
      layout
      className={`group relative flex w-full min-h-[14rem] flex-col justify-between overflow-hidden rounded-[1.75rem] border px-5 py-5 text-left transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-white ${
        selected
          ? 'border-orange-300 bg-orange-50 shadow-md shadow-orange-100'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${category.accent} text-2xl text-white shadow-sm`}>{category.icon}</div>
        <div className="min-w-0">
          <p className="text-base font-semibold text-slate-950">{category.label}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between gap-3 text-sm font-semibold text-slate-600">
        <span>{selected ? 'Selecionado • Atendimento rápido' : 'Selecionar serviço'}</span>
        {selected ? (
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white shadow-sm">✓</span>
        ) : null}
      </div>
    </motion.button>
  );
}

function ProfessionalCard({ professional, onRequest, requesting }: { professional: Professional; onRequest: () => void; requesting: boolean }) {
  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-[0_20px_60px_-30px_rgba(15,23,42,0.18)]"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <img
          src={professional.photo}
          alt={professional.name}
          className="h-16 w-16 rounded-3xl object-cover shadow-sm"
        />
        <div className="min-w-0 space-y-1">
          <p className="text-lg font-semibold text-slate-950">{professional.name}</p>
          <p className="text-sm text-slate-500">{professional.role}</p>
          {professional.city ? <p className="text-sm text-slate-500">📍 {professional.city}</p> : null}
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-emerald-700">
            {professional.availability ?? 'Disponível agora'}
          </span>
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
            {professional.eta}
          </span>
        </div>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">⭐ {professional.rating}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">📍 {professional.distance}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Top local</span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{professional.specialties}</p>
      <motion.button
        type="button"
        onClick={onRequest}
        whileTap={{ scale: 0.97 }}
        disabled={requesting}
        className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-orange-500 bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-orange-200 transition disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
      >
        {requesting ? 'Solicitando...' : `Chamar ${professional.name}`}
      </motion.button>
    </motion.div>
  );
}

function StepPill({ index, label, active }: { index: number; label: string; active: boolean }) {
  return (
    <div className={`flex items-center gap-2 rounded-full px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] ${active ? 'bg-orange-500/10 text-orange-600' : 'bg-slate-100 text-slate-500'}`}>
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm shadow-sm">{index}</span>
      {label}
    </div>
  );
}

export function ServiceFlow({
  serviceCategories,
  professionals,
}: {
  serviceCategories: ServiceCategory[];
  professionals: Professional[];
}) {
  const defaultService: ServiceCategory = serviceCategories[0] ?? {
    id: 'default-service',
    label: 'Serviço indisponível',
    description: 'Nenhum serviço encontrado no momento.',
    icon: '🔧',
    accent: 'from-orange-300 to-orange-500',
  };

  const [step, setStep] = useState(1);
  const [service, setService] = useState<ServiceCategory>(defaultService);
  const [problem, setProblem] = useState('A tomada da sala parou de funcionar e preciso de ajuda rápida.');
  const [location, setLocation] = useState('Rua das Flores, 145');
  const [searchStage, setSearchStage] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [usingLocation, setUsingLocation] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [requestMessage, setRequestMessage] = useState<string | null>(null);

  const canContinue = useMemo(() => {
    if (step === 1) return !!service;
    if (step === 2) return problem.trim().length > 15;
    if (step === 3) return location.trim().length > 5;
    return true;
  }, [location, problem, service, step]);

  const actionLabel = step === 5 ? 'Selecione um prestador' : step === 4 ? 'Buscando...' : 'Continuar';

  useEffect(() => {
    let first: number | undefined;
    let second: number | undefined;
    let third: number | undefined;

    if (step === 4) {
      setShowResults(false);
      setSearchStage(0);
      first = window.setTimeout(() => setSearchStage(1), 320);
      second = window.setTimeout(() => setSearchStage(2), 950);
      third = window.setTimeout(() => {
        setSearchStage(3);
        setShowResults(true);
        setStep(5);
      }, 2000);
    }

    return () => {
      window.clearTimeout(first);
      window.clearTimeout(second);
      window.clearTimeout(third);
    };
  }, [step]);

  const handleGeo = () => {
    if (!navigator.geolocation) {
      setLocation('Av. Paulista, 1421');
      return;
    }

    setUsingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(`Minha localização • ${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`);
        setUsingLocation(false);
      },
      () => {
        setLocation('Av. Paulista, 1421');
        setUsingLocation(false);
      },
      { timeout: 5000 },
    );
  };

  const nextStep = () => {
    if (step === 3) {
      setStep(4);
      return;
    }
    setStep((current) => Math.min(current + 1, 5));
  };

  const prevStep = () => {
    if (step === 4 && showResults) {
      setShowResults(false);
    }
    setStep((current) => Math.max(current - 1, 1));
  };

  const filteredProfessionals = useMemo(
    () => professionals.filter((professional) => professional.role.toLowerCase().includes(service.label?.toLowerCase() ?? '')),
    [professionals, service],
  );

  async function requestService(providerId: string) {
    setRequesting(true);
    setRequestMessage(null);

    try {
      const res = await fetch('/api/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: service.id,
          providerId,
          description: problem,
          location,
        }),
      });

      const json = await res.json();
      if (json?.ok) {
        setRequestMessage('Solicitação enviada com sucesso! O prestador receberá sua solicitação em instantes.');
      } else {
        setRequestMessage(json?.error || 'Falha ao enviar solicitação.');
      }
    } catch (error: any) {
      setRequestMessage(error?.message || 'Falha de rede ao enviar solicitação.');
    } finally {
      setRequesting(false);
    }
  }

  return (
    <section className="bg-slate-50 px-4 pt-3 pb-32 sm:px-6 sm:pt-4 sm:pb-36">
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-slate-200/40 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-orange-500">Fluxo rápido de serviço</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Resolva seu problema em minutos.
              </h1>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-[0.85rem] font-semibold text-slate-600 shadow-sm">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-orange-500" />
              {step} / 5 etapas
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-3 text-center text-sm text-slate-700 shadow-sm">
              <strong className="block text-xl text-slate-950">{professionals.length}</strong>
              prestadores ativos
            </div>
            <div className="rounded-3xl bg-slate-50 p-3 text-center text-sm text-slate-700 shadow-sm">
              <strong className="block text-xl text-slate-950">{serviceCategories.length}</strong>
              categorias disponíveis
            </div>
            <div className="rounded-3xl bg-slate-50 p-3 text-center text-sm text-slate-700 shadow-sm">
              <strong className="block text-xl text-slate-950">15 min</strong>
              resposta média
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">Fluxo móvel, direto e rápido — pensado para resolver seu problema com a experiência de um app premium.</p>
        </div>

        <div className="rounded-[2rem] bg-white/95 p-4 shadow-2xl shadow-slate-200/40 sm:p-5">
          <div className="mb-3 overflow-x-auto pb-1">
            <div className="flex min-w-[calc(100%+1rem)] gap-2 sm:gap-3">
              {stepMeta.map((item, index) => (
                <StepPill key={item.title} index={index + 1} label={item.title} active={index + 1 === step} />
              ))}
            </div>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="space-y-5"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-orange-500">{stepMeta[step - 1].title}</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">{stepMeta[step - 1].subtitle}</h2>
            </div>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  {serviceCategories.map((category) => (
                    <ServiceCard
                      key={category.id}
                      category={category}
                      selected={service.id === category.id}
                      onSelect={() => setService(category)}
                    />
                  ))}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-5"
                >
                  <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 shadow-sm">
                    <label htmlFor="problem" className="block text-sm font-medium text-slate-700">
                      Descrição do problema
                    </label>
                    <textarea
                      id="problem"
                      value={problem}
                      onChange={(event) => setProblem(event.target.value)}
                      rows={6}
                      placeholder="Ex.: Preciso de um eletricista porque a tomada da sala não funciona."
                      className="mt-3 w-full resize-none rounded-3xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-900">Sugestões rápidas</p>
                    <div className="flex flex-wrap gap-3">
                      {problemSuggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => setProblem(suggestion)}
                          className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:border-orange-300 hover:bg-orange-50"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-5"
                >
                  <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                    <label htmlFor="location" className="block text-sm font-medium text-slate-700">
                      Onde o serviço deve acontecer?
                    </label>
                    <div className="mt-3 flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        placeholder="Digite seu endereço ou local"
                        className="w-full bg-transparent text-sm text-slate-900 outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {locationPresets.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setLocation(preset)}
                        className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-700 shadow-sm transition hover:border-orange-300 hover:bg-orange-50"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleGeo}
                    className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
                  >
                    {usingLocation ? 'Atualizando localização...' : 'Usar minha localização'}
                  </button>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-orange-200 shadow-inner shadow-orange-200/30">
                    <div className="relative h-16 w-16 rounded-full bg-white shadow-sm">
                      <div className="absolute inset-0 animate-ping rounded-full bg-orange-300/30" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Buscando agora</p>
                    <h3 className="text-2xl font-semibold text-slate-950">Encontrando o melhor prestador perto de você</h3>
                    <p className="text-sm leading-6 text-slate-600">Aguarde enquanto o Liggo combina sua solicitação com profissionais disponíveis e próximos.</p>
                  </div>
                  <div className="grid gap-4">
                    <div className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="text-sm font-semibold text-slate-950">{searchStage >= 1 ? '3 prestadores encontrados' : 'Buscando prestadores...'}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {searchStage === 0 && 'Analisando descrição e localização.'}
                        {searchStage === 1 && 'Verificando disponibilidade e distância.'}
                        {searchStage === 2 && 'Preparando o melhor match para você.'}
                        {searchStage === 3 && 'Pronto! Mostrando profissionais.'}
                      </p>
                    </div>
                    <div className="overflow-hidden rounded-3xl bg-slate-100 p-4">
                      <div className="h-2 w-full rounded-full bg-slate-200">
                        <div className={`h-2 rounded-full bg-orange-500 transition-all duration-500 ${searchStage === 0 ? 'w-16' : searchStage === 1 ? 'w-48' : searchStage === 2 ? 'w-72' : 'w-full'}`} />
                      </div>
                    </div>
                    <div className="grid gap-3">
                      {[1, 2].map((item) => (
                        <div key={item} className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
                          <div className="h-3 w-28 rounded-full bg-slate-200" />
                          <div className="mt-3 h-3 w-full rounded-full bg-slate-200" />
                          <div className="mt-2 h-3 w-3/5 rounded-full bg-slate-200" />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                    <p className="text-sm font-semibold text-slate-950">Resumo</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Serviço: <span className="font-semibold text-slate-950">{service.label}</span> • Local: <span className="font-semibold text-slate-950">{location}</span>
                    </p>
                    <p className="mt-2 text-sm text-slate-500">Melhores profissionais ordenados por avaliação, distância e tempo estimado.</p>
                  </div>
                  {requestMessage ? (
                    <div className="rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-700">{requestMessage}</div>
                  ) : null}
                  <div className="space-y-4">
                    {filteredProfessionals.map((professional) => (
                      <ProfessionalCard key={professional.id} professional={professional} onRequest={() => requestService(professional.id)} requesting={requesting} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="mt-6 hidden flex-col gap-3 sm:flex sm:flex-row sm:items-center sm:justify-end">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Voltar
              </button>
            ) : null}
            <button
              type="button"
              onClick={nextStep}
              disabled={!canContinue || step >= 4}
              className="inline-flex min-w-[10rem] items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
            >
              {actionLabel}
            </button>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md shadow-[0_-18px_50px_-35px_rgba(15,23,42,0.2)] sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1 || step === 4}
            className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
          >
            Voltar
          </button>
          <button
            type="button"
            onClick={nextStep}
            disabled={!canContinue || step >= 4}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
