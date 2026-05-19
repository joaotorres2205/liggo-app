'use client';

import { useState } from 'react';

export default function LoginPasswordPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch('/api/auth/login-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const json = await res.json();
    setLoading(false);

    if (json?.ok) {
      window.location.href = '/app';
    } else {
      setError(json?.error || 'Erro ao entrar');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <form onSubmit={login} className="w-full max-w-md rounded-xl bg-white p-6 shadow">
        <h2 className="text-lg font-semibold">Entrar com senha</h2>
        <p className="mt-2 text-sm text-slate-600">Use sua senha cadastrada para acessar o app.</p>

        <label className="mt-4 block text-sm">E-mail</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-md border px-3 py-2" />

        <label className="mt-4 block text-sm">Senha</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-md border px-3 py-2" />

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

        <button type="submit" className="mt-4 w-full rounded-full bg-slate-900 text-white py-2" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>

        <div className="mt-4 text-center text-sm text-slate-500">
          Ainda não tem senha? <a className="font-semibold text-slate-900 hover:text-orange-600" href="/auth">Voltar para OTP</a>
        </div>
      </form>
    </div>
  );
}
