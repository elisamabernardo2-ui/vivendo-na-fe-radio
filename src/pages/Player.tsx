import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import CircularPlayer from '@/components/CircularPlayer';
import { useNowPlaying } from '@/hooks/useNowPlaying';
import { useRadioStream } from '@/hooks/useRadioStream';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Player = () => {
  const { nowPlaying } = useNowPlaying();
  const { 
    isPlaying, 
    isLoading, 
    volume, 
    isMuted, 
    togglePlay, 
    toggleMute, 
    setVolume 
  } = useRadioStream();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check if auto-play was requested
    const action = searchParams.get('action');
    if (action === 'play') {
      togglePlay();
    }
  }, [searchParams, togglePlay]);

  return (
    <div className="min-h-screen bg-gradient-celestial flex flex-col">
      {/* Now Playing Header */}
      <div className="text-center py-8 px-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-2 h-2 bg-divine-gold rounded-full animate-pulse-glow"></div>
          <span className="text-sm font-medium text-divine-gold uppercase tracking-wide">
            Now Playing
          </span>
        </div>
        <h1 className="text-2xl font-bold text-pure-white mb-1">
          {nowPlaying.title}
        </h1>
        {nowPlaying.artist && (
          <p className="text-base text-muted-foreground">
            {nowPlaying.artist}
          </p>
        )}
      </div>

      {/* Central Player Area */}
      <div className="flex-1 flex items-center justify-center px-4">
        <CircularPlayer
          isPlaying={isPlaying}
          isLoading={isLoading}
          onTogglePlay={togglePlay}
          artistImage={nowPlaying.artwork}
        />
      </div>

      {/* Volume Controls */}
      <div className="px-8 pb-8">
        <Card className="bg-holy-light/20 border-divine-gold/20 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="text-divine-gold hover:text-divine-gold/80 hover:bg-divine-gold/10"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              
              <div className="flex-1">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  onValueChange={(value) => setVolume(value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <span className="text-sm text-divine-gold font-medium w-12 text-right">
                {isMuted ? 0 : volume}%
              </span>
            </div>

            {isPlaying && (
              <div className="mt-4 text-center">
                <div className="flex justify-center items-center gap-2">
                  <div className="w-2 h-2 bg-divine-gold rounded-full animate-pulse-glow"></div>
                  <span className="text-sm text-divine-gold font-medium">AO VIVO</span>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Player;