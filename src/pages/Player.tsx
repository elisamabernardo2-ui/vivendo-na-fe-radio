
import { ArrowLeft, Menu, SkipBack, SkipForward, Play, Pause, Home, Search, Settings, Music, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRadioStream } from '@/hooks/useRadioStream';
import { usePlayback } from '@/hooks/usePlayback';
import playerLogo from '@/assets/player-logo.png';

const Player = () => {
  const { isPlaying, isLoading, togglePlay } = useRadioStream();
  const { playback, formatTime, getProgress } = usePlayback();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 via-teal-500 to-purple-600">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <Button variant="ghost" size="sm" className="text-white p-2">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="text-center">
          <span className="text-white text-lg font-medium">Now Playing</span>
        </div>
        <Button variant="ghost" size="sm" className="text-white p-2">
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Main Player Section */}
      <div className="flex flex-col items-center px-8 mt-12">
        {/* Large Circular Player */}
        <div className="relative mb-12">
          <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center shadow-2xl">
            {playback.artwork ? (
              <img 
                src={playback.artwork} 
                alt="Album artwork"
                className="w-56 h-56 rounded-full object-cover"
              />
            ) : (
              <img 
                src={playerLogo} 
                alt="Rádio Vivendo Na Fé"
                className="w-56 h-56 rounded-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Song Info */}
        <div className="text-center mb-8 max-w-sm">
          <h2 className="text-3xl font-bold text-white mb-3 leading-tight">
            {playback.title}
          </h2>
          {playback.artist && (
            <p className="text-white/80 text-xl">
              {playback.artist}
            </p>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-8 mb-8">
          <Button 
            variant="ghost" 
            size="lg" 
            className="text-white p-0 w-12 h-12"
          >
            <SkipBack className="h-8 w-8" />
          </Button>
          
          <Button
            onClick={togglePlay}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-10 w-10 text-teal-500" />
            ) : (
              <Play className="h-10 w-10 text-teal-500 ml-1" />
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            size="lg" 
            className="text-white p-0 w-12 h-12"
          >
            <SkipForward className="h-8 w-8" />
          </Button>
        </div>

        {/* Progress Bar and Time */}
        <div className="w-full max-w-sm mb-8">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-white/80 text-sm min-w-[40px]">
              {formatTime(playback.currentTime)}
            </span>
            <div className="flex-1 h-1 bg-white/30 rounded-full">
              <div 
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ 
                  width: playback.isLive ? '100%' : `${getProgress()}%`
                }}
              />
            </div>
            <span className="text-white/80 text-sm min-w-[40px]">
              {playback.isLive ? 'LIVE' : (playback.duration ? formatTime(playback.duration) : '--:--')}
            </span>
          </div>
          
          {/* Live indicator */}
          {playback.isLive && (
            <div className="text-center">
              <div className="flex justify-center items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white/90 text-xs font-medium">AO VIVO</span>
              </div>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="w-full max-w-sm flex justify-between items-center mb-8">
          <span className="text-white/70 text-sm">Rádio Vivendo Na Fé</span>
          <span className="text-white/70 text-sm">Transmissão</span>
        </div>

        {/* Popular Song Section */}
        <div className="w-full max-w-sm mb-8">
          <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Music className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-medium">Música Anterior</h4>
                <p className="text-white/70 text-sm">Recém tocada</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-400"></div>
              <Button variant="ghost" size="sm" className="text-white p-1">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20">
        <div className="flex justify-around items-center py-4">
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-white/70 hover:text-white">
            <Home className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-white/70 hover:text-white">
            <Search className="h-6 w-6" />
            <span className="text-xs">Search</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-white hover:text-white">
            <Music className="h-6 w-6" />
            <span className="text-xs">Playing</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-white/70 hover:text-white">
            <Settings className="h-6 w-6" />
            <span className="text-xs">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Player;
