'use client';

import { useMemo, useState } from 'react';
import type { ServiceCategory } from '@/types/flow';

interface ProviderRegisterFormProps {
  services: ServiceCategory[];
}

export function ProviderRegisterForm({ services }: ProviderRegisterFormProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState(services[0]?.label || '');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('Atendimento rápido e profissional para serviços residenciais.');
  const [specialties, setSpecialties] = useState('Atendimento prioritário, orçamento rápido e material de qualidade.');
  const [selectedServices, setSelectedServices] = useState<string[]>(services.slice(0, 2).map((service) => service.id));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const invalidForm = useMemo(
    () => !name.trim() || !city.trim() || !phone.trim() || selectedServices.length === 0,
    [city, name, phone, selectedServices],
  );

  const toggleService = (slug: string) => {
    setSelectedServices((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (invalidForm) return;
    setLoading(true);
    setMessage(null);

    const response = await fetch('/api/providers/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        role,
        city,
        phone,
        description,
        specialties,
        serviceIds: selectedServices,
      }),
    });

    const json = await response.json();
    setLoading(false);

    if (json?.ok) {
      setMessage('Perfil salvo com sucesso. Agora seu atendimento pode aparecer para clientes próximos.');
      setName('');
      setCity('');
      setPhone('');
      setDescription('Atendimento rápido e profissional para serviços residenciais.');
      setSpecialties('Atendimento prioritário, orçamento rápido e material de qualidade.');
      setSelectedServices(services.slice(0, 2).map((service) => service.id));
    } else {
      setMessage(json?.error || 'Falha ao cadastrar prestador.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
      {message ? (
        <div className="rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-800 shadow-sm">{message}</div>
      ) : null}
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-slate-700">
          Seu nome
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
            placeholder="Ex.: Marina Silva"
          />
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-700">
          Cidade / região
          <input
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
            placeholder="Ex.: Pinheiros, SP"
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-slate-700">
          Telefone de contato
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
            placeholder="(11) 98765-4321"
          />
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-700">
          Especialidade principal
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
          >
            {services.map((service) => (
              <option key={service.id} value={service.label}>
                {service.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="space-y-2 text-sm font-semibold text-slate-700">
        Serviços oferecidos
        <div className="grid gap-3 sm:grid-cols-2">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => toggleService(service.id)}
              className={`rounded-3xl border px-4 py-3 text-left text-sm transition ${selectedServices.includes(service.id)
                ? 'border-orange-300 bg-orange-50 text-orange-700'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{service.icon}</span>
                <div>
                  <p className="font-semibold">{service.label}</p>
                  <p className="text-xs text-slate-500">{service.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <label className="space-y-2 text-sm font-semibold text-slate-700">
        Texto de apresentação
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={4}
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
        />
      </label>

      <label className="space-y-2 text-sm font-semibold text-slate-700">
        Principais serviços
        <textarea
          value={specialties}
          onChange={(event) => setSpecialties(event.target.value)}
          rows={3}
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Pronto para aparecer no Liggo?</p>
          <p className="text-sm text-slate-500">Seu perfil será enviado diretamente à plataforma.</p>
        </div>
        <button
          type="submit"
          disabled={invalidForm || loading}
          className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
        >
          {loading ? 'Enviando...' : 'Cadastrar prestador'}
        </button>
      </div>
    </form>
  );
}
