
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Menu, SkipBack, SkipForward, Pause, Play } from 'lucide-react';
import { useNowPlaying } from '@/hooks/useNowPlaying';
import { useRadioStream } from '@/hooks/useRadioStream';
import { useNavigate, useSearchParams } from 'react-router-dom';
import radioLogo from '@/assets/logo.png';

const Player = () => {
  const { nowPlaying } = useNowPlaying();
  const { 
    isPlaying, 
    isLoading, 
    togglePlay
  } = useRadioStream();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const action = searchParams.get('action');
    if (action === 'play') {
      togglePlay();
    }
  }, [searchParams, togglePlay]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-400 via-blue-500 to-purple-600 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Button variant="ghost" size="sm" className="text-white">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold">Now Playing</h1>
        <Button variant="ghost" size="sm" className="text-white">
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Album Art Circle */}
      <div className="flex justify-center mt-12 mb-8">
        <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center shadow-2xl">
          <div className="w-16 h-16 flex items-center justify-center">
            <img 
              src={nowPlaying.artwork || radioLogo} 
              alt="Artist" 
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = radioLogo;
              }}
            />
          </div>
        </div>
      </div>

      {/* Song Info */}
      <div className="text-center px-8 mb-12">
        <h2 className="text-2xl font-bold mb-2">
          {nowPlaying.title || 'The Best Song'}
        </h2>
        <p className="text-white/80 text-lg">
          {nowPlaying.artist || 'New Artist'}
        </p>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-8 mb-8">
        <Button variant="ghost" size="lg" className="text-white">
          <SkipBack className="h-8 w-8" />
        </Button>
        
        <Button
          onClick={togglePlay}
          disabled={isLoading}
          className="w-16 h-16 rounded-full bg-white hover:bg-white/90 text-purple-600 shadow-lg"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-600 border-t-transparent" />
          ) : isPlaying ? (
            <Pause className="h-8 w-8" />
          ) : (
            <Play className="h-8 w-8 ml-1" />
          )}
        </Button>
        
        <Button variant="ghost" size="lg" className="text-white">
          <SkipForward className="h-8 w-8" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="px-8 mb-8">
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/80">02:49</span>
          <div className="flex-1 h-1 bg-white/30 rounded-full">
            <div className="h-full w-1/2 bg-white rounded-full"></div>
          </div>
          <span className="text-sm text-white/80">04:59</span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-8 mb-6">
        <div className="flex justify-between items-center text-white/80">
          <span>Lorem ipsum</span>
          <span>My Playlist</span>
        </div>
      </div>

      {/* Current Song Item */}
      <div className="px-8 mb-8">
        <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <div className="text-white text-xl">♪</div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">Popular Song</span>
              <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2">✓</div>
              </div>
            </div>
            <p className="text-white/70 text-sm">Top 40 Artist</p>
          </div>
          <Button variant="ghost" size="sm" className="text-white">
            <Menu className="h-5 w-5 rotate-90" />
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20">
        <div className="flex items-center justify-around py-4">
          <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 bg-white rounded-sm"></div>
            <span className="text-xs text-white/80">Home</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 border-2 border-white/60 rounded-full"></div>
            <span className="text-xs text-white/60">Search</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 border-2 border-white/60 rounded-sm"></div>
            <span className="text-xs text-white/60">Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
