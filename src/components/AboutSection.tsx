import { Card } from '@/components/ui/card';
import { Heart, Music, Users, Cross } from 'lucide-react';

const AboutSection = () => {
  const values = [
    {
      icon: Cross,
      title: "Fé",
      description: "Levamos a palavra de Deus através da música e programação cristã"
    },
    {
      icon: Heart,
      title: "Amor",
      description: "Compartilhamos o amor de Cristo com todos os nossos ouvintes"
    },
    {
      icon: Music,
      title: "Música",
      description: "As melhores músicas gospel e hinos tradicionais"
    },
    {
      icon: Users,
      title: "Comunidade",
      description: "Unindo pessoas através da fé e da música"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-4xl font-bold text-divine-gold">Sobre a Radio Vivendo Na Fé</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Desde nossa fundação, temos o compromisso de levar esperança, fé e música gospel 
          para todos os lares. Nossa missão é transmitir a palavra de Deus através de uma 
          programação diversificada e de qualidade.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, index) => {
          const Icon = value.icon;
          return (
            <Card key={index} className="bg-holy-light border-divine-gold/20 hover:border-divine-gold/40 transition-all duration-300 hover:shadow-celestial group">
              <div className="p-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-divine rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-8 w-8 text-sacred-dark" />
                </div>
                <h3 className="text-xl font-semibold text-divine-gold">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-player border-divine-gold/20 shadow-divine">
        <div className="p-8 md:p-12 text-center space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-divine-gold">Nossa História</h3>
          <div className="max-w-4xl mx-auto space-y-4 text-muted-foreground leading-relaxed">
            <p>
              A Radio Vivendo Na Fé nasceu do sonho de levar a palavra de Deus a todos os cantos do Brasil. 
              Iniciamos nossa transmissão com o objetivo de ser mais que uma rádio - ser um instrumento 
              de evangelização e transformação de vidas.
            </p>
            <p>
              Nossa programação conta com momentos de oração, estudos bíblicos, música gospel nacional 
              e internacional, além de programas especiais para toda a família. Acreditamos que através 
              da música e da palavra, podemos tocar corações e fortalecer a fé de nossos ouvintes.
            </p>
            <p>
              Hoje, com milhares de ouvintes em todo o país, continuamos firmes em nossa missão de 
              transmitir esperança e promover o crescimento espiritual através de uma programação 
              de qualidade e comprometida com os valores cristãos.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AboutSection;