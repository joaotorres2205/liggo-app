-- Supabase schema for Liggo MVP

-- Users
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null unique,
  phone text,
  password_hash text,
  otp_code_hash text,
  otp_expires timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Service categories and offerings
create table if not exists services (
  id text primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  icon text,
  description text,
  category text,
  accent text,
  image_url text,
  created_at timestamptz default now()
);

-- Providers
create table if not exists providers (
  id text primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  name text not null,
  role text not null,
  description text,
  specialties text,
  service_ids text[],
  rating numeric,
  city text,
  avatar_url text,
  distance text,
  eta text,
  created_at timestamptz default now()
);

-- Service requests
create table if not exists service_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  provider_id text references providers(id),
  service_id text references services(id),
  description text,
  location text,
  status text not null default 'pending',
  created_at timestamptz default now()
);
