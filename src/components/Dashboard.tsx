
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { QuickAccessCard } from "@/components/QuickAccessCard";
import { BookOpen, Brain, Calendar, TrendingUp, Target, Clock, MessageSquare, Video, Users, BarChart, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function Dashboard() {
  const { t, language } = useLanguage();

  const stats = [
    {
      title: t('testsCompleted'),
      value: "24",
      subtitle: t('thisMonth'),
      icon: BookOpen,
      trend: "+12%",
      color: "blue" as const
    },
    {
      title: t('averageScore'),
      value: "76%",
      subtitle: t('allSubjects'),
      icon: Target,
      trend: "+5%",
      color: "green" as const
    },
    {
      title: "Sujets forum",
      value: "18",
      subtitle: "Cette semaine",
      icon: MessageSquare,
      trend: "+4",
      color: "purple" as const
    },
    {
      title: "Lives programmés",
      value: "5",
      subtitle: "Cette semaine",
      icon: Video,
      trend: "+2",
      color: "orange" as const
    }
  ];

  // Nouvelles statistiques Forum
  const forumStats = [
    {
      title: "Discussions actives",
      value: "12",
      subtitle: "Cette semaine",
      icon: MessageSquare,
      trend: "+3",
      color: "blue" as const
    },
    {
      title: "Réponses publiées",
      value: "45",
      subtitle: "Ce mois",
      icon: TrendingUp,
      trend: "+15",
      color: "green" as const
    },
    {
      title: "Sujets suivis",
      value: "8",
      subtitle: "Vos abonnements",
      icon: Users,
      trend: "+2",
      color: "purple" as const
    }
  ];

  // Nouvelles statistiques Lives
  const livesStats = [
    {
      title: "En direct maintenant",
      value: "2",
      subtitle: "Sessions actives",
      icon: Video,
      trend: "🔴 Live",
      color: "red" as const
    },
    {
      title: "Audience moyenne",
      value: "67",
      subtitle: "Spectateurs/live",
      icon: Users,
      trend: "+12%",
      color: "blue" as const
    },
    {
      title: "Rediffusions vues",
      value: "234",
      subtitle: "Ce mois",
      icon: BarChart,
      trend: "+28%",
      color: "green" as const
    }
  ];

  const quickActions = [
    {
      title: t('newMcqTest'),
      description: t('createCustomTest'),
      icon: BookOpen,
      color: "blue" as const,
      action: () => console.log("Nouveau test QCM")
    },
    {
      title: t('aiAssistant'),
      description: t('getRecommendations'),
      icon: Brain,
      color: "purple" as const,
      action: () => console.log("Assistant IA")
    },
    {
      title: t('planRevision'),
      description: t('organizeSchedule'),
      icon: Calendar,
      color: "green" as const,
      action: () => console.log("Planifier révision")
    }
  ];

  const recentTests = [
    { subject: t('mathematics'), score: 85, date: t('daysAgo').replace('{days}', '2'), questions: 20 },
    { subject: t('physics'), score: 72, date: t('daysAgo').replace('{days}', '3'), questions: 15 },
    { subject: t('chemistry'), score: 91, date: t('weekAgo'), questions: 25 }
  ];

  const upcomingExams = [
    { subject: t('mathematics'), date: "15 Juin", type: t('finalExam') },
    { subject: t('physics'), date: "18 Juin", type: t('mcqTest') },
    { subject: t('chemistry'), date: "22 Juin", type: t('partialExam') }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
          {t('dashboardTitle')}
        </h1>
        <p className="text-muted-foreground">
          {t('dashboardSubtitle')}
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Nouvelles statistiques Forum et Lives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Statistiques Forum */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <MessageSquare className="w-5 h-5 text-purple-600" />
              Forum - Activité
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
              Lives - Performance
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
        {/* Accès rapide */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">{t('quickAccess')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <QuickAccessCard key={index} {...action} />
            ))}
          </div>

          {/* Tests récents */}
          <Card>
            <CardHeader>
              <CardTitle>{t('recentTests')}</CardTitle>
              <CardDescription>{t('recentPerformances')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTests.map((test, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div>
                      <p className="font-medium">{test.subject}</p>
                      <p className="text-sm text-muted-foreground">{test.questions} {t('questions')} • {test.date}</p>
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
              <CardTitle className="text-lg">{t('upcomingExams')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingExams.map((exam, index) => (
                <div key={index} className={`flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{exam.subject}</p>
                    <p className="text-xs text-muted-foreground">{exam.type}</p>
                  </div>
                  <p className="text-xs font-medium text-teal-600">{exam.date}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Activité Forum récente */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Forum - Activité récente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="p-2 bg-purple-50 rounded-lg border">
                  <p className="text-sm font-medium">Nouveau sujet créé</p>
                  <p className="text-xs text-muted-foreground">"Méthodes d'apprentissage efficaces"</p>
                  <p className="text-xs text-purple-600">Il y a 2h</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg border">
                  <p className="text-sm font-medium">3 nouvelles réponses</p>
                  <p className="text-xs text-muted-foreground">Dans "Préparation aux examens"</p>
                  <p className="text-xs text-blue-600">Il y a 4h</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full">
                <MessageSquare className="w-4 h-4 mr-2" />
                Voir le forum
              </Button>
            </CardContent>
          </Card>

          {/* Lives à venir */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lives à venir</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="p-2 bg-orange-50 rounded-lg border">
                  <p className="text-sm font-medium">Équations du second degré</p>
                  <p className="text-xs text-muted-foreground">Aujourd'hui à 14h00</p>
                  <p className="text-xs text-orange-600">Prof. Dubois</p>
                </div>
                <div className="p-2 bg-green-50 rounded-lg border">
                  <p className="text-sm font-medium">Chimie organique</p>
                  <p className="text-xs text-muted-foreground">Demain à 16h00</p>
                  <p className="text-xs text-green-600">Dr. Martin</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full">
                <Video className="w-4 h-4 mr-2" />
                Voir tous les lives
              </Button>
            </CardContent>
          </Card>

          {/* Recommandations IA */}
          <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50">
            <CardHeader>
              <CardTitle className={`text-lg flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <Brain className="w-5 h-5 text-teal-600" />
                {t('aiRecommendations')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-white rounded-lg border">
                <p className="text-sm font-medium text-teal-700">{t('suggestedRevision')}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t('focusOnDifferential')}
                </p>
              </div>
              <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700">
                {t('seeMoreSuggestions')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
