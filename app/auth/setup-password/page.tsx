'use client';

import { useState, useEffect } from 'react';

export default function SetupPassword() {
  const [contact, setContact] = useState('');
  const [via, setVia] = useState<'email' | 'whatsapp'>('email');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setContact(params.get('contact') || '');
    setVia(params.get('via') === 'whatsapp' ? 'whatsapp' : 'email');
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) return setMsg('Senha precisa ter ao menos 8 caracteres');
    if (password !== confirm) return setMsg('Senhas não batem');
    setLoading(true);
    const res = await fetch('/api/auth/set-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact, via, password }),
    });
    const json = await res.json();
    setLoading(false);
    if (json?.ok) {
      setMsg('Senha criada. Redirecionando...');
      setTimeout(() => (window.location.href = '/app'), 800);
    } else {
      setMsg(json?.error || 'Erro ao criar senha');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-xl bg-white p-6 shadow">
        <h2 className="text-lg font-semibold">Criar senha</h2>
        <p className="mt-2 text-sm text-slate-600">Sua conta foi aprovada, agora defina uma senha segura.</p>
        <label className="mt-4 block text-sm">{via === 'email' ? 'E-mail' : 'WhatsApp'}</label>
        <input
          type={via === 'email' ? 'email' : 'tel'}
          required
          value={contact}
          readOnly
          className="mt-2 w-full rounded-md border bg-slate-100 px-3 py-2 text-slate-700"
        />
        <label className="mt-4 block text-sm">Senha</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-md border px-3 py-2" />
        <label className="mt-4 block text-sm">Confirmar senha</label>
        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="mt-2 w-full rounded-md border px-3 py-2" />
        {msg ? <p className="mt-2 text-sm text-slate-600">{msg}</p> : null}
        <button type="submit" className="mt-4 w-full rounded-full bg-slate-900 text-white py-2" disabled={loading}>{loading ? 'Salvando...' : 'Criar senha'}</button>
      </form>
    </div>
  );
}
