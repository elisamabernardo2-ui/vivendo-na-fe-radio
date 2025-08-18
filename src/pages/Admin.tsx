import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, Radio, Calendar, Users, Music, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Admin = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-celestial flex items-center justify-center">
        <div className="text-center">
          <Radio className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-celestial">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-sm border-b border-border/50 shadow-celestial">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-divine flex items-center justify-center">
              <Radio className="w-5 h-5 text-sacred-dark" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Painel Administrativo</h1>
              <p className="text-sm text-muted-foreground">Rádio Vivendo Na Fé</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="bg-background/50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Bem-vindo ao Sistema de Programação
          </h2>
          <p className="text-muted-foreground">
            Gerencie a programação da rádio, programas e conteúdo em tempo real.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card/95 backdrop-blur-sm border-border/50 hover:shadow-divine transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle>Programação</CardTitle>
                  <CardDescription>Gerencie a grade de programação</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Acessar Programação
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card/95 backdrop-blur-sm border-border/50 hover:shadow-divine transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Music className="w-8 h-8 text-secondary" />
                <div>
                  <CardTitle>Reprodução Atual</CardTitle>
                  <CardDescription>Controle o que está tocando</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Controlar Player
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card/95 backdrop-blur-sm border-border/50 hover:shadow-divine transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-accent" />
                <div>
                  <CardTitle>Apresentadores</CardTitle>
                  <CardDescription>Gerencie apresentadores e DJs</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Gerenciar Equipe
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card/95 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">24h</div>
              <div className="text-sm text-muted-foreground">Transmissão</div>
            </CardContent>
          </Card>

          <Card className="bg-card/95 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-secondary mb-1">12</div>
              <div className="text-sm text-muted-foreground">Programas Ativos</div>
            </CardContent>
          </Card>

          <Card className="bg-card/95 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-accent mb-1">8</div>
              <div className="text-sm text-muted-foreground">Apresentadores</div>
            </CardContent>
          </Card>

          <Card className="bg-card/95 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-divine-gold mb-1">99%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Admin;