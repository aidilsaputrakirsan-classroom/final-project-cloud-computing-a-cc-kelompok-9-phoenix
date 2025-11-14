-- Create admin_users table for authentication
create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password_hash text not null,
  created_at timestamp with time zone default now()
);

-- Insert admin user (username: admin, password: 12345678)
-- Password hash: SHA256('12345678' + 'your-secret-key-change-in-production')
-- Correct hash: 571142f7fc29542fcacca178f920897ea9a7d91a731657d8a67971ce5f458a9a
insert into admin_users (username, password_hash) values
  ('admin', '571142f7fc29542fcacca178f920897ea9a7d91a731657d8a67971ce5f458a9a')
on conflict (username) do update
  set password_hash = excluded.password_hash;

-- Modify posts table to make user_id nullable and text type
alter table posts
  alter column user_id type text using user_id::text,
  alter column user_id drop not null;

-- Add comment
comment on table admin_users is 'Admin users for authentication';
