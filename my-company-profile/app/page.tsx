import { createServerClient } from '@/lib/supabaseServer';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  body: string;
  created_at: string;
}

interface SiteContent {
  section_name: string;
  content: any;
}

async function getSiteContent(section: string) {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('site_content')
    .select('content')
    .eq('section_name', section)
    .single();
  return data?.content || null;
}

async function getLatestPosts() {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);
  return data || [];
}

export default async function Home() {
  const heroContent = await getSiteContent('hero');
  const aboutContent = await getSiteContent('about');
  const servicesContent = await getSiteContent('services');
  const contactContent = await getSiteContent('contact');
  const latestPosts = await getLatestPosts();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header/Navigation */}
      <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {heroContent?.title || 'PT. Digital Maju'}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                About
              </a>
              <a href="#services" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                Services
              </a>
              <a href="#portfolio" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                Portfolio
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                Contact
              </a>
              <Link
                href="/admin"
                className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors text-sm font-medium"
              >
                Admin
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            {heroContent?.title || 'PT. Digital Maju'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 font-medium">
            {heroContent?.subtitle || 'Solusi Digital Terpercaya untuk Bisnis Anda'}
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {heroContent?.description || 'Kami membantu perusahaan bertransformasi digital dengan teknologi terkini.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={heroContent?.cta_link || '#contact'}
              className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors font-semibold text-lg shadow-lg"
            >
              {heroContent?.cta_text || 'Hubungi Kami'}
            </a>
            <a
              href="#portfolio"
              className="px-8 py-4 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-semibold text-lg"
            >
              Lihat Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              {aboutContent?.title || 'Tentang Kami'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center leading-relaxed">
              {aboutContent?.description || 'PT. Digital Maju adalah perusahaan teknologi yang berfokus pada transformasi digital.'}
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Misi Kami</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {aboutContent?.mission || 'Memberikan solusi digital terbaik untuk klien kami.'}
                </p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Visi Kami</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {aboutContent?.vision || 'Menjadi mitra teknologi terpercaya di Indonesia.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              {servicesContent?.title || 'Layanan Kami'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center max-w-2xl mx-auto">
              Solusi lengkap untuk kebutuhan digital bisnis Anda
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {servicesContent?.items?.map((service: any, index: number) => (
                <div
                  key={index}
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white transition-all hover:shadow-xl"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              )) || (
                <>
                  <ServiceCard icon="💻" title="Web Development" description="Pembuatan website profesional dan responsif" />
                  <ServiceCard icon="📱" title="Mobile App" description="Aplikasi mobile iOS dan Android" />
                  <ServiceCard icon="☁️" title="Cloud Solutions" description="Infrastruktur cloud yang scalable" />
                  <ServiceCard icon="🚀" title="Consulting" description="Konsultasi strategi digital" />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Portfolio Kami
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center">
              Proyek-proyek terbaru yang kami kerjakan
            </p>
            {latestPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestPosts.map((post: Post) => (
                  <div
                    key={post.id}
                    className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white transition-all hover:shadow-xl"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.body}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(post.created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 mb-4">Belum ada portfolio yang ditampilkan.</p>
                <Link
                  href="/admin/posts"
                  className="text-gray-900 dark:text-white font-medium hover:underline"
                >
                  Tambahkan portfolio pertama →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {contactContent?.title || 'Hubungi Kami'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
              Siap untuk memulai proyek Anda? Mari berdiskusi!
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="text-3xl mb-3">📧</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Email</h3>
                <a
                  href={`mailto:${contactContent?.email || 'info@digitalmaju.co.id'}`}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {contactContent?.email || 'info@digitalmaju.co.id'}
                </a>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="text-3xl mb-3">📞</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Telepon</h3>
                <a
                  href={`tel:${contactContent?.phone || '+62211234567'}`}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {contactContent?.phone || '+62 21 1234 5678'}
                </a>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="text-3xl mb-3">📍</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Alamat</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {contactContent?.address || 'Jakarta, Indonesia'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-12 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                PT. Digital Maju
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} PT. Digital Maju. All rights reserved.
            </p>
            <div className="flex gap-4">
              {contactContent?.social && (
                <>
                  {contactContent.social.linkedin && (
                    <a
                      href={contactContent.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      LinkedIn
                    </a>
                  )}
                  {contactContent.social.twitter && (
                    <a
                      href={contactContent.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      Twitter
                    </a>
                  )}
                  {contactContent.social.instagram && (
                    <a
                      href={contactContent.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      Instagram
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white transition-all hover:shadow-xl">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
}
