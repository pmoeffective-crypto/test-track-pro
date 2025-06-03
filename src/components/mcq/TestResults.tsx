
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, XCircle, Award, RotateCcw, Home, TrendingUp } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  difficulty: string;
}

interface TestResultsProps {
  results: {
    score: number;
    correct: number;
    total: number;
    answers: Record<number, number>;
    questions: Question[];
  };
  onRestart: () => void;
}

export function TestResults({ results, onRestart }: TestResultsProps) {
  const { t, language } = useLanguage();

  const getScoreMessage = () => {
    if (results.score >= 90) return t('excellentWork');
    if (results.score >= 80) return t('veryGood');
    if (results.score >= 70) return t('goodWork');
    if (results.score >= 60) return t('canDoBetter');
    return t('needsImprovement');
  };

  const getScoreColor = () => {
    if (results.score >= 80) return 'text-green-600';
    if (results.score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBadgeVariant = () => {
    if (results.score >= 80) return 'default';
    if (results.score >= 60) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Résultats globaux */}
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Award className={`w-16 h-16 ${getScoreColor()}`} />
          </div>
          <CardTitle className="text-2xl">{t('testCompleted')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className={`text-6xl font-bold ${getScoreColor()}`}>
              {results.score}%
            </div>
            <p className="text-xl text-muted-foreground">
              {getScoreMessage()}
            </p>
            <Badge variant={getBadgeVariant()} className="text-lg px-4 py-2">
              {results.correct}/{results.total} {t('correctAnswers')}
            </Badge>
          </div>

          <div className="max-w-md mx-auto">
            <Progress value={results.score} className="h-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-semibold text-green-800">{results.correct}</p>
              <p className="text-sm text-green-600">{t('correct')}</p>
            </div>
            
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="font-semibold text-red-800">{results.total - results.correct}</p>
              <p className="text-sm text-red-600">{t('incorrect')}</p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold text-blue-800">{results.score}%</p>
              <p className="text-sm text-blue-600">{t('score')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Détail des réponses */}
      <Card>
        <CardHeader>
          <CardTitle>{t('detailedAnswers')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {results.questions.map((question, index) => {
            const userAnswer = results.answers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            const answered = userAnswer !== undefined;

            return (
              <div
                key={question.id}
                className={`p-4 rounded-lg border-2 ${
                  !answered 
                    ? 'border-gray-300 bg-gray-50'
                    : isCorrect 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className={`flex items-start space-x-3 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className="flex-shrink-0">
                    {!answered ? (
                      <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center">
                        <span className="text-white text-xs">?</span>
                      </div>
                    ) : isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <p className="font-semibold">
                      {t('question')} {index + 1}: {question.question}
                    </p>
                    
                    <div className="space-y-1">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-2 rounded text-sm ${
                            optionIndex === question.correctAnswer
                              ? 'bg-green-100 border border-green-300'
                              : optionIndex === userAnswer && !isCorrect
                              ? 'bg-red-100 border border-red-300'
                              : 'bg-white border'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            {optionIndex === question.correctAnswer && (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            )}
                            {optionIndex === userAnswer && !isCorrect && (
                              <XCircle className="w-4 h-4 text-red-600" />
                            )}
                            <span>{option}</span>
                            {optionIndex === question.correctAnswer && (
                              <Badge variant="secondary" className="ml-auto">
                                {t('correctAnswer')}
                              </Badge>
                            )}
                            {optionIndex === userAnswer && userAnswer !== question.correctAnswer && (
                              <Badge variant="destructive" className="ml-auto">
                                {t('yourAnswer')}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {!answered && (
                      <p className="text-sm text-gray-600 italic">
                        {t('noAnswerProvided')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent className="p-6">
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${language === 'ar' ? 'sm:flex-row-reverse' : ''}`}>
            <Button
              onClick={onRestart}
              variant="outline"
              className="flex items-center justify-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {t('takeAnotherTest')}
            </Button>
            
            <Button
              onClick={onRestart}
              className="bg-teal-600 hover:bg-teal-700 flex items-center justify-center"
            >
              <Home className="w-4 h-4 mr-2" />
              {t('backToTests')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
