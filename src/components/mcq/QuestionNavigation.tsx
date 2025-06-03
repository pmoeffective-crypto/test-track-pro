
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Flag, CheckCircle, Circle } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  difficulty: string;
}

interface QuestionNavigationProps {
  questions: Question[];
  currentQuestion: number;
  answers: Record<number, number>;
  flaggedQuestions: Set<number>;
  onGoToQuestion: (index: number) => void;
}

export function QuestionNavigation({
  questions,
  currentQuestion,
  answers,
  flaggedQuestions,
  onGoToQuestion
}: QuestionNavigationProps) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-5 gap-2">
      {questions.map((_, index) => {
        const isAnswered = answers.hasOwnProperty(index);
        const isFlagged = flaggedQuestions.has(index);
        const isCurrent = currentQuestion === index;

        return (
          <button
            key={index}
            onClick={() => onGoToQuestion(index)}
            className={`relative p-2 text-xs rounded border-2 transition-all ${
              isCurrent
                ? 'border-teal-500 bg-teal-500 text-white'
                : isAnswered
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            <div className="flex items-center justify-center">
              {isAnswered ? (
                <CheckCircle className="w-3 h-3" />
              ) : (
                <Circle className="w-3 h-3" />
              )}
            </div>
            <span className="block mt-1">{index + 1}</span>
            {isFlagged && (
              <Flag className="absolute -top-1 -right-1 w-3 h-3 text-orange-500" />
            )}
          </button>
        );
      })}
    </div>
  );
}
