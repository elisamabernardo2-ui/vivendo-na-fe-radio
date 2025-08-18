import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import NewsSection from '@/components/NewsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import InstallPrompt from '@/components/InstallPrompt';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
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
        return <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-celestial">
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />
      {renderContent()}
      <InstallPrompt />
    </div>
  );
};

export default Index;
