
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, ChevronLeft, ChevronRight, List, Flag, CheckCircle } from "lucide-react";
import { TestResults } from "./TestResults";
import { QuestionNavigation } from "./QuestionNavigation";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  difficulty: string;
}

interface TestConfig {
  subject: string;
  questionCount: number;
  duration: number;
  hasTimeLimit: boolean;
  testType: "custom" | "preconfigured";
  title?: string;
}

interface TestInterfaceProps {
  config: TestConfig;
  onExit: () => void;
}

export function TestInterface({ config, onExit }: TestInterfaceProps) {
  const { t, language } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(config.hasTimeLimit ? config.duration * 60 : null);
  const [isFinished, setIsFinished] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());

  // Questions simulées basées sur la matière
  const [questions] = useState<Question[]>(() => {
    const sampleQuestions: Record<string, Question[]> = {
      mathematics: [
        {
          id: 1,
          question: "Quelle est la dérivée de x² ?",
          options: ["2x", "x", "2", "x²"],
          correctAnswer: 0,
          subject: "mathematics",
          difficulty: "easy"
        },
        {
          id: 2,
          question: "Résolvez l'équation 2x + 5 = 11",
          options: ["x = 2", "x = 3", "x = 4", "x = 5"],
          correctAnswer: 1,
          subject: "mathematics",
          difficulty: "easy"
        },
        {
          id: 3,
          question: "Quelle est la valeur de π (pi) ?",
          options: ["3.14159", "3.141", "22/7", "Toutes les réponses"],
          correctAnswer: 0,
          subject: "mathematics",
          difficulty: "medium"
        }
      ],
      physics: [
        {
          id: 1,
          question: "Quelle est l'unité de la force ?",
          options: ["Newton", "Joule", "Watt", "Pascal"],
          correctAnswer: 0,
          subject: "physics",
          difficulty: "easy"
        },
        {
          id: 2,
          question: "La vitesse de la lumière dans le vide est ?",
          options: ["300 000 km/s", "150 000 km/s", "450 000 km/s", "200 000 km/s"],
          correctAnswer: 0,
          subject: "physics",
          difficulty: "medium"
        }
      ],
      chemistry: [
        {
          id: 1,
          question: "Quel est le symbole chimique de l'or ?",
          options: ["Go", "Au", "Ag", "Or"],
          correctAnswer: 1,
          subject: "chemistry",
          difficulty: "easy"
        }
      ]
    };

    const subjectQuestions = sampleQuestions[config.subject] || sampleQuestions.mathematics;
    return subjectQuestions.slice(0, config.questionCount);
  });

  // Timer
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev && prev <= 1) {
          setIsFinished(true);
          return 0;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isFinished]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionIndex
    }));
  };

  const toggleFlag = () => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestion)) {
        newSet.delete(currentQuestion);
      } else {
        newSet.add(currentQuestion);
      }
      return newSet;
    });
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
    setShowNavigation(false);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const finishTest = () => {
    setIsFinished(true);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      score: Math.round((correct / questions.length) * 100),
      correct,
      total: questions.length,
      answers,
      questions
    };
  };

  if (isFinished) {
    return <TestResults results={calculateScore()} onRestart={onExit} />;
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* En-tête du test */}
      <Card>
        <CardHeader>
          <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div>
              <CardTitle className="text-lg">
                {config.title || `${t('test')} ${t(config.subject)}`}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {t('question')} {currentQuestion + 1} {t('of')} {questions.length}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {timeLeft !== null && (
                <div className={`flex items-center space-x-2 ${timeLeft < 300 ? 'text-red-600' : 'text-muted-foreground'}`}>
                  <Clock className="w-4 h-4" />
                  <span className="font-mono">{formatTime(timeLeft)}</span>
                </div>
              )}
              <Badge variant="outline">
                {Math.round(progress)}% {t('completed')}
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Zone principale de la question */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <h3 className="text-lg font-semibold">
                  {t('question')} {currentQuestion + 1}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleFlag}
                  className={flaggedQuestions.has(currentQuestion) ? 'text-orange-600' : ''}
                >
                  <Flag className="w-4 h-4" />
                  {flaggedQuestions.has(currentQuestion) ? t('flagged') : t('flag')}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-lg font-medium">
                {currentQ.question}
              </div>

              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      answers[currentQuestion] === index
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <div className={`flex items-center space-x-3 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        answers[currentQuestion] === index
                          ? 'border-teal-500 bg-teal-500'
                          : 'border-gray-300'
                      }`}>
                        {answers[currentQuestion] === index && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="flex-1">{option}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panneau de navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">{t('navigation')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowNavigation(!showNavigation)}
              >
                <List className="w-4 h-4 mr-2" />
                {t('allQuestions')}
              </Button>

              {showNavigation && (
                <QuestionNavigation
                  questions={questions}
                  currentQuestion={currentQuestion}
                  answers={answers}
                  flaggedQuestions={flaggedQuestions}
                  onGoToQuestion={goToQuestion}
                />
              )}

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {t('answered')}: {Object.keys(answers).length}/{questions.length}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('flagged')}: {flaggedQuestions.size}
                </p>
              </div>

              <Button
                onClick={finishTest}
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={Object.keys(answers).length === 0}
              >
                {t('finishTest')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation en bas */}
      <Card>
        <CardContent className="p-4">
          <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <Button
              variant="outline"
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {t('previous')}
            </Button>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={onExit}>
                {t('exitTest')}
              </Button>
              {currentQuestion === questions.length - 1 ? (
                <Button
                  onClick={finishTest}
                  className="bg-teal-600 hover:bg-teal-700"
                  disabled={Object.keys(answers).length === 0}
                >
                  {t('finishTest')}
                </Button>
              ) : (
                <Button
                  onClick={nextQuestion}
                  disabled={currentQuestion === questions.length - 1}
                >
                  {t('next')}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
