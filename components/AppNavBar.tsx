'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function AppNavBar() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore network errors and continue redirecting
    }
    router.push('/auth');
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/75 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-slate-950">
          <span className="flex h-11 w-11 items-center justify-center rounded-3xl bg-orange-500 text-lg font-black text-white shadow-sm shadow-orange-300/30">
            L
          </span>
          <div className="leading-tight">
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-orange-500">Liggo</p>
            <p className="text-sm font-semibold text-slate-900">Serviços locais</p>
          </div>
        </Link>
        <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
          <p className="hidden md:block text-sm text-slate-600">Marketplace rápido e confiável</p>
          <Link
            href="/app/provider/register"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-orange-300/30 transition duration-200 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            Sou prestador
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition duration-200 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loggingOut ? 'Saindo...' : 'Sair'}
          </button>
        </div>
      </div>
    </header>
  );
}
