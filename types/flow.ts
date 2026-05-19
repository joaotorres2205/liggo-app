export interface ServiceCategory {
  id: string;
  label: string;
  description: string;
  icon: string;
  accent: string;
}

export interface Professional {
  id: string;
  name: string;
  role: string;
  rating: number;
  distance: string;
  eta: string;
  photo: string;
  specialties: string;
  city?: string;
  availability?: string;
  headline?: string;
}
