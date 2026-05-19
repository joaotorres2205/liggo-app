'use client';

import { motion } from 'framer-motion';
import { fadeIn, fadeInUp, stagger } from '@/lib/motion';

const categories = [
  { title: 'Eletricista', icon: '⚡' },
  { title: 'Encanador', icon: '🚰' },
  { title: 'Diarista', icon: '🧹' },
  { title: 'Pintor', icon: '🎨' },
  { title: 'Montagem', icon: '🔧' },
  { title: 'Ar-condicionado', icon: '❄️' },
];

export function CategoriesSection() {
  return (
    <motion.section
      id="categorias"
      className="bg-slate-50 text-slate-950"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-[0.68rem] uppercase tracking-[0.35em] text-orange-500 shadow-sm">
            Categorias populares
          </span>
          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Serviços prontos para você chamar agora.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Encontre rapidamente o profissional certo para pequenas emergências ou tarefas do dia a dia.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={fadeIn}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:border-orange-200/50"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-100 text-2xl shadow-sm text-orange-600">
                {category.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-950">{category.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Profissionais locais prontos para atender com rapidez.</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
