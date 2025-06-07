import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { Users, Activity, Shield, MessageSquare, Video, BookOpen, BarChart3, AlertTriangle, Clock, TrendingUp, Settings, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function AdminDashboard() {
  const { t, language } = useLanguage();

  const globalStats = [
    {
      title: "Utilisateurs actifs",
      value: "1,247",
      subtitle: "Cette semaine",
      icon: Users,
      trend: "+12%",
      color: "blue" as const
    },
    {
      title: "Sessions totales",
      value: "8,942",
      subtitle: "Ce mois",
      icon: Activity,
      trend: "+8%",
      color: "green" as const
    },
    {
      title: "Sujets signalés",
      value: "3",
      subtitle: "À modérer",
      icon: AlertTriangle,
      trend: "-2",
      color: "orange" as const
    },
    {
      title: "Lives en cours",
      value: "4",
      subtitle: "Sessions actives",
      icon: Video,
      trend: "+1",
      color: "purple" as const
    }
  ];

  const forumStats = [
    {
      title: "Sujets créés",
      value: "156",
      subtitle: "Ce mois",
      icon: MessageSquare,
      trend: "+23%",
      color: "blue" as const
    },
    {
      title: "Réponses publiées",
      value: "1,289",
      subtitle: "Ce mois",
      icon: TrendingUp,
      trend: "+18%",
      color: "green" as const
    },
    {
      title: "Temps de réponse",
      value: "2.3h",
      subtitle: "Moyenne",
      icon: Clock,
      trend: "-30min",
      color: "orange" as const
    }
  ];

  const livesStats = [
    {
      title: "Lives planifiés",
      value: "12",
      subtitle: "Cette semaine",
      icon: Video,
      trend: "+3",
      color: "purple" as const
    },
    {
      title: "Audience moyenne",
      value: "89",
      subtitle: "Spectateurs/live",
      icon: Users,
      trend: "+15%",
      color: "blue" as const
    },
    {
      title: "Taux rediffusion",
      value: "76%",
      subtitle: "Consultées",
      icon: BarChart3,
      trend: "+8%",
      color: "green" as const
    }
  ];

  const recentActivities = [
    { action: "Nouveau live créé", user: "Prof. Martin", time: "Il y a 5 min", type: "live" },
    { action: "Sujet signalé", user: "Système", time: "Il y a 12 min", type: "moderation" },
    { action: "Utilisateur inscrit", user: "Sarah Ahmed", time: "Il y a 18 min", type: "user" },
    { action: "Test publié", user: "Prof. Dubois", time: "Il y a 25 min", type: "content" }
  ];

  const usersByRole = [
    { role: "Étudiants", count: 892, percentage: 71, color: "bg-blue-500" },
    { role: "Professeurs", count: 34, percentage: 3, color: "bg-green-500" },
    { role: "Parents", count: 298, percentage: 24, color: "bg-purple-500" },
    { role: "Administrateurs", count: 23, percentage: 2, color: "bg-orange-500" }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête Admin */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
          Administration ZIDNEY
        </h1>
        <p className="text-muted-foreground">
          Tableau de bord administrateur - Vue d'ensemble de la plateforme
        </p>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {globalStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Statistiques des modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Statistiques Forum */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <MessageSquare className="w-5 h-5 text-purple-600" />
              Module Forum - Statistiques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {forumStats.map((stat, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-700">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.subtitle}</div>
                  <div className="text-xs text-green-600 font-medium">{stat.trend}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Statistiques Lives */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Video className="w-5 h-5 text-orange-600" />
              Module Lives - Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {livesStats.map((stat, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-orange-700">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.subtitle}</div>
                  <div className="text-xs text-green-600 font-medium">{stat.trend}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activités récentes */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activités récentes</CardTitle>
              <CardDescription>Actions importantes sur la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center space-x-3 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-3 h-3 rounded-full ${
                        activity.type === 'live' ? 'bg-purple-500' :
                        activity.type === 'moderation' ? 'bg-red-500' :
                        activity.type === 'user' ? 'bg-blue-500' : 'bg-green-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.user}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions rapides Admin */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="outline" className="h-20 flex-col">
                  <Users className="w-6 h-6 mb-2" />
                  <span className="text-xs">Utilisateurs</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Shield className="w-6 h-6 mb-2" />
                  <span className="text-xs">Modération</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Settings className="w-6 h-6 mb-2" />
                  <span className="text-xs">Paramètres</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Database className="w-6 h-6 mb-2" />
                  <span className="text-xs">Base de données</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar droite */}
        <div className="space-y-4">
          {/* Répartition des utilisateurs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Utilisateurs par rôle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {usersByRole.map((role, index) => (
                <div key={index} className="space-y-2">
                  <div className={`flex justify-between text-sm ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <span className="font-medium">{role.role}</span>
                    <span className="text-muted-foreground">{role.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${role.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${role.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Alertes système */}
          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
            <CardHeader>
              <CardTitle className={`text-lg flex items-center gap-2 text-orange-700 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <AlertTriangle className="w-5 h-5" />
                Alertes système
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-white rounded-lg border border-orange-200">
                <p className="text-sm font-medium text-orange-700">Maintenance programmée</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Dimanche 15h00 - 17h00
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-red-200">
                <p className="text-sm font-medium text-red-700">3 sujets à modérer</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Signalements en attente
                </p>
              </div>
              <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                Voir toutes les alertes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}