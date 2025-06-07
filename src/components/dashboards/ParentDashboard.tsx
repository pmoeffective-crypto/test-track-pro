import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { Users, TrendingUp, AlertCircle, Calendar, MessageSquare, Video, BookOpen, Clock, Bell, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";

export function ParentDashboard() {
  const { t, language } = useLanguage();

  const familyStats = [
    {
      title: "Enfants suivis",
      value: "2",
      subtitle: "Profils actifs",
      icon: Users,
      trend: "Stable",
      color: "blue" as const
    },
    {
      title: "Moyenne générale",
      value: "81%",
      subtitle: "Tous enfants",
      icon: TrendingUp,
      trend: "+3%",
      color: "green" as const
    },
    {
      title: "Alertes importantes",
      value: "1",
      subtitle: "À traiter",
      icon: AlertCircle,
      trend: "Nouveau",
      color: "orange" as const
    },
    {
      title: "Rendez-vous",
      value: "3",
      subtitle: "Cette semaine",
      icon: Calendar,
      trend: "+1",
      color: "purple" as const
    }
  ];

  const children = [
    {
      name: "Sarah Ahmed",
      class: "Terminale S",
      average: 85,
      lastConnection: "Il y a 2h",
      status: "excellent",
      recentActivity: "Test de mathématiques terminé",
      nextTest: "Physique - Lundi 14h00",
      alerts: []
    },
    {
      name: "Youssef Ahmed", 
      class: "1ère S",
      average: 72,
      lastConnection: "Il y a 1 jour",
      status: "good",
      recentActivity: "Révision chimie",
      nextTest: "Chimie - Mercredi 10h00",
      alerts: ["Note faible en physique"]
    }
  ];

  const upcomingEvents = [
    {
      type: "Réunion parent-prof",
      title: "Suivi Terminale S - Sarah",
      date: "Lundi 16h00",
      teacher: "Prof. Martin",
      priority: "high"
    },
    {
      type: "Live parents",
      title: "Orientation post-bac",
      date: "Mercredi 18h00",
      teacher: "Conseillère d'orientation",
      priority: "medium"
    },
    {
      type: "Remise de notes",
      title: "Bulletin trimestriel",
      date: "Vendredi",
      teacher: "Administration",
      priority: "low"
    }
  ];

  const recentAlerts = [
    {
      child: "Youssef Ahmed",
      type: "Résultat faible",
      message: "Note de physique : 45/100",
      date: "Il y a 2h",
      severity: "warning"
    },
    {
      child: "Sarah Ahmed",
      type: "Félicitations",
      message: "Excellent résultat en mathématiques : 92/100",
      date: "Hier",
      severity: "success"
    }
  ];

  const communicationHistory = [
    {
      type: "Message",
      teacher: "Prof. Martin",
      subject: "Progrès en mathématiques - Sarah",
      date: "Il y a 3 jours",
      read: true
    },
    {
      type: "Convocation",
      teacher: "Administration",
      subject: "Réunion parents d'élèves",
      date: "Il y a 1 semaine",
      read: true
    },
    {
      type: "Message",
      teacher: "Prof. Dubois",
      subject: "Difficultés en physique - Youssef",
      date: "Il y a 1 semaine",
      read: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête Parent */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
          Espace Parents
        </h1>
        <p className="text-muted-foreground">
          Suivez la scolarité et les progrès de vos enfants
        </p>
      </div>

      {/* Statistiques Famille */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {familyStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section principale */}
        <div className="lg:col-span-2 space-y-4">
          {/* Mes enfants */}
          <Card>
            <CardHeader>
              <CardTitle>Mes enfants</CardTitle>
              <CardDescription>Suivi des performances et activités</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {children.map((child, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className={`flex items-center justify-between mb-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <div>
                        <h3 className="font-semibold">{child.name}</h3>
                        <p className="text-sm text-muted-foreground">{child.class}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={child.status === 'excellent' ? 'default' : 'secondary'}>
                          {child.average}% moyenne
                        </Badge>
                        {child.alerts.length > 0 && (
                          <Badge variant="destructive" className="ml-2">
                            {child.alerts.length} alerte(s)
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Dernière activité:</p>
                        <p className="font-medium">{child.recentActivity}</p>
                        <p className="text-xs text-muted-foreground">{child.lastConnection}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Prochain test:</p>
                        <p className="font-medium text-teal-600">{child.nextTest}</p>
                      </div>
                    </div>

                    {child.alerts.length > 0 && (
                      <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded">
                        <p className="text-sm text-orange-700 font-medium">Alertes:</p>
                        {child.alerts.map((alert, alertIndex) => (
                          <p key={alertIndex} className="text-xs text-orange-600">{alert}</p>
                        ))}
                      </div>
                    )}

                    <div className={`flex gap-2 mt-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <Button size="sm" variant="outline">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Voir les notes
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Contacter prof
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Historique communications */}
          <Card>
            <CardHeader>
              <CardTitle>Communications avec l'école</CardTitle>
              <CardDescription>Messages et convocations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {communicationHistory.map((comm, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                    comm.read ? 'bg-gray-50' : 'bg-blue-50 border border-blue-200'
                  } ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center space-x-3 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-3 h-3 rounded-full ${comm.read ? 'bg-gray-400' : 'bg-blue-500'}`}></div>
                      <div>
                        <p className="font-medium text-sm">{comm.subject}</p>
                        <p className="text-xs text-muted-foreground">{comm.teacher} • {comm.type}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{comm.date}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <MessageSquare className="w-4 h-4 mr-2" />
                Voir toutes les communications
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar droite */}
        <div className="space-y-4">
          {/* Événements à venir */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Événements à venir</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  event.priority === 'high' ? 'bg-red-50 border-red-200' :
                  event.priority === 'medium' ? 'bg-orange-50 border-orange-200' :
                  'bg-gray-50 border-gray-200'
                }`}>
                  <Badge 
                    variant={event.priority === 'high' ? 'destructive' : 
                             event.priority === 'medium' ? 'secondary' : 'outline'}
                    className="text-xs mb-2"
                  >
                    {event.type}
                  </Badge>
                  <p className="font-medium text-sm">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.teacher}</p>
                  <p className={`text-xs font-medium ${
                    event.priority === 'high' ? 'text-red-600' :
                    event.priority === 'medium' ? 'text-orange-600' :
                    'text-gray-600'
                  }`}>
                    {event.date}
                  </p>
                </div>
              ))}
              <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700">
                <Calendar className="w-4 h-4 mr-2" />
                Voir le planning
              </Button>
            </CardContent>
          </Card>

          {/* Alertes récentes */}
          <Card>
            <CardHeader>
              <CardTitle className={`text-lg flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <Bell className="w-5 h-5 text-orange-600" />
                Alertes récentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentAlerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  alert.severity === 'warning' ? 'bg-orange-50 border-orange-200' :
                  alert.severity === 'success' ? 'bg-green-50 border-green-200' :
                  'bg-gray-50 border-gray-200'
                }`}>
                  <div className={`flex items-center gap-2 mb-1 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <AlertCircle className={`w-4 h-4 ${
                      alert.severity === 'warning' ? 'text-orange-500' :
                      alert.severity === 'success' ? 'text-green-500' :
                      'text-gray-500'
                    }`} />
                    <p className="text-sm font-medium">{alert.type}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{alert.child}</p>
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.date}</p>
                </div>
              ))}
              <Button size="sm" variant="outline" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                Voir toutes les alertes
              </Button>
            </CardContent>
          </Card>

          {/* Lives parents */}
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
            <CardHeader>
              <CardTitle className={`text-lg flex items-center gap-2 text-purple-700 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <Video className="w-5 h-5" />
                Lives pour parents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border border-purple-200">
                  <p className="text-sm font-medium text-purple-700">Orientation post-bac</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Mercredi 18h00 • Conseillère d'orientation
                  </p>
                  <Badge className="mt-2 bg-purple-100 text-purple-700">
                    🔴 Prochainement
                  </Badge>
                </div>
                <div className="p-3 bg-white rounded-lg border border-purple-200">
                  <p className="text-sm font-medium text-purple-700">Gestion du stress</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Vendredi 19h00 • Psychologue scolaire
                  </p>
                </div>
              </div>
              <Button size="sm" className="w-full mt-3 bg-purple-600 hover:bg-purple-700">
                <Video className="w-4 h-4 mr-2" />
                Voir tous les lives
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}