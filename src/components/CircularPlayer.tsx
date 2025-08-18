import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import WaveformBars from './WaveformBars';
import radioLogo from '@/assets/radio-logo.png';

interface CircularPlayerProps {
  isPlaying: boolean;
  isLoading: boolean;
  onTogglePlay: () => void;
  artistImage?: string;
}

const CircularPlayer = ({ isPlaying, isLoading, onTogglePlay, artistImage }: CircularPlayerProps) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Waveform animation */}
      <WaveformBars isPlaying={isPlaying} />
      
      {/* Main circular container */}
      <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-divine-gold/20 to-divine-gold/5 border-2 border-divine-gold/30 shadow-divine backdrop-blur-sm">
        {/* Artist image or logo */}
        <div className="absolute inset-4 rounded-full overflow-hidden bg-sacred-dark/50 flex items-center justify-center">
          <img 
            src={artistImage || radioLogo} 
            alt="Artist or Radio Logo" 
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = radioLogo;
            }}
          />
        </div>
        
        {/* Center play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            onClick={onTogglePlay}
            disabled={isLoading}
            className="w-16 h-16 rounded-full bg-divine-gold hover:bg-divine-gold/90 text-sacred-dark shadow-glow transition-all duration-300 hover:scale-105"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-sacred-dark border-t-transparent" />
            ) : isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-1" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CircularPlayer;