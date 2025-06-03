import React, { createContext, useContext, useState } from 'react';

type Language = 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    dashboard: "Tableau de bord",
    mcqTests: "Tests QCM",
    exams: "Examens",
    library: "Bibliothèque",
    aiAssistant: "Assistant IA",
    notifications: "Notifications",
    settings: "Paramètres",
    
    // Dashboard
    dashboardTitle: "Tableau de bord",
    dashboardSubtitle: "Suivez vos progrès et accédez rapidement à vos outils d'étude",
    testsCompleted: "Tests réalisés",
    thisMonth: "Ce mois",
    averageScore: "Score moyen",
    allSubjects: "Toutes matières",
    studyTime: "Temps d'étude",
    thisWeek: "Cette semaine",
    goalsAchieved: "Objectifs atteints",
    quickAccess: "Accès rapide",
    recentTests: "Tests récents",
    recentPerformances: "Vos dernières performances",
    upcomingExams: "Prochains examens",
    aiRecommendations: "Recommandations IA",
    suggestedRevision: "Révision suggérée",
    focusOnDifferential: "Concentrez-vous sur les équations différentielles en mathématiques",
    seeMoreSuggestions: "Voir plus de suggestions",
    
    // Quick actions
    newMcqTest: "Nouveau test QCM",
    createCustomTest: "Créer un test personnalisé",
    getRecommendations: "Obtenir des recommandations",
    planRevision: "Planifier révision",
    organizeSchedule: "Organiser votre planning",
    
    // Subjects
    mathematics: "Mathématiques",
    physics: "Physique",
    chemistry: "Chimie",
    
    // Other
    questions: "questions",
    daysAgo: "Il y a {days} jours",
    weekAgo: "Il y a 1 semaine",
    finalExam: "Examen final",
    mcqTest: "Test QCM",
    partialExam: "Examen partiel",
    platformName: "ZIDNEY",
    platformSubtitle: "Plateforme d'étude"
  },
  ar: {
    // Navigation
    dashboard: "لوحة القيادة",
    mcqTests: "اختبارات الأسئلة متعددة الخيارات",
    exams: "الامتحانات",
    library: "المكتبة",
    aiAssistant: "المساعد الذكي",
    notifications: "الإشعارات",
    settings: "الإعدادات",
    
    // Dashboard
    dashboardTitle: "لوحة القيادة",
    dashboardSubtitle: "تابع تقدمك واحصل على أدوات الدراسة بسرعة",
    testsCompleted: "الاختبارات المنجزة",
    thisMonth: "هذا الشهر",
    averageScore: "النتيجة المتوسطة",
    allSubjects: "جميع المواد",
    studyTime: "وقت الدراسة",
    thisWeek: "هذا الأسبوع",
    goalsAchieved: "الأهداف المحققة",
    quickAccess: "الوصول السريع",
    recentTests: "الاختبارات الأخيرة",
    recentPerformances: "أداءك الأخير",
    upcomingExams: "الامتحانات القادمة",
    aiRecommendations: "توصيات الذكاء الاصطناعي",
    suggestedRevision: "مراجعة مقترحة",
    focusOnDifferential: "ركز على المعادلات التفاضلية في الرياضيات",
    seeMoreSuggestions: "رؤية المزيد من الاقتراحات",
    
    // Quick actions
    newMcqTest: "اختبار جديد متعدد الخيارات",
    createCustomTest: "إنشاء اختبار مخصص",
    getRecommendations: "الحصول على التوصيات",
    planRevision: "تخطيط المراجعة",
    organizeSchedule: "تنظيم جدولك",
    
    // Subjects
    mathematics: "الرياضيات",
    physics: "الفيزياء",
    chemistry: "الكيمياء",
    
    // Other
    questions: "أسئلة",
    daysAgo: "منذ {days} أيام",
    weekAgo: "منذ أسبوع",
    finalExam: "امتحان نهائي",
    mcqTest: "اختبار متعدد الخيارات",
    partialExam: "امتحان جزئي",
    platformName: "منصة زدني",
    platformSubtitle: "منصة الدراسة"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fr] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className={language === 'ar' ? 'font-arabic' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
