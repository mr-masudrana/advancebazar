create extension if not exists pgcrypto;

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in ('sneakers','formal','sports','casual','boots')),
  price integer not null check (price >= 0),
  original_price integer not null check (original_price >= 0),
  rating numeric(2,1) default 0,
  reviews_count integer default 0,
  images jsonb not null default '[]'::jsonb,
  sizes jsonb not null default '[]'::jsonb,
  colors jsonb not null default '["Black"]'::jsonb,
  badge text,
  in_stock boolean default true,
  short_desc text,
  full_desc text,
  features jsonb not null default '[]'::jsonb,
  created_at timestamptz default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_no text unique not null,
  customer_name text not null,
  phone text not null,
  address text not null,
  zone text not null check (zone in ('inside','outside')),
  payment_method text not null check (payment_method in ('cod','mfs')),
  trx_id text,
  status text not null default 'confirmed',
  subtotal integer not null,
  delivery_fee integer not null,
  discount integer not null default 0,
  grand_total integer not null,
  created_at timestamptz default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid,
  product_name text not null,
  price integer not null,
  image text,
  size integer not null,
  color text not null,
  quantity integer not null check (quantity > 0)
);

alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

create policy "public can read products" on products for select using (true);
create policy "public can create orders" on orders for insert with check (true);
create policy "public can create order items" on order_items for insert with check (true);

-- For production admin operations, use the service-role key only on the server.
-- Do not expose SUPABASE_SERVICE_ROLE_KEY to the browser.

-- Optional seed example:
-- insert into products (name,category,price,original_price,rating,reviews_count,images,sizes,colors,badge,in_stock,short_desc,full_desc,features)
-- values (...);