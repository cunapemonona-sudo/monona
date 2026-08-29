-- ============================================================
-- Cuñape Monona — esquema de base de datos (Supabase / Postgres)
-- Ejecutar esto completo en: Supabase > SQL Editor > New query
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- PRODUCTOS Y STOCK ----------
create table products (
  id serial primary key,
  name text not null,
  weight text,
  bag_price numeric not null,
  bags_per_pack int not null,
  pack_price numeric not null,
  image_url text,
  stock int not null default 0
);

insert into products (name, weight, bag_price, bags_per_pack, pack_price, stock) values
('Cuñape Tradicional','120 gr.',10.5,10,100,0),
('Cuñape Rosca','120 gr.',10.5,10,100,0),
('Cuñape Abre Fácil','120 gr.',9.5,10,90,0),
('Cuñape Cierre Hermético','140 gr.',10.5,10,100,0),
('Cuñape Mini Abre Fácil','60 gr.',5.0,20,90,0),
('Paraguayos',null,7.5,10,75,0),
('Calitas',null,7.5,10,75,0),
('Bizcocho Maíz',null,10.0,10,95,0);

-- ---------- PEDIDOS ----------
create table orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  items jsonb not null,
  total numeric not null,
  status text not null default 'pendiente' check (status in ('pendiente','entregado')),
  customer_phone text
);

-- ---------- JUGADORES DEL MINIJUEGO ----------
create table trivia_players (
  id uuid primary key default gen_random_uuid(),
  phone text unique not null,
  name text,
  points int not null default 0,
  created_at timestamptz default now()
);

-- ---------- CANJES DE PUNTOS ----------
create table redemptions (
  id uuid primary key default gen_random_uuid(),
  player_id uuid references trivia_players(id),
  player_phone text,
  points_used int not null,
  status text not null default 'pendiente' check (status in ('pendiente','entregado')),
  created_at timestamptz default now()
);

-- ============================================================
-- SEGURIDAD (Row Level Security)
-- Regla general: cualquier visitante puede CREAR pedidos/puntos/
-- canjes. Solo el admin autenticado (tu usuario de Supabase Auth)
-- puede VER pedidos/canjes y EDITAR stock/estados.
-- ============================================================

alter table products enable row level security;
alter table orders enable row level security;
alter table trivia_players enable row level security;
alter table redemptions enable row level security;

-- Productos: lectura pública (catálogo), edición solo admin
create policy "productos_select_publico" on products for select using (true);
create policy "productos_update_admin" on products for update using (auth.role() = 'authenticated');

-- Pedidos: cualquiera crea, solo admin lee y actualiza estado
create policy "pedidos_insert_publico" on orders for insert with check (true);
create policy "pedidos_select_admin" on orders for select using (auth.role() = 'authenticated');
create policy "pedidos_update_admin" on orders for update using (auth.role() = 'authenticated');

-- Jugadores: lectura/escritura pública (se identifican solo con su whatsapp, sin login)
create policy "jugadores_select_publico" on trivia_players for select using (true);
create policy "jugadores_insert_publico" on trivia_players for insert with check (true);
create policy "jugadores_update_publico" on trivia_players for update using (true);

-- Canjes: cualquiera crea su solicitud, solo admin la lee/gestiona
create policy "canjes_insert_publico" on redemptions for insert with check (true);
create policy "canjes_select_admin" on redemptions for select using (auth.role() = 'authenticated');
create policy "canjes_update_admin" on redemptions for update using (auth.role() = 'authenticated');
