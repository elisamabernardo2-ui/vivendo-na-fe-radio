import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NewsSection = () => {
  // Dados mockados de notícias - em produção viria de uma API
  const news = [
    {
      id: 1,
      title: "Novo programa especial de oração às segundas-feiras",
      excerpt: "A partir desta semana, iniciamos um programa especial de oração e reflexão todos os dias às 6h da manhã...",
      time: "Há 2 horas",
      category: "Programação",
      urgent: false,
    },
    {
      id: 2,
      title: "Transmissão especial do culto de domingo",
      excerpt: "Acompanhe conosco a transmissão ao vivo do culto dominical com pregação especial do Pastor João...",
      time: "Há 4 horas",
      category: "Eventos",
      urgent: true,
    },
    {
      id: 3,
      title: "Campanha de arrecadação para famílias necessitadas",
      excerpt: "Participe da nossa campanha solidária para ajudar famílias em situação de vulnerabilidade...",
      time: "Há 6 horas",
      category: "Solidariedade",
      urgent: false,
    },
    {
      id: 4,
      title: "Nova música gospel em destaque",
      excerpt: "Confira a mais nova música que está tocando em nossa rádio: 'Deus Cuida de Mim' de Ana Silva...",
      time: "Há 8 horas",
      category: "Música",
      urgent: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-divine-gold mb-2">Notícias em Tempo Real</h2>
        <p className="text-muted-foreground">Fique por dentro das últimas novidades da nossa rádio</p>
      </div>

      <div className="grid gap-4">
        {news.map((item) => (
          <Card key={item.id} className="bg-holy-light border-divine-gold/20 hover:border-divine-gold/40 transition-all duration-300 hover:shadow-celestial">
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={item.urgent ? "destructive" : "secondary"}
                    className={item.urgent ? "bg-red-500/20 text-red-400" : "bg-celestial-blue/20 text-celestial-blue"}
                  >
                    {item.category}
                  </Badge>
                  {item.urgent && (
                    <Badge className="bg-red-500 text-white animate-pulse-glow">
                      URGENTE
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {item.time}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-pure-white mb-2 hover:text-divine-gold transition-colors cursor-pointer">
                {item.title}
              </h3>

              <p className="text-muted-foreground mb-4 leading-relaxed">
                {item.excerpt}
              </p>

              <Button 
                variant="ghost" 
                size="sm"
                className="text-divine-gold hover:text-divine-gold/80 hover:bg-divine-gold/10 p-0 h-auto"
              >
                Ler mais
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button 
          variant="outline"
          className="border-divine-gold/30 text-divine-gold hover:bg-divine-gold/10 hover:border-divine-gold"
        >
          Ver todas as notícias
        </Button>
      </div>
    </div>
  );
};

export default NewsSection;