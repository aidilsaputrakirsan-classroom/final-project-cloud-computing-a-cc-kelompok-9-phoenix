-- Create team_members table for managing company team
create table if not exists team_members (
  id bigserial primary key,
  name text not null,
  position text not null,
  bio text,
  avatar text default '👤',
  display_order int default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Insert sample team members
insert into team_members (name, position, bio, avatar, display_order) values
  ('John Doe', 'CEO & Founder', 'Visionary leader dengan 15+ tahun pengalaman di industri teknologi.', '👨‍💼', 1),
  ('Jane Smith', 'CTO', 'Expert dalam cloud architecture dan sistem scalable.', '👩‍💻', 2),
  ('Mike Johnson', 'Lead Developer', 'Full-stack developer passionate tentang clean code dan best practices.', '👨‍💻', 3),
  ('Sarah Williams', 'UI/UX Designer', 'Creative designer yang fokus pada user experience yang intuitif.', '👩‍🎨', 4)
on conflict do nothing;

-- Create index for ordering
create index if not exists idx_team_members_order on team_members(display_order);

-- Add comment
comment on table team_members is 'Team members displayed on company profile';
