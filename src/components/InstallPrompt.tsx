import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';

const InstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const { isInstalled, canInstall, promptInstall } = usePWAInstall();

  useEffect(() => {
    // Mostrar prompt após alguns segundos se estiver disponível
    const timer = setTimeout(() => {
      if (!isInstalled && canInstall) {
        setShowPrompt(true);
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [isInstalled, canInstall]);

  const handleInstallClick = () => {
    promptInstall();
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (isInstalled || !showPrompt || !canInstall) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-gradient-divine border-divine-gold/30 shadow-divine z-50">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-divine-gold" />
            <h3 className="font-semibold text-pure-white">Instalar App</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-6 w-6 p-0 text-muted-foreground hover:text-pure-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          Instale o Radio Vivendo Na Fe no seu dispositivo para uma experiência melhor!
        </p>
        
        <Button
          onClick={handleInstallClick}
          className="w-full bg-divine-gold hover:bg-divine-gold/90 text-sacred-dark font-medium"
        >
          <Download className="h-4 w-4 mr-2" />
          Instalar Agora
        </Button>
      </div>
    </Card>
  );
};

export default InstallPrompt;