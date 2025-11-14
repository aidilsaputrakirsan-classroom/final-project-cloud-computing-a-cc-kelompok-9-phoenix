'use server';

import { createServerClient } from '@/lib/supabaseServer';
import { revalidatePath } from 'next/cache';

export async function updateSiteContent(section: string, formData: FormData) {
  const supabase = createServerClient();

  let content: any = {};

  try {
    if (section === 'hero') {
      content = {
        title: formData.get('title'),
        subtitle: formData.get('subtitle'),
        description: formData.get('description'),
        cta_text: formData.get('cta_text'),
        cta_link: formData.get('cta_link'),
      };
    } else if (section === 'about') {
      content = {
        title: formData.get('title'),
        description: formData.get('description'),
        mission: formData.get('mission'),
        vision: formData.get('vision'),
      };
    } else if (section === 'services') {
      const itemsString = formData.get('items') as string;
      const items = JSON.parse(itemsString);
      content = {
        title: formData.get('title'),
        items,
      };
    } else if (section === 'contact') {
      content = {
        title: formData.get('title'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        social: {
          linkedin: formData.get('linkedin'),
          twitter: formData.get('twitter'),
          instagram: formData.get('instagram'),
        },
      };
    }

    const { error } = await supabase
      .from('site_content')
      .upsert({
        section_name: section,
        content,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'section_name'
      });

    if (error) {
      console.error('Error updating content:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    // Revalidate homepage to show new content
    revalidatePath('/');
    revalidatePath('/admin/content');

    return {
      success: true,
    };
  } catch (error: any) {
    console.error('Error updating content:', error);
    return {
      success: false,
      error: error.message || 'Failed to update content',
    };
  }
}
