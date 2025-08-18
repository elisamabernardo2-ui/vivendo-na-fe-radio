import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface RadioPlayerProps {
  autoplay?: boolean;
}

const RadioPlayer = ({ autoplay = false }: RadioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const radioStream = "https://stream.zeno.fm/ug07t11zn0hvv";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (autoplay) {
      // Try to autoplay after a short delay
      const timer = setTimeout(() => {
        togglePlay();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [autoplay]);

  const togglePlay = async () => {
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
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const vol = newVolume[0];
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol / 100;
    }
  };

  return (
    <Card className="bg-gradient-player border-divine-gold/20 shadow-divine backdrop-blur-sm">
      <div className="p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-divine-gold mb-2">AO VIVO</h2>
          <p className="text-muted-foreground">Transmitindo agora</p>
        </div>

        <div className="flex items-center justify-center gap-6 mb-6">
          <Button
            onClick={togglePlay}
            disabled={isLoading}
            className="w-20 h-20 rounded-full bg-divine-gold hover:bg-divine-gold/90 text-sacred-dark shadow-glow transition-all duration-300 hover:scale-105"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-sacred-dark border-t-transparent" />
            ) : isPlaying ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8 ml-1" />
            )}
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
            className="text-muted-foreground hover:text-divine-gold"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          
          <div className="flex-1">
            <Slider
              value={[isMuted ? 0 : volume]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
          
          <span className="text-sm text-muted-foreground w-8">
            {isMuted ? 0 : volume}%
          </span>
        </div>

        {isPlaying && (
          <div className="mt-4 text-center">
            <div className="flex justify-center items-center gap-2">
              <div className="w-2 h-2 bg-divine-gold rounded-full animate-pulse-glow"></div>
              <span className="text-sm text-divine-gold font-medium">CONECTADO</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RadioPlayer;