
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileText, Clock, Calendar, Users, Play, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export function ExamsModule() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("available");
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({});

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const availableExams = [
    {
      id: 1,
      title: t('midtermMathExam'),
      subject: t('mathematics'),
      duration: 120,
      sections: [
        {
          id: 'section1',
          title: t('algebra'),
          description: t('algebraDescription'),
          questions: 5,
          type: 'mcq'
        },
        {
          id: 'section2',
          title: t('geometry'),
          description: t('geometryDescription'),
          questions: 4,
          type: 'mixed'
        },
        {
          id: 'section3',
          title: t('analysis'),
          description: t('analysisDescription'),
          questions: 6,
          type: 'free'
        }
      ],
      deadline: null,
      participants: 45
    },
    {
      id: 2,
      title: t('physicsExam'),
      subject: t('physics'),
      duration: 90,
      sections: [
        {
          id: 'section1',
          title: t('mechanics'),
          description: t('mechanicsDescription'),
          questions: 4,
          type: 'mcq'
        },
        {
          id: 'section2',
          title: t('thermodynamics'),
          description: t('thermodynamicsDescription'),
          questions: 3,
          type: 'mixed'
        },
        {
          id: 'section3',
          title: t('waves'),
          description: t('wavesDescription'),
          questions: 5,
          type: 'free'
        }
      ],
      deadline: "20 Juin 2024",
      participants: 38
    }
  ];

  const completedExams = [
    {
      id: 3,
      title: t('chemistryExam'),
      subject: t('chemistry'),
      score: 87,
      totalQuestions: 15,
      date: "2024-05-15",
      duration: "118 min",
      sections: [
        { title: t('organicChemistry'), score: 90 },
        { title: t('inorganicChemistry'), score: 85 },
        { title: t('physicalChemistry'), score: 86 }
      ]
    }
  ];

  const getQuestionTypeLabel = (type: string) => {
    switch(type) {
      case 'mcq': return t('mcqQuestions');
      case 'free': return t('freeQuestions');
      case 'mixed': return t('mixedQuestions');
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
          {t('exams')}
        </h1>
        <p className="text-muted-foreground">
          {t('examsDescription')}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: "available", label: t('availableExams') },
          { id: "completed", label: t('completedExams') },
          { id: "scheduled", label: t('scheduledExams') }
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

      {activeTab === "available" && (
        <div className="space-y-6">
          {availableExams.map((exam) => (
            <Card key={exam.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{exam.title}</CardTitle>
                    <CardDescription>{exam.subject}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {exam.deadline && (
                      <Badge variant="outline" className="border-orange-300 text-orange-700">
                        <Calendar className="w-4 h-4 mr-1" />
                        {exam.deadline}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mt-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{exam.duration} {t('minutes')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span>{exam.sections.length} {t('sections')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{exam.participants} {t('participants')}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">{t('examSections')}:</h4>
                  {exam.sections.map((section, index) => (
                    <Collapsible key={section.id} open={openSections[`${exam.id}-${section.id}`]} onOpenChange={() => toggleSection(`${exam.id}-${section.id}`)}>
                      <CollapsibleTrigger asChild>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                          <div>
                            <p className="font-medium">{t('section')} {index + 1}: {section.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {section.questions} {t('questions')} • {getQuestionTypeLabel(section.type)}
                            </p>
                          </div>
                          {openSections[`${exam.id}-${section.id}`] ? 
                            <ChevronUp className="w-5 h-5" /> : 
                            <ChevronDown className="w-5 h-5" />
                          }
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2 p-3 bg-white border rounded-lg">
                        <p className="text-sm text-muted-foreground">{section.description}</p>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>

                <Button className="w-full bg-teal-600 hover:bg-teal-700" size="lg">
                  <Play className="w-5 h-5 mr-2" />
                  {t('startExam')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "completed" && (
        <div className="space-y-4">
          {completedExams.map((exam) => (
            <Card key={exam.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{exam.title}</CardTitle>
                    <CardDescription>{exam.subject} • {exam.date}</CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {exam.score}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">{t('totalQuestions')}: </span>
                    <span className="font-medium">{exam.totalQuestions}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">{t('duration')}: </span>
                    <span className="font-medium">{exam.duration}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">{t('date')}: </span>
                    <span className="font-medium">{exam.date}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t('sectionResults')}:</h4>
                  {exam.sections.map((section, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{section.title}</span>
                      <Badge variant="outline">{section.score}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "scheduled" && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">{t('noScheduledExams')}</h3>
          <p className="text-muted-foreground">{t('noScheduledExamsDescription')}</p>
        </div>
      )}
    </div>
  );
}
