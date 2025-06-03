
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { Play, Settings } from "lucide-react";

export function CreateCustomTest() {
  const { t } = useLanguage();
  const [testConfig, setTestConfig] = useState({
    subject: "",
    questionCount: 10,
    duration: 30,
    hasTimeLimit: true
  });

  const subjects = [
    { value: "mathematics", label: t('mathematics') },
    { value: "physics", label: t('physics') },
    { value: "chemistry", label: t('chemistry') },
    { value: "biology", label: t('biology') },
    { value: "arabic", label: t('arabic') },
    { value: "french", label: t('french') }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-teal-600" />
            {t('createCustomTest')}
          </CardTitle>
          <CardDescription>
            {t('customTestDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Matière */}
          <div className="space-y-2">
            <Label htmlFor="subject">{t('subject')}</Label>
            <Select value={testConfig.subject} onValueChange={(value) => setTestConfig({...testConfig, subject: value})}>
              <SelectTrigger>
                <SelectValue placeholder={t('selectSubject')} />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.value} value={subject.value}>
                    {subject.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Nombre de questions */}
          <div className="space-y-2">
            <Label htmlFor="questionCount">{t('numberOfQuestions')}</Label>
            <Input
              id="questionCount"
              type="number"
              min="5"
              max="50"
              value={testConfig.questionCount}
              onChange={(e) => setTestConfig({...testConfig, questionCount: parseInt(e.target.value)})}
            />
          </div>

          {/* Durée */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="hasTimeLimit">{t('timeLimit')}</Label>
              <Switch
                id="hasTimeLimit"
                checked={testConfig.hasTimeLimit}
                onCheckedChange={(checked) => setTestConfig({...testConfig, hasTimeLimit: checked})}
              />
            </div>

            {testConfig.hasTimeLimit && (
              <div className="space-y-2">
                <Label htmlFor="duration">{t('durationMinutes')}</Label>
                <Input
                  id="duration"
                  type="number"
                  min="10"
                  max="180"
                  value={testConfig.duration}
                  onChange={(e) => setTestConfig({...testConfig, duration: parseInt(e.target.value)})}
                />
              </div>
            )}
          </div>

          {/* Résumé */}
          <Card className="bg-teal-50 border-teal-200">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">{t('testSummary')}</h4>
              <ul className="space-y-1 text-sm">
                <li><strong>{t('subject')}:</strong> {testConfig.subject ? subjects.find(s => s.value === testConfig.subject)?.label : t('notSelected')}</li>
                <li><strong>{t('questions')}:</strong> {testConfig.questionCount}</li>
                <li><strong>{t('duration')}:</strong> {testConfig.hasTimeLimit ? `${testConfig.duration} minutes` : t('unlimited')}</li>
              </ul>
            </CardContent>
          </Card>

          <Button 
            className="w-full bg-teal-600 hover:bg-teal-700" 
            size="lg"
            disabled={!testConfig.subject}
          >
            <Play className="w-5 h-5 mr-2" />
            {t('startTest')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
