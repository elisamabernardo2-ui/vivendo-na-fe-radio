import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Play, Users, Clock } from 'lucide-react';
import RadioPlayer from './RadioPlayer';
import IOSInstallModal from './IOSInstallModal';
import { usePWAInstall } from '@/hooks/usePWAInstall';

const HeroSection = () => {
  console.log('HeroSection component rendered');
  const { isInstalled, isIOS, showIOSModal, setShowIOSModal, promptInstall } = usePWAInstall();
  
  const stats = [
    { icon: Users, label: "Ouvintes Online", value: "1.2K" },
    { icon: Clock, label: "Hrs no Ar", value: "24/7" },
    { icon: Play, label: "Programas", value: "15+" },
  ];

  return (
    <div className="min-h-screen bg-gradient-celestial flex flex-col">
      {/* Hero Content */}
      <div className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-divine-gold animate-float">
              Radio Vivendo Na Fé
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Transmitindo esperança, fé e música gospel 24 horas por dia
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-md mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-divine-gold/10 rounded-full mb-2">
                    <Icon className="h-5 w-5 text-divine-gold" />
                  </div>
                  <div className="text-lg font-bold text-pure-white">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Player */}
          <div className="max-w-md mx-auto">
            <RadioPlayer />
          </div>

          {/* Download Section */}
          <Card className="bg-holy-light/50 border-divine-gold/20 max-w-lg mx-auto">
            <div className="p-6 text-center space-y-4">
              <h3 className="text-xl font-semibold text-divine-gold">Baixe Nosso App</h3>
              <p className="text-muted-foreground">
                Instale em seu dispositivo para ouvir em qualquer lugar
              </p>
              {!isInstalled && (
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    onClick={promptInstall}
                    className="bg-divine-gold hover:bg-divine-gold/90 text-sacred-dark font-medium shadow-glow"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isIOS ? 'Instalar App' : 'Android'}
                  </Button>
                  {!isIOS && (
                    <Button 
                      onClick={() => setShowIOSModal(true)}
                      className="bg-divine-gold hover:bg-divine-gold/90 text-sacred-dark font-medium shadow-glow"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      iOS
                    </Button>
                  )}
                </div>
              )}
              
              {isInstalled && (
                <div className="text-center text-divine-gold">
                  ✓ App já instalado!
                </div>
              )}
            </div>
          </Card>

          {/* Live Indicator */}
          <div className="flex items-center justify-center gap-2 text-celestial-blue">
            <div className="w-3 h-3 bg-celestial-blue rounded-full animate-pulse-glow"></div>
            <span className="text-sm font-medium">AO VIVO AGORA</span>
          </div>
        </div>
      </div>
      
      <IOSInstallModal 
        open={showIOSModal}
        onOpenChange={setShowIOSModal}
      />
    </div>
  );
};

export default HeroSection;