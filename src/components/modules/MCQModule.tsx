
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, Clock, Users, Calendar, Play, Settings, BarChart3 } from "lucide-react";
import { CreateCustomTest } from "@/components/mcq/CreateCustomTest";
import { TestHistory } from "@/components/mcq/TestHistory";
import { PreconfiguredTests } from "@/components/mcq/PreconfiguredTests";

export function MCQModule() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: t('testsCompleted'), value: "24", icon: BookOpen, color: "blue" },
    { label: t('averageScore'), value: "76%", icon: BarChart3, color: "green" },
    { label: t('timeSpent'), value: "32h", icon: Clock, color: "purple" },
    { label: t('rank'), value: "12/50", icon: Users, color: "orange" }
  ];

  const recentTests = [
    { subject: t('mathematics'), score: 85, questions: 20, duration: "45min", date: "2024-06-01" },
    { subject: t('physics'), score: 72, questions: 15, duration: "30min", date: "2024-05-29" },
    { subject: t('chemistry'), score: 91, questions: 25, duration: "60min", date: "2024-05-27" }
  ];

  const upcomingTests = [
    { subject: t('mathematics'), deadline: "15 Juin 2024", questions: 30, duration: "90min" },
    { subject: t('physics'), deadline: "18 Juin 2024", questions: 20, duration: "60min" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
          {t('mcqTests')}
        </h1>
        <p className="text-muted-foreground">
          {t('mcqDescription')}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: "overview", label: t('overview') },
          { id: "create", label: t('createTest') },
          { id: "preconfigured", label: t('preconfiguredTests') },
          { id: "history", label: t('history') }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            className={`flex-1 ${activeTab === tab.id ? 'bg-white shadow-sm' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tests récents */}
            <Card>
              <CardHeader>
                <CardTitle>{t('recentTests')}</CardTitle>
                <CardDescription>{t('recentTestsDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTests.map((test, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div>
                      <p className="font-medium">{test.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        {test.questions} {t('questions')} • {test.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={test.score >= 80 ? "default" : test.score >= 60 ? "secondary" : "destructive"}>
                        {test.score}%
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  {t('viewAll')}
                </Button>
              </CardContent>
            </Card>

            {/* Tests planifiés */}
            <Card>
              <CardHeader>
                <CardTitle>{t('upcomingTests')}</CardTitle>
                <CardDescription>{t('upcomingTestsDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingTests.map((test, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 border rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div>
                      <p className="font-medium">{test.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {test.deadline}
                      </p>
                    </div>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                      <Play className="w-4 h-4 mr-1" />
                      {t('startTest')}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Actions rapides */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow border-teal-200" onClick={() => setActiveTab("create")}>
              <CardContent className="p-6 text-center">
                <Settings className="w-12 h-12 mx-auto mb-4 text-teal-600" />
                <h3 className="font-semibold mb-2">{t('createCustomTest')}</h3>
                <p className="text-sm text-muted-foreground">{t('customizeYourTest')}</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow border-blue-200" onClick={() => setActiveTab("preconfigured")}>
              <CardContent className="p-6 text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold mb-2">{t('preconfiguredTests')}</h3>
                <p className="text-sm text-muted-foreground">{t('readyToUseTests')}</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow border-purple-200" onClick={() => setActiveTab("history")}>
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="font-semibold mb-2">{t('viewHistory')}</h3>
                <p className="text-sm text-muted-foreground">{t('analyzePerformance')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "create" && <CreateCustomTest />}
      {activeTab === "preconfigured" && <PreconfiguredTests />}
      {activeTab === "history" && <TestHistory />}
    </div>
  );
}
