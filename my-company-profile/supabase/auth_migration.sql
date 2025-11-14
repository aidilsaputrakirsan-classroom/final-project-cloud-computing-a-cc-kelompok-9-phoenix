-- Create admin_users table for authentication
create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password_hash text not null,
  created_at timestamp with time zone default now()
);

-- Insert admin user (username: admin, password: 12345678)
-- Password hash: SHA256(password + secret_key)
-- Hash for "12345678" with secret key
insert into admin_users (username, password_hash) values
  ('admin', 'e6c3da5b206634d7f3f3586d747ffdb36b5c675757b380c6a5fe5c570c714349')
on conflict (username) do nothing;

-- Modify posts table to make user_id nullable and text type
alter table posts
  alter column user_id type text using user_id::text,
  alter column user_id drop not null;

-- Add comment
comment on table admin_users is 'Admin users for authentication';
