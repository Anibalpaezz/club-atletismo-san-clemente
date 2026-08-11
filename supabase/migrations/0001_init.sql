-- ============================================================
-- Club Atletismo San Clemente — Esquema inicial
-- Ejecutar este fichero en el SQL Editor de Supabase Studio
-- ============================================================

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- Tabla de noticias
-- ------------------------------------------------------------
create table if not exists public.noticias (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  resumen text,
  cuerpo text,
  imagen_url text,
  fecha_publicacion timestamptz default now(),
  publicado boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ------------------------------------------------------------
-- Tabla de patrocinadores / colaboradores
-- ------------------------------------------------------------
create table if not exists public.patrocinadores (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  logo_url text,
  url_web text,
  orden integer default 0,
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- Tabla de configuración de la edición anual de la carrera
-- Una fila por edición; la más reciente con activo = true
-- ------------------------------------------------------------
create table if not exists public.carrera_config (
  id uuid primary key default gen_random_uuid(),
  edicion text,
  fecha date,
  hora text default '22:00',
  lugar text default 'Plaza Mayor, San Clemente (Cuenca)',
  enlace_inscripcion text,
  enlace_clasificaciones text,
  enlace_reglamento text,
  enlace_recorrido text,
  texto_cta text default 'Inscríbete a la 10K Nocturna',
  activo boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ------------------------------------------------------------
-- Trigger para actualizar updated_at
-- ------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_noticias_updated_at on public.noticias;
create trigger trg_noticias_updated_at
  before update on public.noticias
  for each row execute function public.set_updated_at();

drop trigger if exists trg_carrera_config_updated_at on public.carrera_config;
create trigger trg_carrera_config_updated_at
  before update on public.carrera_config
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- Row Level Security
-- Lectura pública (anónimos), escritura solo para usuarios
-- autenticados (los gestores del club).
-- ------------------------------------------------------------
alter table public.noticias enable row level security;
alter table public.patrocinadores enable row level security;
alter table public.carrera_config enable row level security;

-- Lectura
create policy "noticias_select_public" on public.noticias
  for select using (true);

create policy "patrocinadores_select_public" on public.patrocinadores
  for select using (true);

create policy "carrera_config_select_public" on public.carrera_config
  for select using (true);

-- Escritura (requiere sesión iniciada en Supabase Auth)
create policy "noticias_insert_auth" on public.noticias
  for insert to authenticated with check (true);

create policy "noticias_update_auth" on public.noticias
  for update to authenticated using (true) with check (true);

create policy "noticias_delete_auth" on public.noticias
  for delete to authenticated using (true);

create policy "patrocinadores_insert_auth" on public.patrocinadores
  for insert to authenticated with check (true);

create policy "patrocinadores_update_auth" on public.patrocinadores
  for update to authenticated using (true) with check (true);

create policy "patrocinadores_delete_auth" on public.patrocinadores
  for delete to authenticated using (true);

create policy "carrera_config_insert_auth" on public.carrera_config
  for insert to authenticated with check (true);

create policy "carrera_config_update_auth" on public.carrera_config
  for update to authenticated using (true) with check (true);

create policy "carrera_config_delete_auth" on public.carrera_config
  for delete to authenticated using (true);
