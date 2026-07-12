-- Tabla de productos del menú
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  price numeric(10,2) not null check (price >= 0),
  image_url text not null,
  category text not null check (category in ('Especialidades', 'Bebidas', 'Snacks', 'Postres')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Índice para listar por fecha
create index if not exists products_created_at_idx on public.products (created_at desc);

-- Lectura pública; solo usuarios autenticados pueden insertar/actualizar/eliminar
alter table public.products enable row level security;

create policy "Cualquiera puede leer productos"
  on public.products for select
  using (true);

create policy "Solo usuarios autenticados pueden insertar"
  on public.products for insert
  to authenticated
  with check (true);

create policy "Solo usuarios autenticados pueden actualizar"
  on public.products for update
  to authenticated
  using (true);

create policy "Solo usuarios autenticados pueden eliminar"
  on public.products for delete
  to authenticated
  using (true);

-- Bucket para imágenes de productos (público para leer)
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Cualquiera puede ver imágenes"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Solo autenticados pueden subir imágenes"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

create policy "Solo autenticados pueden actualizar/eliminar sus uploads"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'product-images');
