'use client';

import { motion } from 'framer-motion';
import { fadeIn, fadeInUp, stagger } from '@/lib/motion';

const featureItems = [
  { label: 'Resposta em 10 min', value: '⚡' },
  { label: 'Profissionais locais', value: '📍' },
  { label: 'Conexão direta', value: '💬' },
];

export function HeroSection() {
  return (
    <motion.section
      id="home"
      className="relative overflow-hidden bg-slate-50 text-slate-950"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <div className="absolute inset-x-0 top-0 h-[22rem] bg-gradient-to-b from-orange-50/80 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div variants={fadeInUp} className="max-w-2xl">
            <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.35em] text-orange-500 shadow-sm">
              App de serviço local
            </span>
            <h1 className="mt-8 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-5xl lg:text-6xl">
              Um app simples para encontrar o profissional certo perto de você.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Rápido, direto e desenhado para ser usado no dia a dia. O Liggo combina atendimento local com a leveza de um app moderno.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <motion.div
                variants={fadeIn}
                className="flex min-w-0 items-center gap-3 overflow-hidden rounded-full border border-slate-200 bg-white px-4 py-3 shadow-sm shadow-slate-200 sm:max-w-xl"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-500 shadow-sm">
                  ⚡
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">Digite seu problema</p>
                  <p className="text-sm text-slate-500">Ex.: eletricista para tomada, conserto de vazamento</p>
                </div>
              </motion.div>
              <motion.button
                variants={fadeIn}
                type="button"
                aria-label="Baixar Liggo"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex h-14 items-center justify-center rounded-full bg-orange-500 px-8 text-sm font-semibold text-white shadow-sm shadow-orange-300/30 transition duration-300 ease-out hover:bg-orange-400"
              >
                Baixar Liggo
              </motion.button>
            </div>

            <motion.div
              variants={fadeIn}
              className="mt-5 flex flex-col gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 shadow-sm shadow-slate-200 sm:flex-row sm:items-center"
            >
              <span className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm">
                App real
              </span>
              <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-600">
                  Reforço de marca para um app pronto, simples e confiável.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm">
                    App Store
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm">
                    Google Play
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-10 grid gap-4 sm:grid-cols-3">
              {featureItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.75rem] border border-slate-200 bg-white px-5 py-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-orange-200"
                >
                  <p className="text-3xl">{item.value}</p>
                  <p className="mt-4 text-sm font-semibold text-slate-900">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={fadeIn} className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.15)] sm:p-8">
            <div className="relative grid gap-5 rounded-[1.75rem] bg-slate-50 p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Serviço destacado</p>
                  <p className="mt-3 text-lg font-semibold text-slate-950">Conserto de vazamento</p>
                </div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-orange-100 text-orange-500 shadow-sm">
                  🛠️
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: 'Profissional a 2 km', subtitle: 'Disponível agora' },
                  { title: 'Aceite em 1 clique', subtitle: 'Fluxo direto no WhatsApp' },
                ].map((item) => (
                  <div key={item.title} className="rounded-[1.75rem] border border-slate-200 bg-white px-5 py-5 transition duration-300 hover:-translate-y-0.5 hover:border-orange-200">
                    <p className="text-sm text-slate-500">{item.subtitle}</p>
                    <p className="mt-3 text-base font-semibold text-slate-950">{item.title}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Liggo em ação</p>
                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-2xl font-semibold text-slate-950">Aproximação rápida</p>
                    <p className="mt-1 text-sm text-slate-500">Encontre o prestador ideal sem perder tempo.</p>
                  </div>
                  <span className="inline-flex h-12 min-w-[3rem] items-center justify-center rounded-2xl bg-slate-100 text-orange-500 shadow-sm">
                    05:32
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
