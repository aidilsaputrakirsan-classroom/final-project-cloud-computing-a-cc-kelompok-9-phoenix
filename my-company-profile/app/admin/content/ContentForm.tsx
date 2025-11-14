'use client';

import { useState } from 'react';
import { updateSiteContent } from './actions';

interface ContentFormProps {
  sections: {
    hero: any;
    about: any;
    services: any;
    contact: any;
  };
}

export function ContentForm({ sections }: ContentFormProps) {
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'services' | 'contact'>('hero');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const tabs = [
    { id: 'hero' as const, label: 'Hero Section', icon: '🚀' },
    { id: 'about' as const, label: 'About', icon: '📖' },
    { id: 'services' as const, label: 'Services', icon: '⚙️' },
    { id: 'contact' as const, label: 'Contact', icon: '📞' },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await updateSiteContent(activeTab, formData);
      if (result.success) {
        setMessage({ type: 'success', text: 'Content updated successfully!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update content' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-300 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200'
              : 'bg-red-50 border border-red-300 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Forms */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
        {activeTab === 'hero' && (
          <HeroForm onSubmit={handleSubmit} data={sections.hero} saving={saving} />
        )}
        {activeTab === 'about' && (
          <AboutForm onSubmit={handleSubmit} data={sections.about} saving={saving} />
        )}
        {activeTab === 'services' && (
          <ServicesForm onSubmit={handleSubmit} data={sections.services} saving={saving} />
        )}
        {activeTab === 'contact' && (
          <ContactForm onSubmit={handleSubmit} data={sections.contact} saving={saving} />
        )}
      </div>
    </div>
  );
}

function HeroForm({ onSubmit, data, saving }: any) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Title
        </label>
        <input
          type="text"
          name="title"
          defaultValue={data?.title || ''}
          className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="PT. Digital Maju"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Subtitle
        </label>
        <input
          type="text"
          name="subtitle"
          defaultValue={data?.subtitle || ''}
          className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Solusi Digital Terpercaya untuk Bisnis Anda"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Description
        </label>
        <textarea
          name="description"
          rows={4}
          defaultValue={data?.description || ''}
          className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Kami membantu perusahaan..."
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
            CTA Button Text
          </label>
          <input
            type="text"
            name="cta_text"
            defaultValue={data?.cta_text || ''}
            className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Hubungi Kami"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
            CTA Button Link
          </label>
          <input
            type="text"
            name="cta_link"
            defaultValue={data?.cta_link || ''}
            className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="#contact"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={saving}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-semibold"
      >
        {saving ? 'Saving...' : 'Save Hero Section'}
      </button>
    </form>
  );
}

function AboutForm({ onSubmit, data, saving }: any) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Title
        </label>
        <input
          type="text"
          name="title"
          defaultValue={data?.title || ''}
          className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Description
        </label>
        <textarea
          name="description"
          rows={6}
          defaultValue={data?.description || ''}
          className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Mission
        </label>
        <textarea
          name="mission"
          rows={3}
          defaultValue={data?.mission || ''}
          className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Vision
        </label>
        <textarea
          name="vision"
          rows={3}
          defaultValue={data?.vision || ''}
          className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={saving}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-semibold"
      >
        {saving ? 'Saving...' : 'Save About Section'}
      </button>
    </form>
  );
}

function ServicesForm({ onSubmit, data, saving }: any) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Section Title
        </label>
        <input
          type="text"
          name="title"
          defaultValue={data?.title || ''}
          className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Edit service items (enter JSON array format):
      </p>
      <textarea
        name="items"
        rows={15}
        defaultValue={JSON.stringify(data?.items || [], null, 2)}
        className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
        placeholder='[{"title": "Service Name", "description": "Description", "icon": "💻"}]'
      />
      <button
        type="submit"
        disabled={saving}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-semibold"
      >
        {saving ? 'Saving...' : 'Save Services'}
      </button>
    </form>
  );
}

function ContactForm({ onSubmit, data, saving }: any) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Title
        </label>
        <input
          type="text"
          name="title"
          defaultValue={data?.title || ''}
          className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            defaultValue={data?.email || ''}
            className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            defaultValue={data?.phone || ''}
            className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Address
        </label>
        <textarea
          name="address"
          rows={3}
          defaultValue={data?.address || ''}
          className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Social Media Links
        </label>
        <div className="space-y-4">
          <input
            type="url"
            name="linkedin"
            defaultValue={data?.social?.linkedin || ''}
            className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="LinkedIn URL"
          />
          <input
            type="url"
            name="twitter"
            defaultValue={data?.social?.twitter || ''}
            className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Twitter URL"
          />
          <input
            type="url"
            name="instagram"
            defaultValue={data?.social?.instagram || ''}
            className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Instagram URL"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={saving}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-semibold"
      >
        {saving ? 'Saving...' : 'Save Contact Info'}
      </button>
    </form>
  );
}
