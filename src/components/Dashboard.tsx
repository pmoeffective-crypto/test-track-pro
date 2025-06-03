import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { QuickAccessCard } from "@/components/QuickAccessCard";
import { BookOpen, Brain, Calendar, TrendingUp, Target, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Dashboard() {
  const stats = [
    {
      title: "Tests réalisés",
      value: "24",
      subtitle: "Ce mois",
      icon: BookOpen,
      trend: "+12%",
      color: "blue" as const
    },
    {
      title: "Score moyen",
      value: "76%",
      subtitle: "Toutes matières",
      icon: Target,
      trend: "+5%",
      color: "green" as const
    },
    {
      title: "Temps d'étude",
      value: "32h",
      subtitle: "Cette semaine",
      icon: Clock,
      trend: "+8h",
      color: "purple" as const
    },
    {
      title: "Objectifs atteints",
      value: "8/10",
      subtitle: "Ce mois",
      icon: TrendingUp,
      trend: "80%",
      color: "orange" as const
    }
  ];

  const quickActions = [
    {
      title: "Nouveau test QCM",
      description: "Créer un test personnalisé",
      icon: BookOpen,
      color: "blue" as const,
      action: () => console.log("Nouveau test QCM")
    },
    {
      title: "Assistant IA",
      description: "Obtenir des recommandations",
      icon: Brain,
      color: "purple" as const,
      action: () => console.log("Assistant IA")
    },
    {
      title: "Planifier révision",
      description: "Organiser votre planning",
      icon: Calendar,
      color: "green" as const,
      action: () => console.log("Planifier révision")
    }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Tableau de bord
        </h1>
        <p className="text-muted-foreground">
          Suivez vos progrès et accédez rapidement à vos outils d'étude
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Accès rapide */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Accès rapide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <QuickAccessCard key={index} {...action} />
            ))}
          </div>

          {/* Tests récents */}
          <Card>
            <CardHeader>
              <CardTitle>Tests récents</CardTitle>
              <CardDescription>Vos dernières performances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { subject: "Mathématiques", score: 85, date: "Il y a 2 jours", questions: 20 },
                  { subject: "Physique", score: 72, date: "Il y a 3 jours", questions: 15 },
                  { subject: "Chimie", score: 91, date: "Il y a 1 semaine", questions: 25 }
                ].map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{test.subject}</p>
                      <p className="text-sm text-muted-foreground">{test.questions} questions • {test.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${test.score >= 80 ? 'text-green-600' : test.score >= 60 ? 'text-orange-600' : 'text-red-600'}`}>
                        {test.score}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar droite */}
        <div className="space-y-4">
          {/* Prochains examens */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Prochains examens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { subject: "Mathématiques", date: "15 Juin", type: "Examen final" },
                { subject: "Physique", date: "18 Juin", type: "Test QCM" },
                { subject: "Chimie", date: "22 Juin", type: "Examen partiel" }
              ].map((exam, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{exam.subject}</p>
                    <p className="text-xs text-muted-foreground">{exam.type}</p>
                  </div>
                  <p className="text-xs font-medium text-blue-600">{exam.date}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommandations IA */}
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                Recommandations IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-white rounded-lg border">
                <p className="text-sm font-medium text-purple-700">Révision suggérée</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Concentrez-vous sur les équations différentielles en mathématiques
                </p>
              </div>
              <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                Voir plus de suggestions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
