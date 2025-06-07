import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, GraduationCap, User, Users } from "lucide-react";
import { useUserRole, UserRole } from "@/contexts/UserRoleContext";

export function RoleSelector() {
  const { setRole } = useUserRole();

  const roles = [
    {
      id: 'admin' as UserRole,
      title: 'Administrateur',
      description: 'Gestion complète de la plateforme',
      icon: Shield,
      color: 'bg-red-500',
      features: ['Gestion utilisateurs', 'Modération', 'Statistiques globales', 'Configuration système']
    },
    {
      id: 'teacher' as UserRole,
      title: 'Professeur',
      description: 'Créer et gérer des cours',
      icon: GraduationCap,
      color: 'bg-green-500',
      features: ['Création de cours', 'Lives pédagogiques', 'Suivi étudiants', 'Forums de classe']
    },
    {
      id: 'student' as UserRole,
      title: 'Étudiant',
      description: 'Accéder aux cours et tests',
      icon: User,
      color: 'bg-blue-500',
      features: ['Tests et examens', 'Suivi de progression', 'Lives éducatifs', 'Forums d\'entraide']
    },
    {
      id: 'parent' as UserRole,
      title: 'Parent',
      description: 'Suivre la scolarité de vos enfants',
      icon: Users,
      color: 'bg-purple-500',
      features: ['Suivi des enfants', 'Communication école', 'Lives pour parents', 'Alertes importantes']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/58230061-e916-401f-819d-14d1f2264c70.png" 
            alt="ZIDNEY Logo" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent mb-2">
            Bienvenue sur ZIDNEY
          </h1>
          <p className="text-muted-foreground">
            Choisissez votre profil pour accéder à votre interface personnalisée
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <Card key={role.id} className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${role.color} rounded-lg flex items-center justify-center`}>
                    <role.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{role.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {role.features.map((feature, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  onClick={() => setRole(role.id)}
                >
                  Accéder en tant que {role.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Vous pourrez changer de profil à tout moment depuis les paramètres</p>
        </div>
      </div>
    </div>
  );
}