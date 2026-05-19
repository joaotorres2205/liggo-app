'use client';

import { motion } from 'framer-motion';
import { fadeIn, fadeInUp, stagger } from '@/lib/motion';

const stepsClient = [
  { title: 'Descreva rapidamente', description: 'Digite seu problema em poucas palavras.' },
  { title: 'Liggo busca perto de você', description: 'Algoritmo local identifica o melhor profissional.' },
  { title: 'Receba atendimento', description: 'Converse direto no WhatsApp e resolva rápido.' },
];

const stepsPro = [
  { title: 'Configure serviços', description: 'Escolha tags como eletricista e encanador.' },
  { title: 'Fique disponível', description: 'Receba pedidos quando estiver próximo.' },
  { title: 'Aceite rápido', description: 'Um toque para confirmar o trabalho.' },
];

function StepCard({ index, title, description }: { index: number; title: string; description: string }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-50 text-xl font-semibold text-sky-600 shadow-sm">
        {index}
      </div>
      <h3 className="mt-6 text-xl font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </motion.article>
  );
}

export function HowItWorksSection() {
  return (
    <motion.section
      id="como-funciona"
      className="bg-white text-slate-950"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div variants={fadeInUp} className="max-w-3xl">
          <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-[0.68rem] uppercase tracking-[0.35em] text-orange-500 shadow-sm">
            Como funciona
          </span>
          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            O fluxo mais rápido para clientes e prestadores.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Um app desenhado para reduzir o tempo entre problema e solução. Tudo pronto para uso em poucos segundos.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:items-start">
          <motion.div variants={fadeIn} className="space-y-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-8">
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-slate-500">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-500" /> Cliente
            </div>
            <div className="space-y-5">
              {stepsClient.map((step, idx) => (
                <StepCard key={step.title} index={idx + 1} title={step.title} description={step.description} />
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="space-y-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-8">
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-slate-500">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-500" /> Prestador
            </div>
            <div className="space-y-5">
              {stepsPro.map((step, idx) => (
                <StepCard key={step.title} index={idx + 1} title={step.title} description={step.description} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
