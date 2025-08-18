
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PlaybackData {
  title: string;
  artist?: string;
  artwork?: string;
  isLive: boolean;
  duration?: number; // in seconds
  startedAt: string;
  currentTime: number; // calculated elapsed time in seconds
}

export const usePlayback = () => {
  const [playback, setPlayback] = useState<PlaybackData>({
    title: 'Rádio Vivendo Na Fé',
    isLive: true,
    startedAt: new Date().toISOString(),
    currentTime: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPlaybackData = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching playback data...');
        
        // Get current playback from database
        const { data, error } = await supabase
          .from('current_playback')
          .select('*')
          .single();
        
        if (error) {
          console.error('Error fetching playback:', error);
          return;
        }

        if (data) {
          console.log('Playback data received:', data);
          const startedAt = new Date(data.started_at);
          const now = new Date();
          const elapsedSeconds = Math.floor((now.getTime() - startedAt.getTime()) / 1000);
          
          setPlayback({
            title: data.song_title,
            artist: data.artist,
            artwork: data.artwork_url,
            isLive: data.is_live,
            duration: data.duration_sec,
            startedAt: data.started_at,
            currentTime: Math.max(0, elapsedSeconds)
          });
        }
      } catch (error) {
        console.log('Could not fetch playback data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch immediately
    fetchPlaybackData();

    // Update every 5 seconds for fresh data
    const fetchInterval = setInterval(fetchPlaybackData, 5000);

    // Update current time every second for smooth progress
    const timeInterval = setInterval(() => {
      setPlayback(prev => ({
        ...prev,
        currentTime: prev.currentTime + 1
      }));
    }, 1000);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    if (!playback.duration || playback.isLive) return 0;
    return Math.min((playback.currentTime / playback.duration) * 100, 100);
  };

  return {
    playback,
    isLoading,
    formatTime,
    getProgress
  };
};
