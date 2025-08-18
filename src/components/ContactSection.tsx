import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      content: "(11) 9999-9999",
      action: "tel:+5511999999999"
    },
    {
      icon: Mail,
      title: "Email",
      content: "contato@radiovivendonafe.com",
      action: "mailto:contato@radiovivendonafe.com"
    },
    {
      icon: MapPin,
      title: "Endereço",
      content: "São Paulo, SP - Brasil",
      action: null
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      content: "(11) 99999-9999",
      action: "https://wa.me/5511999999999"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    // Aqui seria enviado para um backend
    toast({
      title: "Mensagem Enviada!",
      description: "Obrigado pelo contato. Retornaremos em breve!",
    });

    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-16 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-divine-gold">Entre em Contato</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Estamos aqui para ouvir você. Entre em contato conosco para sugestões, 
          orações ou qualquer dúvida.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-divine-gold mb-6">Fale Conosco</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="bg-holy-light border-divine-gold/20 hover:border-divine-gold/40 transition-all duration-300 hover:shadow-celestial group">
                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-divine rounded-full group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-4 w-4 text-sacred-dark" />
                      </div>
                      <div>
                        <h4 className="font-medium text-divine-gold">{info.title}</h4>
                        {info.action ? (
                          <a 
                            href={info.action}
                            className="text-sm text-muted-foreground hover:text-celestial-blue transition-colors"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground">{info.content}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <Card className="bg-gradient-player border-divine-gold/20">
            <div className="p-6 space-y-4">
              <h4 className="text-lg font-semibold text-divine-gold">Horário de Funcionamento</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Segunda - Sexta:</span>
                  <span>8h às 18h</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado:</span>
                  <span>9h às 15h</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo:</span>
                  <span>9h às 12h</span>
                </div>
                <div className="text-celestial-blue font-medium mt-2">
                  Transmissão: 24/7
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="bg-holy-light border-divine-gold/20 shadow-divine">
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-divine-gold mb-6">Envie uma Mensagem</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Nome Completo
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Seu nome completo"
                  className="bg-sacred-dark border-divine-gold/20 focus:border-divine-gold"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  className="bg-sacred-dark border-divine-gold/20 focus:border-divine-gold"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Mensagem
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Escreva sua mensagem aqui..."
                  rows={5}
                  className="bg-sacred-dark border-divine-gold/20 focus:border-divine-gold resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-divine-gold hover:bg-divine-gold/90 text-sacred-dark font-medium shadow-glow"
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContactSection;