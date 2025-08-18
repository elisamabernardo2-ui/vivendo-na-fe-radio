import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Radio, Home, Newspaper, Info, Phone, Settings } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import logo from '@/assets/logo.png';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Header = ({ activeSection, onSectionChange }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  console.log('Header component rendered, activeSection:', activeSection);

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
            <div className="w-10 h-10 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300 bg-divine-gold/10 flex items-center justify-center">
              <img 
                src={logo} 
                alt="Radio Vivendo Na Fé" 
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '<div class="p-2 bg-gradient-divine rounded-full"><svg class="h-6 w-6 text-sacred-dark" fill="currentColor" viewBox="0 0 24 24"><path d="M3.24 6.15C2.51 6.43 2 7.17 2 8v8c0 1.1.89 2 2 2h16c1.11 0 2-.9 2-2V8c0-.83-.51-1.57-1.24-1.85L12 .69 3.24 6.15z"/></svg></div>';
                }}
              />
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
            
            <Link to="/auth">
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-sm transition-all duration-300 text-muted-foreground hover:text-divine-gold hover:bg-divine-gold/5"
              >
                <Settings className="h-4 w-4" />
                Admin
              </Button>
            </Link>
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
                
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-base transition-all duration-300 text-muted-foreground hover:text-divine-gold hover:bg-divine-gold/5"
                  >
                    <Settings className="h-5 w-5" />
                    Admin
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;