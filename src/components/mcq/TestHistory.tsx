
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { BarChart3, Eye, Download, Calendar } from "lucide-react";

export function TestHistory() {
  const { t, language } = useLanguage();

  const testHistory = [
    {
      id: 1,
      title: t('algebraBasics'),
      subject: t('mathematics'),
      score: 85,
      totalQuestions: 20,
      correctAnswers: 17,
      duration: "42 min",
      date: "2024-06-01",
      feedback: t('goodJob'),
      canViewDetails: true
    },
    {
      id: 2,
      title: t('mechanicsIntro'),
      subject: t('physics'),
      score: 72,
      totalQuestions: 15,
      correctAnswers: 11,
      duration: "35 min",
      date: "2024-05-29",
      feedback: t('needsImprovement'),
      canViewDetails: true
    },
    {
      id: 3,
      title: t('organicChemistry'),
      subject: t('chemistry'),
      score: 91,
      totalQuestions: 25,
      correctAnswers: 23,
      duration: "58 min",
      date: "2024-05-27",
      feedback: t('excellent'),
      canViewDetails: true
    },
    {
      id: 4,
      title: t('finalMathExam'),
      subject: t('mathematics'),
      score: null,
      totalQuestions: 30,
      correctAnswers: null,
      duration: "90 min",
      date: "2024-05-25",
      feedback: null,
      canViewDetails: false
    }
  ];

  const getScoreBadge = (score: number | null) => {
    if (score === null) return <Badge variant="outline">{t('pending')}</Badge>;
    if (score >= 80) return <Badge className="bg-green-100 text-green-800">{score}%</Badge>;
    if (score >= 60) return <Badge className="bg-orange-100 text-orange-800">{score}%</Badge>;
    return <Badge className="bg-red-100 text-red-800">{score}%</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t('testHistory')}</h2>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          {t('exportResults')}
        </Button>
      </div>

      <div className="space-y-4">
        {testHistory.map((test) => (
          <Card key={test.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{test.title}</h3>
                    {getScoreBadge(test.score)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{test.subject}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">{t('questions')}: </span>
                      <span className="font-medium">{test.correctAnswers || '?'}/{test.totalQuestions}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t('duration')}: </span>
                      <span className="font-medium">{test.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{test.date}</span>
                    </div>
                    {test.feedback && (
                      <div>
                        <span className="text-muted-foreground">{t('feedback')}: </span>
                        <span className="font-medium">{test.feedback}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {test.canViewDetails ? (
                    <>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        {t('viewDetails')}
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        {t('statistics')}
                      </Button>
                    </>
                  ) : (
                    <Badge variant="secondary">{t('resultsNotAvailable')}</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
