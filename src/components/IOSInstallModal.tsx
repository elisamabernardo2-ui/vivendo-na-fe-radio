import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Share, Plus, Smartphone } from 'lucide-react';

interface IOSInstallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const IOSInstallModal = ({ open, onOpenChange }: IOSInstallModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-divine border-divine-gold/30 max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-divine-gold flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Instalar no iOS
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-pure-white">
          <p className="text-sm text-muted-foreground">
            Para instalar o app no seu iPhone ou iPad:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-divine-gold/20 rounded-full p-1 mt-0.5">
                <span className="text-divine-gold text-xs font-bold">1</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Toque no botão</span>
                  <Share className="h-4 w-4 text-celestial-blue" />
                </div>
                <p className="text-xs text-muted-foreground">
                  (localizado na barra inferior do Safari)
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-divine-gold/20 rounded-full p-1 mt-0.5">
                <span className="text-divine-gold text-xs font-bold">2</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Selecione</span>
                  <Plus className="h-4 w-4 text-celestial-blue" />
                  <span className="text-sm">"Adicionar à Tela de Início"</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-divine-gold/20 rounded-full p-1 mt-0.5">
                <span className="text-divine-gold text-xs font-bold">3</span>
              </div>
              <div>
                <span className="text-sm">Toque em "Adicionar"</span>
              </div>
            </div>
          </div>
          
          <div className="bg-holy-light/10 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">
              O app aparecerá na sua tela inicial como um aplicativo nativo!
            </p>
          </div>
        </div>
        
        <Button 
          onClick={() => onOpenChange(false)}
          className="w-full bg-divine-gold hover:bg-divine-gold/90 text-sacred-dark"
        >
          Entendi
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default IOSInstallModal;