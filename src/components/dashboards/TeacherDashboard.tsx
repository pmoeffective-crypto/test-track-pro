import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { BookOpen, Users, Video, MessageSquare, BarChart3, Calendar, Clock, TrendingUp, PlusCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function TeacherDashboard() {
  const { t, language } = useLanguage();

  const teacherStats = [
    {
      title: "Mes étudiants",
      value: "127",
      subtitle: "Inscrits à mes cours",
      icon: Users,
      trend: "+8",
      color: "blue" as const
    },
    {
      title: "Cours créés",
      value: "12",
      subtitle: "Ce semestre",
      icon: BookOpen,
      trend: "+2",
      color: "green" as const
    },
    {
      title: "Lives planifiés",
      value: "5",
      subtitle: "Cette semaine",
      icon: Video,
      trend: "+1",
      color: "purple" as const
    },
    {
      title: "Sujets forum",
      value: "23",
      subtitle: "Mes discussions",
      icon: MessageSquare,
      trend: "+6",
      color: "orange" as const
    }
  ];

  const myStudents = [
    { name: "Sarah Ahmed", class: "Terminale S", lastActivity: "Il y a 2h", performance: 85, status: "active" },
    { name: "Mohamed Ali", class: "Terminale S", lastActivity: "Il y a 4h", performance: 72, status: "active" },
    { name: "Fatima Zahra", class: "1ère S", lastActivity: "Il y a 1 jour", performance: 91, status: "warning" },
    { name: "Youssef Benali", class: "Terminale S", lastActivity: "Il y a 6h", performance: 68, status: "active" }
  ];

  const upcomingLives = [
    { 
      title: "Équations du second degré", 
      time: "Aujourd'hui 14h00", 
      class: "Terminale S", 
      registered: 45,
      status: "today"
    },
    { 
      title: "Fonctions logarithmiques", 
      time: "Demain 16h00", 
      class: "Terminale S", 
      registered: 38,
      status: "upcoming"
    },
    { 
      title: "Géométrie dans l'espace", 
      time: "Mercredi 15h00", 
      class: "1ère S", 
      registered: 52,
      status: "upcoming"
    }
  ];

  const recentForumActivity = [
    { 
      topic: "Difficultés en dérivées", 
      responses: 8, 
      lastActivity: "Il y a 30 min",
      class: "Terminale S",
      isActive: true
    },
    { 
      topic: "Exercices sur les limites", 
      responses: 12, 
      lastActivity: "Il y a 2h",
      class: "Terminale S",
      isActive: true
    },
    { 
      topic: "Préparation contrôle", 
      responses: 5, 
      lastActivity: "Il y a 4h",
      class: "1ère S",
      isActive: false
    }
  ];

  const quickActions = [
    { title: "Créer un live", icon: Video, color: "purple", action: () => console.log("Créer live") },
    { title: "Nouveau cours", icon: BookOpen, color: "green", action: () => console.log("Nouveau cours") },
    { title: "Sujet forum", icon: MessageSquare, color: "orange", action: () => console.log("Sujet forum") },
    { title: "Créer test", icon: PlusCircle, color: "blue", action: () => console.log("Créer test") }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête Professeur */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
          Espace Professeur
        </h1>
        <p className="text-muted-foreground">
          Gérez vos cours, étudiants et contenus pédagogiques
        </p>
      </div>

      {/* Statistiques Professeur */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {teacherStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Actions rapides */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className="h-20 flex-col"
                onClick={action.action}
              >
                <action.icon className="w-6 h-6 mb-2" />
                <span className="text-xs">{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mes étudiants */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mes étudiants</CardTitle>
              <CardDescription>Suivi de l'activité et des performances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myStudents.map((student, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center space-x-3 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-3 h-3 rounded-full ${
                        student.status === 'active' ? 'bg-green-500' : 'bg-orange-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-sm">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.class}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${student.performance >= 80 ? 'text-green-600' : student.performance >= 60 ? 'text-orange-600' : 'text-red-600'}`}>
                        {student.performance}%
                      </p>
                      <p className="text-xs text-muted-foreground">{student.lastActivity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Users className="w-4 h-4 mr-2" />
                Voir tous mes étudiants
              </Button>
            </CardContent>
          </Card>

          {/* Activité forum */}
          <Card>
            <CardHeader>
              <CardTitle>Mes discussions forum</CardTitle>
              <CardDescription>Activité récente dans mes sujets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentForumActivity.map((topic, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center space-x-3 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-3 h-3 rounded-full ${topic.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <div>
                        <p className="font-medium text-sm">{topic.topic}</p>
                        <p className="text-xs text-muted-foreground">{topic.class} • {topic.responses} réponses</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{topic.lastActivity}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <MessageSquare className="w-4 h-4 mr-2" />
                Gérer mes forums
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar droite */}
        <div className="space-y-4">
          {/* Lives à venir */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mes lives à venir</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingLives.map((live, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  live.status === 'today' ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'
                }`}>
                  <p className="font-medium text-sm">{live.title}</p>
                  <p className="text-xs text-muted-foreground">{live.class}</p>
                  <p className={`text-xs font-medium ${live.status === 'today' ? 'text-purple-600' : 'text-gray-600'}`}>
                    {live.time}
                  </p>
                  <p className="text-xs text-muted-foreground">{live.registered} inscrits</p>
                </div>
              ))}
              <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                <Video className="w-4 h-4 mr-2" />
                Planifier un live
              </Button>
            </CardContent>
          </Card>

          {/* Performance des cours */}
          <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50">
            <CardHeader>
              <CardTitle className={`text-lg flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <BarChart3 className="w-5 h-5 text-teal-600" />
                Performance cours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-white rounded-lg border">
                <p className="text-sm font-medium text-teal-700">Cours le plus suivi</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Mathématiques - Terminale S (89 étudiants)
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg border">
                <p className="text-sm font-medium text-teal-700">Meilleur taux de réussite</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Algèbre - 1ère S (92% de réussite)
                </p>
              </div>
              <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700">
                <Eye className="w-4 h-4 mr-2" />
                Voir les statistiques
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}