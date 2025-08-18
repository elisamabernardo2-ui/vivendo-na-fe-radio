import { useState, useEffect } from 'react';

interface NowPlayingData {
  title: string;
  artist?: string;
  artwork?: string;
  isLive: boolean;
}

export const useNowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData>({
    title: 'Ao Vivo',
    isLive: true
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if there's a custom endpoint for now playing data
    const nowPlayingUrl = import.meta.env.VITE_NOWPLAYING_URL;
    
    if (!nowPlayingUrl) {
      // Default to live status if no endpoint is configured
      setNowPlaying({
        title: 'Transmissão Ao Vivo',
        isLive: true
      });
      return;
    }

    const fetchNowPlaying = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(nowPlayingUrl);
        if (response.ok) {
          const data = await response.json();
          setNowPlaying({
            title: data.title || data.song || 'Ao Vivo',
            artist: data.artist || data.dj,
            artwork: data.artwork || data.image,
            isLive: data.isLive !== false
          });
        } else {
          throw new Error('Failed to fetch');
        }
      } catch (error) {
        console.log('Could not fetch now playing data, using fallback');
        setNowPlaying({
          title: 'Transmissão Ao Vivo',
          isLive: true
        });
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch immediately
    fetchNowPlaying();

    // Update every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    nowPlaying,
    isLoading
  };
};