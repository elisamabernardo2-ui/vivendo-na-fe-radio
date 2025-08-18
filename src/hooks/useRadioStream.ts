import { useState, useRef, useCallback, useEffect } from 'react';

export const useRadioStream = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const radioStream = "https://stream.zeno.fm/ug07t11zn0hvv";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = useCallback(async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(radioStream);
      audioRef.current.volume = volume / 100;
    }

    try {
      setIsLoading(true);
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying, volume]);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  }, []);

  return {
    isPlaying,
    isLoading,
    volume,
    isMuted,
    togglePlay,
    toggleMute,
    setVolume
  };
};