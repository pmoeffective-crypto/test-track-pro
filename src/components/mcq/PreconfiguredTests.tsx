
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, Clock, Users, Calendar, Play, Lock } from "lucide-react";

export function PreconfiguredTests() {
  const { t, language } = useLanguage();

  const availableTests = [
    {
      id: 1,
      title: t('algebraBasics'),
      subject: t('mathematics'),
      questions: 20,
      duration: 45,
      difficulty: t('intermediate'),
      participants: 156,
      status: "available"
    },
    {
      id: 2,
      title: t('mechanicsIntro'),
      subject: t('physics'),
      questions: 15,
      duration: 30,
      difficulty: t('beginner'),
      participants: 89,
      status: "available"
    },
    {
      id: 3,
      title: t('organicChemistry'),
      subject: t('chemistry'),
      questions: 25,
      duration: 60,
      difficulty: t('advanced'),
      participants: 67,
      status: "available"
    }
  ];

  const scheduledTests = [
    {
      id: 4,
      title: t('finalMathExam'),
      subject: t('mathematics'),
      questions: 30,
      duration: 90,
      deadline: "15 Juin 2024",
      status: "scheduled",
      canViewResults: false
    },
    {
      id: 5,
      title: t('physicsQuiz'),
      subject: t('physics'),
      questions: 20,
      duration: 60,
      deadline: "18 Juin 2024",
      status: "scheduled",
      canViewResults: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Tests disponibles */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t('availableTests')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableTests.map((test) => (
            <Card key={test.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{test.title}</CardTitle>
                    <CardDescription>{test.subject}</CardDescription>
                  </div>
                  <Badge variant="secondary">{test.difficulty}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span>{test.questions} {t('questions')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{test.duration} min</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{test.participants} {t('participants')}</span>
                  </div>
                </div>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  <Play className="w-4 h-4 mr-2" />
                  {t('startTest')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tests planifiés */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t('scheduledTests')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scheduledTests.map((test) => (
            <Card key={test.id} className="border-orange-200 bg-orange-50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-orange-600" />
                      {test.title}
                    </CardTitle>
                    <CardDescription>{test.subject}</CardDescription>
                  </div>
                  <Badge variant="outline" className="border-orange-300 text-orange-700">
                    {t('scheduled')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span>{test.questions} {t('questions')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{test.duration} min</span>
                  </div>
                </div>
                <div className="p-3 bg-white rounded border">
                  <p className="text-sm font-medium">{t('deadline')}: {test.deadline}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('resultsNotVisible')}
                  </p>
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  <Play className="w-4 h-4 mr-2" />
                  {t('startTest')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
