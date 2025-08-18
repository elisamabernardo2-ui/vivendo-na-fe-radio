
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface NowPlayingData {
  title: string;
  artist?: string;
  artwork?: string;
  isLive: boolean;
}

export const useNowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData>({
    title: 'Rádio Vivendo Na Fé',
    isLive: true
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching now playing data...');
        
        // Call our Edge Function
        const { data, error } = await supabase.functions.invoke('now-playing');
        
        if (error) {
          console.error('Error calling now-playing function:', error);
          throw error;
        }

        if (data) {
          console.log('Now playing data received:', data);
          setNowPlaying({
            title: data.title || 'Rádio Vivendo Na Fé',
            artist: data.artist,
            artwork: data.artwork,
            isLive: data.isLive !== false
          });
        }
      } catch (error) {
        console.log('Could not fetch now playing data, using fallback:', error);
        setNowPlaying({
          title: 'Rádio Vivendo Na Fé',
          isLive: true
        });
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch immediately
    fetchNowPlaying();

    // Update every 15 seconds (more frequent for better UX)
    const interval = setInterval(fetchNowPlaying, 15000);

    return () => clearInterval(interval);
  }, []);

  return {
    nowPlaying,
    isLoading
  };
};
