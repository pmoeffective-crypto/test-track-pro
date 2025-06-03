
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { Brain, Target, TrendingUp, AlertCircle, CheckCircle, Clock, Book } from "lucide-react";

export function AssistantModule() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("roadmap");

  const currentRoadmap = {
    name: t('preparationBac'),
    progress: 65,
    totalTasks: 20,
    completedTasks: 13,
    remainingDays: 45,
    weeklyGoal: 8,
    weeklyProgress: 6
  };

  const recommendations = [
    {
      id: 1,
      type: 'weak_subject',
      priority: 'high',
      title: t('improveAlgebra'),
      description: t('algebraWeakness'),
      action: t('readAlgebraPDF'),
      icon: Book,
      color: 'red'
    },
    {
      id: 2,
      type: 'practice',
      priority: 'medium',
      title: t('practicePhysics'),
      description: t('physicsImprovement'),
      action: t('takePhysicsTest'),
      icon: Target,
      color: 'orange'
    },
    {
      id: 3,
      type: 'schedule',
      priority: 'low',
      title: t('reviewSchedule'),
      description: t('reviewReminder'),
      action: t('viewSchedule'),
      icon: Clock,
      color: 'blue'
    }
  ];

  const roadmapTasks = [
    { id: 1, title: t('reviewAlgebra'), status: 'completed', dueDate: '2024-06-01', subject: t('mathematics') },
    { id: 2, title: t('physicsPractice'), status: 'completed', dueDate: '2024-06-03', subject: t('physics') },
    { id: 3, title: t('chemistryTest'), status: 'in_progress', dueDate: '2024-06-08', subject: t('chemistry') },
    { id: 4, title: t('mathsExercises'), status: 'pending', dueDate: '2024-06-10', subject: t('mathematics') },
    { id: 5, title: t('physicsRevision'), status: 'pending', dueDate: '2024-06-12', subject: t('physics') }
  ];

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress': return <Clock className="w-5 h-5 text-orange-600" />;
      case 'pending': return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'completed': return t('completed');
      case 'in_progress': return t('inProgress');
      case 'pending': return t('pending');
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-orange-200 bg-orange-50';
      case 'low': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
          {t('aiAssistant')}
        </h1>
        <p className="text-muted-foreground">
          {t('assistantDescription')}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: "roadmap", label: t('myRoadmap') },
          { id: "recommendations", label: t('recommendations') },
          { id: "analytics", label: t('analytics') }
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

      {activeTab === "roadmap" && (
        <div className="space-y-6">
          {/* Vue d'ensemble de la roadmap */}
          <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-teal-600" />
                {currentRoadmap.name}
              </CardTitle>
              <CardDescription>
                {t('roadmapProgress')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t('progress')}</span>
                  <span>{currentRoadmap.progress}%</span>
                </div>
                <Progress value={currentRoadmap.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-white rounded-lg border">
                  <p className="text-2xl font-bold text-teal-600">{currentRoadmap.completedTasks}</p>
                  <p className="text-xs text-muted-foreground">{t('completedTasks')}</p>
                </div>
                <div className="p-3 bg-white rounded-lg border">
                  <p className="text-2xl font-bold text-orange-600">{currentRoadmap.totalTasks - currentRoadmap.completedTasks}</p>
                  <p className="text-xs text-muted-foreground">{t('remainingTasks')}</p>
                </div>
                <div className="p-3 bg-white rounded-lg border">
                  <p className="text-2xl font-bold text-blue-600">{currentRoadmap.remainingDays}</p>
                  <p className="text-xs text-muted-foreground">{t('daysLeft')}</p>
                </div>
                <div className="p-3 bg-white rounded-lg border">
                  <p className="text-2xl font-bold text-purple-600">{currentRoadmap.weeklyProgress}/{currentRoadmap.weeklyGoal}</p>
                  <p className="text-xs text-muted-foreground">{t('weeklyGoal')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liste des tâches */}
          <Card>
            <CardHeader>
              <CardTitle>{t('upcomingTasks')}</CardTitle>
              <CardDescription>{t('upcomingTasksDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {roadmapTasks.map((task) => (
                  <div key={task.id} className={`flex items-center justify-between p-3 rounded-lg border ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(task.status)}
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">{task.subject} • {task.dueDate}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{getStatusLabel(task.status)}</Badge>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                {t('viewFullRoadmap')}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "recommendations" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-teal-600" />
                {t('personalizedRecommendations')}
              </CardTitle>
              <CardDescription>
                {t('recommendationsDescription')}
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="space-y-4">
            {recommendations.map((rec) => (
              <Card key={rec.id} className={getPriorityColor(rec.priority)}>
                <CardContent className="p-6">
                  <div className={`flex items-start justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg bg-white border`}>
                        <rec.icon className={`w-6 h-6 text-${rec.color}-600`} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{rec.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                          {rec.action}
                        </Button>
                      </div>
                    </div>
                    <Badge variant={rec.priority === 'high' ? 'destructive' : rec.priority === 'medium' ? 'default' : 'secondary'}>
                      {t(rec.priority)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('performanceAnalytics')}</CardTitle>
              <CardDescription>{t('analyticsDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">{t('strengths')}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">{t('chemistry')}</span>
                      <Badge className="bg-green-100 text-green-800">87%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">{t('physics')}</span>
                      <Badge className="bg-green-100 text-green-800">82%</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">{t('areasForImprovement')}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                      <span className="text-sm">{t('algebra')}</span>
                      <Badge className="bg-orange-100 text-orange-800">65%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                      <span className="text-sm">{t('geometry')}</span>
                      <Badge className="bg-red-100 text-red-800">58%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
