-- Create site_content table for managing homepage content
create table if not exists site_content (
  id bigserial primary key,
  section_name text unique not null,
  content jsonb not null,
  updated_at timestamp with time zone default now()
);

-- Insert default content for all sections
insert into site_content (section_name, content) values
  ('hero', '{
    "title": "PT. Digital Maju",
    "subtitle": "Solusi Digital Terpercaya untuk Bisnis Anda",
    "description": "Kami membantu perusahaan bertransformasi digital dengan teknologi terkini dan layanan profesional.",
    "cta_text": "Hubungi Kami",
    "cta_link": "#contact"
  }'::jsonb),
  ('about', '{
    "title": "Tentang Kami",
    "description": "PT. Digital Maju adalah perusahaan teknologi yang berfokus pada transformasi digital dan pengembangan solusi inovatif. Dengan pengalaman bertahun-tahun, kami telah membantu ratusan klien mencapai tujuan bisnis mereka melalui teknologi.",
    "mission": "Memberikan solusi digital terbaik yang mengakselerasi pertumbuhan bisnis klien kami.",
    "vision": "Menjadi mitra teknologi terpercaya di Indonesia."
  }'::jsonb),
  ('services', '{
    "title": "Layanan Kami",
    "items": [
      {
        "title": "Web Development",
        "description": "Pembuatan website profesional dan responsif dengan teknologi modern",
        "icon": "💻"
      },
      {
        "title": "Mobile App Development",
        "description": "Aplikasi mobile iOS dan Android yang user-friendly dan performant",
        "icon": "📱"
      },
      {
        "title": "Cloud Solutions",
        "description": "Infrastruktur cloud yang scalable dan aman untuk bisnis Anda",
        "icon": "☁️"
      },
      {
        "title": "Digital Consulting",
        "description": "Konsultasi strategi digital untuk transformasi bisnis yang sukses",
        "icon": "🚀"
      }
    ]
  }'::jsonb),
  ('contact', '{
    "title": "Hubungi Kami",
    "email": "info@digitalmaju.co.id",
    "phone": "+62 21 1234 5678",
    "address": "Jl. Sudirman No. 123, Jakarta Pusat 10220",
    "social": {
      "linkedin": "https://linkedin.com/company/digitalmaju",
      "twitter": "https://twitter.com/digitalmaju",
      "instagram": "https://instagram.com/digitalmaju"
    }
  }'::jsonb)
on conflict (section_name) do nothing;

-- Create index for faster queries
create index if not exists idx_site_content_section on site_content(section_name);

-- Add comment
comment on table site_content is 'Stores editable content for homepage sections';
