'use client';

import { motion } from 'framer-motion';
import { fadeIn, fadeInUp, stagger } from '@/lib/motion';

const benefits = [
  {
    title: 'Rapidez extrema',
    description: 'Fluxo projetado para resolver problemas em poucos minutos, sem burocracia.',
    icon: '⚡',
  },
  {
    title: 'Profissionais próximos',
    description: 'Conexão com quem está perto de você e pode atender imediatamente.',
    icon: '📍',
  },
  {
    title: 'Simplicidade premium',
    description: 'Menos campos, menos dúvidas e uma jornada que dá confiança desde o primeiro clique.',
    icon: '✨',
  },
  {
    title: 'Atendimento direto',
    description: 'O cliente conversa no WhatsApp com o prestador assim que o pedido é aceito.',
    icon: '💬',
  },
];

export function BenefitsSection() {
  return (
    <motion.section
      id="beneficios"
      className="bg-white text-slate-950"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div variants={fadeInUp} className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-[0.68rem] uppercase tracking-[0.35em] text-orange-500 shadow-sm">
              Benefícios chave
            </span>
            <h2 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              O motivo pelo qual o Liggo acelera sua rotina.
            </h2>
            <p className="max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Um app que combina tecnologia local, design premium e um fluxo direto para resolver tarefas do dia a dia.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {benefits.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeIn}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ y: -3 }}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-0.5"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-50 text-2xl text-sky-600 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
