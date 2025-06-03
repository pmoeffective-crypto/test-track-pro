
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { QuickAccessCard } from "@/components/QuickAccessCard";
import { BookOpen, Brain, Calendar, TrendingUp, Target, Clock } from "lucide-react";
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
      title: t('studyTime'),
      value: "32h",
      subtitle: t('thisWeek'),
      icon: Clock,
      trend: "+8h",
      color: "purple" as const
    },
    {
      title: t('goalsAchieved'),
      value: "8/10",
      subtitle: t('thisMonth'),
      icon: TrendingUp,
      trend: "80%",
      color: "orange" as const
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
