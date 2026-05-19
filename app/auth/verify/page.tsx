'use client';

import { useState, useEffect } from 'react';

export default function VerifyPage() {
  const [code, setCode] = useState('');
  const [contact, setContact] = useState('');
  const [via, setVia] = useState<'email' | 'whatsapp'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setContact(params.get('contact') || '');
    setVia(params.get('via') === 'whatsapp' ? 'whatsapp' : 'email');
  }, []);

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact, via, code }),
    });
    const json = await res.json();
    setLoading(false);
    if (json?.ok) {
      window.location.href = '/auth/setup-password?contact=' + encodeURIComponent(contact) + '&via=' + encodeURIComponent(via);
    } else {
      setError(json?.error || 'Código inválido');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <form onSubmit={verify} className="w-full max-w-md rounded-xl bg-white p-6 shadow">
        <h2 className="text-lg font-semibold">Verificar código</h2>
        <p className="mt-2 text-sm text-slate-600">
          Enviamos um código para {via === 'email' ? 'o e-mail' : 'o WhatsApp'}: <strong>{contact}</strong>
        </p>
        <label className="mt-4 block text-sm">Código (6 dígitos)</label>
        <input
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mt-2 w-full rounded-md border px-3 py-2 text-xl tracking-widest text-center"
        />
        {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
        <button type="submit" className="mt-4 w-full rounded-full bg-slate-900 text-white py-2" disabled={loading}>{loading ? 'Verificando...' : 'Verificar'}</button>
      </form>
    </div>
  );
}
