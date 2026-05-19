export interface SeedService {
  id: string;
  label: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  category: string;
  accent: string;
  image_url: string;
}

export const services: SeedService[] = [
  {
    id: 'eletricista',
    label: 'Eletricista',
    name: 'Eletricista',
    slug: 'eletricista',
    icon: '⚡',
    description: 'Instalação de tomadas, painéis, disjuntores e iluminação',
    category: 'Residencial',
    accent: 'from-orange-300 to-orange-500',
    image_url: 'https://images.unsplash.com/photo-1512758017271-8bd06aea43eb?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'encanador',
    label: 'Encanador',
    name: 'Encanador',
    slug: 'encanador',
    icon: '🚰',
    description: 'Reparo de vazamentos, desentupimento e hidráulica geral',
    category: 'Residencial',
    accent: 'from-cyan-300 to-sky-500',
    image_url: 'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'pintor',
    label: 'Pintor',
    name: 'Pintor',
    slug: 'pintor',
    icon: '🎨',
    description: 'Pintura de ambientes, retoques e acabamento premium',
    category: 'Reforma',
    accent: 'from-violet-300 to-indigo-500',
    image_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'diarista',
    label: 'Diarista',
    name: 'Diarista',
    slug: 'diarista',
    icon: '🧹',
    description: 'Limpeza residencial profunda, pós-obra e organização',
    category: 'Casa',
    accent: 'from-amber-300 to-orange-400',
    image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'montagem',
    label: 'Montador de móveis',
    name: 'Montador de móveis',
    slug: 'montagem',
    icon: '🧰',
    description: 'Montagem de móveis sob medida, armários e racks',
    category: 'Montagem',
    accent: 'from-lime-300 to-emerald-500',
    image_url: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'ar-condicionado',
    label: 'Técnico de ar-condicionado',
    name: 'Técnico de ar-condicionado',
    slug: 'ar-condicionado',
    icon: '❄️',
    description: 'Instalação e manutenção de aparelhos de ar-condicionado',
    category: 'Climatização',
    accent: 'from-sky-300 to-blue-500',
    image_url: 'https://images.unsplash.com/photo-1559563459-9429e7d4f090?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'chaveiro',
    label: 'Chaveiro',
    name: 'Chaveiro',
    slug: 'chaveiro',
    icon: '🗝️',
    description: 'Abertura de portas, troca de fechaduras e copia de chaves',
    category: 'Emergência',
    accent: 'from-slate-300 to-slate-500',
    image_url: 'https://images.unsplash.com/photo-1511451518133-2eee38b733d8?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'jardinagem',
    label: 'Jardinagem',
    name: 'Jardinagem',
    slug: 'jardinagem',
    icon: '🌿',
    description: 'Poda, manutenção de jardins e paisagismo leve',
    category: 'Exterior',
    accent: 'from-emerald-300 to-teal-500',
    image_url: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'limpeza-pos-obra',
    label: 'Limpeza pós-obra',
    name: 'Limpeza pós-obra',
    slug: 'limpeza-pos-obra',
    icon: '🧼',
    description: 'Limpeza técnica após reforma e acabamento',
    category: 'Casa',
    accent: 'from-slate-300 to-slate-600',
    image_url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'marcenaria',
    label: 'Marceneiro',
    name: 'Marceneiro',
    slug: 'marcenaria',
    icon: '🪚',
    description: 'Peças sob medida, reparo de móveis e marcenaria fina',
    category: 'Reforma',
    accent: 'from-orange-300 to-amber-500',
    image_url: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80',
  },
];
