import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Radio, Home, Newspaper, Info, Phone } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Header = ({ activeSection, onSectionChange }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'news', label: 'Notícias', icon: Newspaper },
    { id: 'about', label: 'Sobre', icon: Info },
    { id: 'contact', label: 'Contato', icon: Phone },
  ];

  const handleNavigation = (section: string) => {
    onSectionChange(section);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-sacred-dark/95 backdrop-blur-md border-b border-divine-gold/20 shadow-celestial">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavigation('home')}
          >
            <div className="p-2 bg-gradient-divine rounded-full group-hover:scale-110 transition-transform duration-300">
              <Radio className="h-6 w-6 text-sacred-dark" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-divine-gold">Radio Vivendo Na Fé</h1>
              <p className="text-xs text-muted-foreground">Transmitindo Esperança</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleNavigation(item.id)}
                  className={`flex items-center gap-2 text-sm transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-divine-gold bg-divine-gold/10'
                      : 'text-muted-foreground hover:text-divine-gold hover:bg-divine-gold/5'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden text-divine-gold">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-sacred-dark border-divine-gold/20">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Radio className="h-5 w-5 text-divine-gold" />
                  <span className="font-semibold text-divine-gold">Menu</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <nav className="space-y-4">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      onClick={() => handleNavigation(item.id)}
                      className={`w-full justify-start gap-3 text-base transition-all duration-300 ${
                        activeSection === item.id
                          ? 'text-divine-gold bg-divine-gold/10'
                          : 'text-muted-foreground hover:text-divine-gold hover:bg-divine-gold/5'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;