import type { Professional, ServiceCategory } from '@/types/flow';

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'electricista',
    label: 'Eletricista',
    description: 'Tomadas, disjuntores e iluminação',
    icon: '⚡',
    accent: 'from-orange-300 to-orange-500',
  },
  {
    id: 'encanador',
    label: 'Encanador',
    description: 'Vazamentos, torneiras e tubos',
    icon: '🚰',
    accent: 'from-cyan-300 to-sky-500',
  },
  {
    id: 'diarista',
    label: 'Diarista',
    description: 'Limpeza rápida e organização',
    icon: '🧹',
    accent: 'from-amber-300 to-orange-400',
  },
  {
    id: 'pintor',
    label: 'Pintor',
    description: 'Retoques e pintura residencial',
    icon: '🎨',
    accent: 'from-violet-300 to-indigo-500',
  },
  {
    id: 'montagem',
    label: 'Montagem',
    description: 'Montagem de móveis e estruturas',
    icon: '🧰',
    accent: 'from-lime-300 to-emerald-500',
  },
  {
    id: 'arcondicionado',
    label: 'Ar-condicionado',
    description: 'Instalação e manutenção',
    icon: '❄️',
    accent: 'from-sky-300 to-blue-500',
  },
];

export const professionals: Professional[] = [
  {
    id: 'ana-santos',
    name: 'Ana Santos',
    role: 'Eletricista',
    rating: 4.9,
    distance: '1.4 km',
    eta: '8 min',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
    specialties: 'Tomadas, quadros e disjuntores',
  },
  {
    id: 'bruno-melo',
    name: 'Bruno Melo',
    role: 'Encanador',
    rating: 4.8,
    distance: '2.1 km',
    eta: '11 min',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80',
    specialties: 'Vazamentos e instalação de torneiras',
  },
  {
    id: 'julia-fernandes',
    name: 'Júlia Fernandes',
    role: 'Diarista',
    rating: 4.7,
    distance: '0.8 km',
    eta: '6 min',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80',
    specialties: 'Limpezas rápidas e detalhadas',
  },
  {
    id: 'lucas-teixeira',
    name: 'Lucas Teixeira',
    role: 'Montador',
    rating: 4.9,
    distance: '1.9 km',
    eta: '9 min',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80',
    specialties: 'Montagem de móveis e estruturas',
  },
];
