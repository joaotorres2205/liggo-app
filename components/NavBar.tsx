'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/motion';

const navLinks = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Categorias', href: '#categorias' },
  { label: 'Benefícios', href: '#beneficios' },
];

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3 text-slate-950">
          <span className="flex h-11 w-11 items-center justify-center rounded-3xl bg-orange-500 text-lg font-black text-white shadow-sm shadow-orange-300/30">
            L
          </span>
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-orange-500">Liggo</p>
            <p className="text-sm text-slate-600">Ajuda local em minutos</p>
          </div>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              whileHover={{ y: -1 }}
              className="text-sm font-medium text-slate-700 transition hover:text-slate-950"
            >
              {item.label}
            </motion.a>
          ))}
          <motion.button
            type="button"
            aria-label="Baixar Liggo"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-orange-300/30 transition hover:bg-orange-400"
          >
            Baixar Liggo
          </motion.button>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-950 shadow-sm transition hover:bg-slate-100 md:hidden"
          aria-label="Abrir menu"
          onClick={() => setOpen((current) => !current)}
        >
          <span className="text-2xl">{open ? '×' : '≡'}</span>
        </button>
      </div>

      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="border-t border-slate-200 bg-white px-4 py-5 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-base font-medium text-slate-900 transition hover:text-slate-700"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              aria-label="Baixar Liggo"
              className="inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-400"
              onClick={() => setOpen(false)}
            >
              Baixar Liggo
            </button>
          </div>
        </motion.div>
      ) : null}
    </motion.header>
  );
}
