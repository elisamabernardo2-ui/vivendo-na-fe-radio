import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import NewsSection from '@/components/NewsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import InstallPrompt from '@/components/InstallPrompt';

const Index = () => {
  console.log('Index component starting...');
  
  const [activeSection, setActiveSection] = useState('home');
  
  console.log('Index component rendered, activeSection:', activeSection);

  useEffect(() => {
    console.log('Index useEffect triggered');
    // Verifica se há uma action específica na URL
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    const section = urlParams.get('section');
    
    if (section) {
      setActiveSection(section);
    }
    
    // PWA action handling pode ser implementado aqui
    if (action === 'play') {
      // Auto-play logic seria implementada aqui
      console.log('Auto-play triggered from PWA shortcut');
    }
  }, []);

  const renderContent = () => {
    console.log('Rendering content for section:', activeSection);
    
    try {
      switch (activeSection) {
        case 'news':
          return (
            <div className="min-h-screen bg-gradient-celestial">
              <div className="container mx-auto px-4 py-8">
                <NewsSection />
              </div>
            </div>
          );
        case 'about':
          return (
            <div className="min-h-screen bg-gradient-celestial">
              <AboutSection />
            </div>
          );
        case 'contact':
          return (
            <div className="min-h-screen bg-gradient-celestial">
              <ContactSection />
            </div>
          );
        default:
          console.log('Rendering HeroSection');
          return <HeroSection />;
      }
    } catch (error) {
      console.error('Error rendering content:', error);
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Radio Vivendo Na Fé</h1>
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        </div>
      );
    }
  };

  try {
    console.log('Rendering Index component');
    return (
      <div className="min-h-screen bg-gradient-celestial">
        <Header activeSection={activeSection} onSectionChange={setActiveSection} />
        {renderContent()}
        <InstallPrompt />
      </div>
    );
  } catch (error) {
    console.error('Error in Index component:', error);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Radio Vivendo Na Fé</h1>
          <p className="text-muted-foreground">Erro ao carregar a aplicação</p>
        </div>
      </div>
    );
  }
};

export default Index;