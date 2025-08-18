
import { useState } from 'react';
import { ArrowLeft, Menu, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CircularPlayer from '@/components/CircularPlayer';
import { useRadioStream } from '@/hooks/useRadioStream';
import { useNowPlaying } from '@/hooks/useNowPlaying';
import { useBranding } from '@/hooks/useBranding';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

const Player = () => {
  const { isPlaying, isLoading, togglePlay, volume, setVolume } = useRadioStream();
  const { nowPlaying } = useNowPlaying();
  const { branding } = useBranding();
  const [isLiked, setIsLiked] = useState(false);

  console.log('Player rendered - nowPlaying:', nowPlaying);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Rádio Vivendo Na Fé',
          text: `Ouvindo: ${nowPlaying.title}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copiado para a área de transferência!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Erro ao compartilhar');
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Removido dos favoritos' : 'Adicionado aos favoritos');
  };

  // Use branding cover or nowPlaying artwork, fallback to radio logo
  const displayImage = branding?.cover_url || nowPlaying.artwork;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sacred-dark via-sacred-dark/95 to-sacred-dark">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <Button variant="ghost" size="sm" className="text-white">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="text-center">
          <span className="text-divine-gold text-sm font-medium">AO VIVO</span>
        </div>
        <Button variant="ghost" size="sm" className="text-white">
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Main Player Section */}
      <div className="flex flex-col items-center px-8 mt-8">
        {/* Circular Player */}
        <div className="mb-12">
          <CircularPlayer
            isPlaying={isPlaying}
            isLoading={isLoading}
            onTogglePlay={togglePlay}
            artistImage={displayImage}
          />
        </div>

        {/* Song Info */}
        <div className="text-center mb-8 max-w-sm">
          <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
            {nowPlaying.title}
          </h2>
          {nowPlaying.artist && (
            <p className="text-white/80 text-lg">
              {nowPlaying.artist}
            </p>
          )}
          {nowPlaying.isLive && (
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 text-sm font-medium">TRANSMISSÃO AO VIVO</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-8 mb-8">
          <Button
            variant="ghost"
            size="lg"
            onClick={handleLike}
            className={`text-white hover:text-divine-gold transition-colors ${
              isLiked ? 'text-divine-gold' : ''
            }`}
          >
            <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            onClick={handleShare}
            className="text-white hover:text-divine-gold transition-colors"
          >
            <Share2 className="h-6 w-6" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-4">
            <span className="text-white/60 text-sm min-w-[40px]">Vol</span>
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-white/60 text-sm min-w-[35px]">
              {volume}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
