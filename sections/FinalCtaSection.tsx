'use client';

import { motion } from 'framer-motion';
import { fadeIn, fadeInUp } from '@/lib/motion';

export function FinalCtaSection() {
  return (
    <motion.section
      id="cta"
      className="bg-slate-50 text-slate-950"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.15)] sm:p-12">
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <motion.div variants={fadeIn} className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-500">Resolva seu problema agora</p>
              <h2 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Chegou a hora de ter atendimento local instantâneo com máxima confiança.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Um fluxo pensado para quem quer resultado rápido. O Liggo conecta você ao serviço certo sem perda de tempo.
              </p>
            </motion.div>
            <motion.div variants={fadeIn} className="space-y-5 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200 sm:p-8">
              <div className="flex items-center justify-between gap-3 rounded-3xl bg-white px-4 py-4 shadow-sm shadow-slate-200">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Pronto para pedir</p>
                  <p className="mt-2 text-xl font-semibold text-slate-950">Tudo em um clique</p>
                </div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-orange-100 text-orange-500 shadow-sm">
                  🚀
                </span>
              </div>
              <p className="text-sm text-slate-600">Sem cadastro longo. Sem filtros confusos. Apenas resultado.</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                aria-label="Baixar Liggo"
                className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-orange-300/40 transition duration-300 ease-out hover:brightness-110"
              >
                Baixar Liggo
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
