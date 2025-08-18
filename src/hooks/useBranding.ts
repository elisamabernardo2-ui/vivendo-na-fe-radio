
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BrandingData {
  name: string;
  logo_url?: string | null;
  cover_url?: string | null;
}

export const useBranding = () => {
  const [branding, setBranding] = useState<BrandingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBranding = async () => {
      try {
        const { data, error } = await supabase
          .from('app_branding')
          .select('name, logo_url, cover_url')
          .eq('active', true)
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('Error fetching branding:', error);
          return;
        }

        if (data) {
          setBranding(data);
        }
      } catch (error) {
        console.error('Error in useBranding:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBranding();
  }, []);

  return {
    branding,
    isLoading
  };
};
