'use client';

import { motion } from 'framer-motion';
import { fadeIn, fadeInUp, stagger } from '@/lib/motion';

const previewCards = [
  {
    title: 'Descrição rápida',
    text: 'Você conta o problema e o Liggo encontra o profissional local.',
  },
  {
    title: 'Profissional perto',
    text: 'Mostramos prestadores próximos com serviço destacado.',
  },
  {
    title: 'Confirmação instantânea',
    text: 'A jornada visual mostra o atendimento em menos de 1 minuto.',
  },
];

export function DemoSection() {
  return (
    <motion.section
      id="demo"
      className="bg-slate-50 text-slate-950"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-[0.68rem] uppercase tracking-[0.35em] text-orange-500 shadow-sm">
            Demonstração visual
          </span>
          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Veja o Liggo em ação sem precisar sair da landing.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            Um preview elegante do fluxo, com telas animadas e experiência premium que transmite velocidade, simplicidade e confiança.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            variants={fadeIn}
            className="relative mx-auto w-full max-w-[360px] rounded-[2.5rem] border border-slate-200 bg-slate-950 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.2)] sm:p-7"
          >
            <div className="relative rounded-[2.25rem] border border-slate-800 bg-slate-950 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div className="flex items-center justify-between text-[0.72rem] uppercase tracking-[0.28em] text-slate-500">
                <span>Liggo</span>
                <span>03:00</span>
              </div>
              <div className="mt-5 rounded-[1.75rem] border border-slate-800 bg-slate-900 p-4">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Serviço urgente</span>
                  <span>Próximo</span>
                </div>
                <div className="mt-4 h-36 rounded-[1.75rem] bg-slate-950 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                  <div className="h-2.5 w-16 rounded-full bg-orange-400/90" />
                  <div className="mt-5 rounded-3xl border border-slate-800 bg-slate-950 p-3 shadow-sm">
                    <p className="text-sm font-semibold text-white">Encanador disponível</p>
                    <p className="mt-2 text-xs leading-5 text-slate-400">Chega em 8 min</p>
                  </div>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="mt-4 rounded-[1.5rem] border border-slate-800 bg-slate-950 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-3xl bg-orange-500/10 text-sm text-orange-300">
                        📍
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">Localização do atendimento</p>
                        <p className="mt-1 text-[0.72rem] text-slate-400">A 1,2 km de você</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {[
                { label: 'Fluxo', value: 'Descreva o problema' },
                { label: 'Próximo', value: 'Escolha o prestador' },
                { label: 'Final', value: 'Confirmação instantânea' },
              ].map((item) => (
                <div key={item.label} className="rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.32em] text-slate-500">{item.label}</p>
                  <p className="mt-3 text-sm font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="space-y-5">
            {previewCards.map((card, index) => (
              <motion.div
                key={card.title}
                variants={fadeIn}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-orange-500">{card.title}</p>
                <p className="mt-4 text-base leading-7 text-slate-600">{card.text}</p>
              </motion.div>
            ))}
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200">
              <p className="text-sm uppercase tracking-[0.3em] text-orange-500">Experiência</p>
              <p className="mt-4 text-base leading-7 text-slate-950">
                Um preview visual integrado que mostra a sensação rápida e intuitiva do app.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
