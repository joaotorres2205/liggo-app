'use client';

import { useState, useRef, useEffect } from 'react';
import { normalizePhoneNumber } from '@/lib/phone';

export default function AuthPage() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [via, setVia] = useState<'email' | 'whatsapp'>('email');
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const redirectTimerRef = useRef<number | null>(null);

  useEffect(() => {
    let mounted = true;
    async function checkSession() {
      try {
        const res = await fetch('/api/auth/session');
        if (!mounted) return;
        if (res.ok) {
          window.location.href = '/app';
        }
      } catch {
        // ignore network errors during auth page load
      }
    }

    checkSession();

    return () => {
      mounted = false;
      if (redirectTimerRef.current) window.clearTimeout(redirectTimerRef.current);
    };
  }, []);

  const contactLabel = via === 'email' ? 'E-mail' : 'WhatsApp';
  const contactPlaceholder = via === 'email' ? 'Digite seu e-mail' : '+55 (11) 99999-9999';
  const contactType = via === 'email' ? 'email' : 'tel';
  const contactInputMode = via === 'email' ? 'email' : 'tel';
  const contactAutoComplete = via === 'email' ? 'email' : 'tel';
  const contactPattern = via === 'email' ? undefined : '^[+0-9 ()-]{10,}$';

  function formatWhatsappInput(value: string) {
    const digits = value.replace(/\D/g, '');
    if (!digits) return '';
    if (digits.length <= 2) {
      return `+${digits}`;
    }

    const country = digits.slice(0, 2);
    const rest = digits.slice(2);
    const ddd = rest.slice(0, 2);
    const first = rest.slice(2, 7);
    const second = rest.slice(7, 11);

    let formatted = `+${country}`;
    formatted += ` (${ddd}`;
    if (rest.length >= 2) formatted += ')';
    if (first) formatted += ` ${first}`;
    if (second) formatted += `-${second}`;
    return formatted;
  }

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setHint(null);

    let finalContact = contact;
    if (via === 'whatsapp') {
      const normalized = normalizePhoneNumber(contact);
      if (!normalized) {
        setLoading(false);
        setHint('WhatsApp inválido. Use +55DDD999999999 ou formato internacional válido.');
        return;
      }
      finalContact = normalized;
      setContact(normalized);
    }

    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact: finalContact, via, name }),
    });

    const json = await res.json();
    setLoading(false);

    const verifyUrl = `/auth/verify?contact=${encodeURIComponent(finalContact)}&via=${via}`;
    const debugOtp = Boolean(json?.code && json?.debug === 'dev-fallback');

    if (json?.ok) {
      if (debugOtp) {
        setHint(`Modo de desenvolvimento — código: ${json.code}. Redirecionando em 8s...`);
        const id = window.setTimeout(() => (window.location.href = verifyUrl), 8000);
        redirectTimerRef.current = id;
      } else {
        setHint('Código enviado. Cheque seu e-mail ou WhatsApp.');
        window.location.href = verifyUrl;
      }
    } else {
      setHint(json?.error || 'Erro ao enviar');
    }
  }

  function goNow() {
    if (redirectTimerRef.current) window.clearTimeout(redirectTimerRef.current);
    window.location.href = `/auth/verify?contact=${encodeURIComponent(contact)}&via=${via}`;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <form onSubmit={sendOtp} className="w-full max-w-md rounded-[1.75rem] bg-white p-6 shadow-xl shadow-slate-200/30 transition duration-300">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Entrar no Liggo</h2>
        <p className="mt-2 text-sm text-slate-600">Escolha o método de contato e receba um código seguro.</p>

        <div className="mt-5 grid grid-cols-2 gap-2 rounded-full bg-slate-100 p-1 shadow-sm">
          {['email', 'whatsapp'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setVia(option as 'email' | 'whatsapp');
                setContact('');
              }}
              className={`rounded-full px-4 py-3 text-sm font-semibold transition duration-200 ${via === option ? 'bg-slate-950 text-white shadow-lg shadow-slate-900/10' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {option === 'email' ? 'E-mail' : 'WhatsApp'}
            </button>
          ))}
        </div>

        <label className="mt-5 block text-sm font-medium text-slate-700">Nome completo</label>
        <input
          type="text"
          required
          autoComplete="name"
          placeholder="Como devemos te chamar?"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
        />

        <label className="mt-4 block text-sm font-medium text-slate-700">{contactLabel}</label>
        {via === 'whatsapp' ? (
          <p className="mt-1 text-xs text-slate-500">Formato: +55 (11) 99999-9999</p>
        ) : null}
        <input
          type={contactType}
          required
          inputMode={contactInputMode}
          autoComplete={contactAutoComplete}
          pattern={contactPattern}
          placeholder={contactPlaceholder}
          value={contact}
          onChange={(e) => {
            const value = e.target.value;
            setContact(via === 'whatsapp' ? formatWhatsappInput(value) : value);
          }}
          className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
        />

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 transition duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={loading || !name.trim() || !contact.trim()}
        >
          {loading ? 'Enviando...' : 'Enviar código'}
        </button>

        {hint ? (
          <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 shadow-sm">
            <p>{hint}</p>
            {hint.includes('Modo de desenvolvimento') ? (
              <button
                type="button"
                onClick={goNow}
                className="mt-3 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-slate-800"
              >
                Ir para verificação agora
              </button>
            ) : null}
          </div>
        ) : null}

        <div className="mt-5 text-center text-sm text-slate-500">
          Já tem senha?{' '}
          <a className="font-semibold text-slate-950 hover:text-orange-600" href="/auth/login-password">
            Entrar com senha
          </a>
        </div>
      </form>
    </div>
  );
}
