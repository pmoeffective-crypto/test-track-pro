import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { BookOpen, Target, Clock, Trophy, Video, MessageSquare, Calendar, TrendingUp, Play, Eye, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function StudentDashboard() {
  const { t, language } = useLanguage();

  const studentStats = [
    {
      title: t('testsCompleted'),
      value: "24",
      subtitle: t('thisMonth'),
      icon: BookOpen,
      trend: "+3",
      color: "blue" as const
    },
    {
      title: t('averageScore'),
      value: "78%",
      subtitle: t('allSubjects'),
      icon: Target,
      trend: "+5%",
      color: "green" as const
    },
    {
      title: "Temps d'étude",
      value: "32h",
      subtitle: "Cette semaine",
      icon: Clock,
      trend: "+4h",
      color: "purple" as const
    },
    {
      title: "Lives suivis",
      value: "8",
      subtitle: "Ce mois",
      icon: Video,
      trend: "+2",
      color: "orange" as const
    }
  ];

  const upcomingTests = [
    { subject: t('mathematics'), date: "Lundi 14h00", type: "Test QCM", difficulty: "Intermédiaire" },
    { subject: t('physics'), date: "Mercredi 10h00", type: "Examen", difficulty: "Avancé" },
    { subject: t('chemistry'), date: "Vendredi 15h00", type: "Test QCM", difficulty: "Débutant" }
  ];

  const recentResults = [
    { subject: t('mathematics'), score: 85, date: "Il y a 2 jours", questions: 20, badge: "Excellent" },
    { subject: t('physics'), score: 72, date: "Il y a 4 jours", questions: 15, badge: "Bon" },
    { subject: t('chemistry'), score: 91, date: "Il y a 1 semaine", questions: 25, badge: "Excellent" }
  ];

  const upcomingLives = [
    { 
      title: "Révision Bac - Mathématiques", 
      teacher: "Prof. Martin",
      time: "Aujourd'hui 16h00", 
      duration: "2h",
      status: "today"
    },
    { 
      title: "Physique quantique", 
      teacher: "Dr. Dupont",
      time: "Demain 14h00", 
      duration: "1h30",
      status: "upcoming"
    },
    { 
      title: "Chimie organique avancée", 
      teacher: "Prof. Bernard",
      time: "Mercredi 15h00", 
      duration: "1h",
      status: "upcoming"
    }
  ];

  const forumActivity = [
    { 
      title: "Aide sur les intégrales", 
      responses: 5, 
      lastUpdate: "Il y a 2h",
      isActive: true,
      hasNewReply: true
    },
    { 
      title: "Préparation contrôle physique", 
      responses: 8, 
      lastUpdate: "Il y a 1 jour",
      isActive: true,
      hasNewReply: false
    }
  ];

  const achievements = [
    { title: "Expert en Mathématiques", description: "10 tests consécutifs > 80%", earned: true },
    { title: "Assidu", description: "Connexion quotidienne 30 jours", earned: true },
    { title: "Curieux", description: "Participation à 20 lives", earned: false, progress: 75 }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête Étudiant */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
          Mon Espace Étudiant
        </h1>
        <p className="text-muted-foreground">
          Suivez vos progrès et continuez votre apprentissage
        </p>
      </div>

      {/* Statistiques Étudiant */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {studentStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section principale */}
        <div className="lg:col-span-2 space-y-4">
          {/* Prochains tests */}
          <Card>
            <CardHeader>
              <CardTitle>Mes prochains tests</CardTitle>
              <CardDescription>Tests et examens planifiés</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTests.map((test, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div>
                      <p className="font-medium">{test.subject}</p>
                      <p className="text-sm text-muted-foreground">{test.type} • {test.difficulty}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-teal-600">{test.date}</p>
                      <Button size="sm" variant="outline" className="mt-1">
                        Réviser
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700">
                <BookOpen className="w-4 h-4 mr-2" />
                Voir tous mes tests
              </Button>
            </CardContent>
          </Card>

          {/* Résultats récents */}
          <Card>
            <CardHeader>
              <CardTitle>Mes derniers résultats</CardTitle>
              <CardDescription>Performances récentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentResults.map((result, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div>
                      <p className="font-medium">{result.subject}</p>
                      <p className="text-sm text-muted-foreground">{result.questions} questions • {result.date}</p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-1 ${
                        result.score >= 80 ? 'bg-green-100 text-green-700' : 
                        result.score >= 60 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {result.badge}
                      </div>
                      <p className={`font-bold ${result.score >= 80 ? 'text-green-600' : result.score >= 60 ? 'text-orange-600' : 'text-red-600'}`}>
                        {result.score}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <TrendingUp className="w-4 h-4 mr-2" />
                Voir toutes mes performances
              </Button>
            </CardContent>
          </Card>

          {/* Mes discussions forum */}
          <Card>
            <CardHeader>
              <CardTitle>Mes discussions forum</CardTitle>
              <CardDescription>Sujets que je suis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {forumActivity.map((topic, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center space-x-3 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-3 h-3 rounded-full ${topic.hasNewReply ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                      <div>
                        <p className="font-medium text-sm">{topic.title}</p>
                        <p className="text-xs text-muted-foreground">{topic.responses} réponses</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{topic.lastUpdate}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <MessageSquare className="w-4 h-4 mr-2" />
                Aller au forum
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar droite */}
        <div className="space-y-4">
          {/* Lives à venir */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lives à venir</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingLives.map((live, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  live.status === 'today' ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'
                }`}>
                  <p className="font-medium text-sm">{live.title}</p>
                  <p className="text-xs text-muted-foreground">{live.teacher}</p>
                  <p className={`text-xs font-medium ${live.status === 'today' ? 'text-purple-600' : 'text-gray-600'}`}>
                    {live.time} • {live.duration}
                  </p>
                  <Button size="sm" variant="outline" className="w-full mt-2">
                    {live.status === 'today' ? (
                      <>
                        <Play className="w-3 h-3 mr-1" />
                        Rejoindre
                      </>
                    ) : (
                      <>
                        <Calendar className="w-3 h-3 mr-1" />
                        Programmer
                      </>
                    )}
                  </Button>
                </div>
              ))}
              <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                <Video className="w-4 h-4 mr-2" />
                Voir tous les lives
              </Button>
            </CardContent>
          </Card>

          {/* Mes badges et réussites */}
          <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50">
            <CardHeader>
              <CardTitle className={`text-lg flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <Trophy className="w-5 h-5 text-teal-600" />
                Mes réussites
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className={`p-3 bg-white rounded-lg border ${achievement.earned ? 'border-green-200' : 'border-gray-200'}`}>
                  <div className={`flex items-center gap-2 mb-1 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <Trophy className={`w-4 h-4 ${achievement.earned ? 'text-yellow-500' : 'text-gray-400'}`} />
                    <p className="text-sm font-medium">{achievement.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  {!achievement.earned && achievement.progress && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-teal-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{achievement.progress}%</p>
                    </div>
                  )}
                </div>
              ))}
              <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700">
                <Eye className="w-4 h-4 mr-2" />
                Voir tous les badges
              </Button>
            </CardContent>
          </Card>

          {/* Recommandation IA */}
          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
            <CardHeader>
              <CardTitle className={`text-lg flex items-center gap-2 text-orange-700 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <Brain className="w-5 h-5" />
                Conseil IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-3 bg-white rounded-lg border border-orange-200">
                <p className="text-sm font-medium text-orange-700">Révision suggérée</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Concentrez-vous sur les fonctions exponentielles. Vos derniers résultats montrent des difficultés dans ce domaine.
                </p>
              </div>
              <Button size="sm" className="w-full mt-3 bg-orange-600 hover:bg-orange-700">
                Commencer la révision
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}