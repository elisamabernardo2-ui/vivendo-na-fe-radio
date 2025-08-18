import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Smartphone, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Verificar se já está instalado
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    
    if (isStandalone || isInWebAppiOS) {
      setIsInstalled(true);
      return;
    }

    // Listener para o evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    // Listener para quando o app é instalado
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      toast({
        title: "App Instalado!",
        description: "Radio Vivendo Na Fe foi instalado com sucesso!",
      });
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Mostrar prompt após alguns segundos se estiver disponível
    const timer = setTimeout(() => {
      if (!isInstalled) {
        setShowPrompt(true);
      }
    }, 3000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      clearTimeout(timer);
    };
  }, [toast, isInstalled]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback para dispositivos iOS ou outros navegadores
      toast({
        title: "Instalar App",
        description: "Para instalar: toque no botão compartilhar e selecione 'Adicionar à Tela de Início'",
      });
      return;
    }

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        toast({
          title: "Instalação iniciada!",
          description: "O app será instalado em breve...",
        });
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('Erro na instalação:', error);
      toast({
        title: "Erro na instalação",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (isInstalled || !showPrompt) {
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