import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Newspaper } from 'lucide-react';
import RadioPlayer from '@/components/RadioPlayer';
import { useNowPlaying } from '@/hooks/useNowPlaying';
import { useNavigate, useSearchParams } from 'react-router-dom';
import logo from '@/assets/logo.png';

const Player = () => {
  const { nowPlaying } = useNowPlaying();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check if auto-play was requested
    const action = searchParams.get('action');
    if (action === 'play') {
      // Auto-play will be handled by RadioPlayer component
      console.log('Auto-play requested');
    }
  }, [searchParams]);

  const handleNewsClick = () => {
    navigate('/?section=news');
  };

  return (
    <div className="min-h-screen bg-gradient-celestial flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-24 h-24 rounded-full overflow-hidden shadow-divine bg-divine-gold/10 flex items-center justify-center">
            <img 
              src={logo} 
              alt="Radio Vivendo Na Fé" 
              className="w-20 h-20 object-contain"
              onError={(e) => {
                // Fallback to radio icon if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = '<div class="w-12 h-12 bg-divine-gold rounded-full flex items-center justify-center"><svg class="w-6 h-6 text-sacred-dark" fill="currentColor" viewBox="0 0 24 24"><path d="M3.24 6.15C2.51 6.43 2 7.17 2 8v8c0 1.1.89 2 2 2h16c1.11 0 2-.9 2-2V8c0-.83-.51-1.57-1.24-1.85L12 .69 3.24 6.15zM7 19H6v-7h1v7zm2 0H8v-7h1v7zm2 0h-1v-7h1v7zm2 0h-1v-7h1v7zm2 0h-1v-7h1v7zm2 0h-1v-7h1v7z"/></svg></div>';
              }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-divine-gold">
              Rádio Vivendo Na Fé
            </h1>
            <p className="text-sm text-muted-foreground">
              Transmitindo Esperança
            </p>
          </div>
        </div>

        {/* Now Playing */}
        <Card className="bg-holy-light/30 border-divine-gold/20 backdrop-blur-sm">
          <div className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-2 h-2 bg-celestial-blue rounded-full animate-pulse-glow"></div>
              <span className="text-xs font-medium text-celestial-blue uppercase tracking-wide">
                Tocando Agora
              </span>
            </div>
            <h2 className="text-lg font-semibold text-pure-white">
              {nowPlaying.title}
            </h2>
            {nowPlaying.artist && (
              <p className="text-sm text-muted-foreground mt-1">
                {nowPlaying.artist}
              </p>
            )}
          </div>
        </Card>

        {/* Radio Player */}
        <RadioPlayer autoplay={searchParams.get('action') === 'play'} />

        {/* Quick Actions */}
        <div className="flex gap-3">
          <Button
            onClick={handleNewsClick}
            variant="outline"
            className="flex-1 bg-holy-light/20 border-divine-gold/30 text-pure-white hover:bg-divine-gold/20"
          >
            <Newspaper className="h-4 w-4 mr-2" />
            Notícias
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Player;