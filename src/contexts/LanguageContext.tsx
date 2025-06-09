
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation and general
    platformName: "ZIDNEY",
    platformSubtitle: "Learning Platform",
    dashboard: "Dashboard",
    mcqTests: "MCQ Tests",
    exams: "Exams",
    library: "Library",
    aiAssistant: "AI Assistant",
    notifications: "Notifications",
    settings: "Settings",
    
    // Dashboard
    dashboardTitle: "Dashboard",
    dashboardSubtitle: "Track your progress and performance",
    testsCompleted: "Tests completed",
    averageScore: "Average score",
    studyTime: "Study time",
    goalsAchieved: "Goals achieved",
    thisMonth: "this month",
    allSubjects: "all subjects",
    thisWeek: "this week",
    quickAccess: "Quick access",
    newMcqTest: "New MCQ test",
    createCustomTest: "Create custom test",
    getRecommendations: "Get recommendations",
    planRevision: "Plan revision",
    organizeSchedule: "Organize your schedule",
    recentTests: "Recent tests",
    recentPerformances: "Your recent performances",
    upcomingExams: "Upcoming exams",
    aiRecommendations: "AI Recommendations",
    suggestedRevision: "Suggested revision",
    focusOnDifferential: "Focus on differential equations",
    seeMoreSuggestions: "See more suggestions",
    
    // Subjects
    mathematics: "Mathematics",
    physics: "Physics",
    chemistry: "Chemistry",
    biology: "Biology",
    arabic: "Arabic",
    french: "French",
    
    // Time
    daysAgo: "{days} days ago",
    weekAgo: "1 week ago",
    questions: "questions",
    
    // Exam types
    finalExam: "Final exam",
    mcqTest: "MCQ test",
    partialExam: "Partial exam",
    
    // MCQ Module
    mcqDescription: "Create and take custom or predefined MCQ tests",
    overview: "Overview",
    createTest: "Create test",
    preconfiguredTests: "Preconfigured tests",
    history: "History",
    rank: "Rank",
    timeSpent: "Time spent",
    recentTestsDescription: "Your latest results",
    upcomingTestsDescription: "Upcoming scheduled tests",
    viewAll: "View all",
    startTest: "Start test",
    
    // Custom test creation
    customTestDescription: "Configure your test according to your needs",
    subject: "Subject",
    selectSubject: "Select a subject",
    numberOfQuestions: "Number of questions",
    timeLimit: "Time limit",
    durationMinutes: "Duration (minutes)",
    testSummary: "Test summary",
    notSelected: "Not selected",
    unlimited: "Unlimited",
    
    // Preconfigured tests
    availableTests: "Available tests",
    intermediate: "Intermediate",
    beginner: "Beginner",
    advanced: "Advanced",
    participants: "participants",
    scheduledTests: "Scheduled tests",
    scheduled: "Scheduled",
    deadline: "Deadline",
    resultsNotVisible: "Results not visible before publication",
    
    // Test history
    testHistory: "Test history",
    exportResults: "Export results",
    goodJob: "Good job!",
    needsImprovement: "Needs improvement",
    excellent: "Excellent!",
    pending: "Pending",
    viewDetails: "View details",
    statistics: "Statistics",
    resultsNotAvailable: "Results not available",
    feedback: "Feedback",
    duration: "Duration",
    
    // Exams Module
    examsDescription: "Take structured exams in sections",
    availableExams: "Available exams",
    completedExams: "Completed exams",
    scheduledExams: "Scheduled exams",
    minutes: "minutes",
    sections: "sections",
    examSections: "Exam sections",
    section: "Section",
    startExam: "Start exam",
    sectionResults: "Section results",
    noScheduledExams: "No scheduled exams",
    noScheduledExamsDescription: "No exams are currently scheduled",
    
    // Question types and sections
    mcqQuestions: "MCQ questions",
    freeQuestions: "Free questions",
    mixedQuestions: "Mixed questions",
    algebra: "Algebra",
    geometry: "Geometry",
    analysis: "Analysis",
    mechanics: "Mechanics",
    thermodynamics: "Thermodynamics",
    waves: "Waves",
    organicChemistry: "Organic chemistry",
    inorganicChemistry: "Inorganic chemistry",
    physicalChemistry: "Physical chemistry",
    
    // Section descriptions
    algebraDescription: "Equations, functions and algebraic systems",
    geometryDescription: "Shapes, surfaces and volumes in space",
    analysisDescription: "Derivatives, integrals and limits",
    mechanicsDescription: "Forces, movement and equilibrium",
    thermodynamicsDescription: "Heat, temperature and energy",
    wavesDescription: "Oscillations, waves and vibratory phenomena",
    
    // Exam names
    midtermMathExam: "Midterm Exam - Mathematics",
    physicsExam: "Physics Exam",
    chemistryExam: "Chemistry Exam",
    
    // Library Module
    libraryDescription: "Explore our collection of educational resources",
    searchAndFilters: "Search and filters",
    searchResources: "Search resources...",
    allSubjectsFilter: "All subjects",
    format: "Format",
    allFormats: "All formats",
    video: "Video",
    audio: "Audio",
    image: "Image",
    type: "Type",
    allTypes: "All types",
    summary: "Summary",
    course: "Course",
    podcast: "Podcast",
    diagrams: "Diagrams",
    searchResults: "Search results",
    advancedFilters: "Advanced filters",
    downloads: "downloads",
    view: "View",
    download: "Download",
    noResults: "No results",
    noResultsDescription: "Try modifying your search criteria",
    
    // Library resources
    algebraSummary: "Algebra Summary",
    algebraSummaryDesc: "Fundamental algebra concepts with examples",
    mechanicsVideo: "Video Course - Mechanics",
    mechanicsVideoDesc: "Complete introduction to classical mechanics",
    organicChemistryAudio: "Podcast - Organic Chemistry",
    organicChemistryAudioDesc: "Discussions on organic reactions",
    geometryDiagrams: "Geometry Diagrams",
    geometryDiagramsDesc: "Collection of annotated geometric figures",
    
    // AI Assistant Module
    assistantDescription: "Your intelligent companion to optimize your learning",
    myRoadmap: "My roadmap",
    recommendations: "Recommendations",
    analytics: "Analytics",
    preparationBac: "Baccalaureate Preparation",
    roadmapProgress: "Track your personalized progress",
    completedTasks: "Completed tasks",
    remainingTasks: "Remaining tasks",
    daysLeft: "Days left",
    weeklyGoal: "Weekly goal",
    upcomingTasks: "Upcoming tasks",
    upcomingTasksDescription: "Next steps in your roadmap",
    completed: "Completed",
    inProgress: "In progress",
    viewFullRoadmap: "View full roadmap",
    
    // Recommendations
    personalizedRecommendations: "Personalized recommendations",
    recommendationsDescription: "Based on your performance and goals",
    improveAlgebra: "Improve algebra",
    algebraWeakness: "Difficulties detected in algebra",
    readAlgebraPDF: "Read algebra PDF",
    practicePhysics: "Practice physics",
    physicsImprovement: "Your physics results can be improved",
    takePhysicsTest: "Take a physics test",
    reviewSchedule: "Review schedule",
    reviewReminder: "It's time to review your schedule",
    viewSchedule: "View schedule",
    high: "High",
    medium: "Medium",
    low: "Low",
    
    // Analytics
    performanceAnalytics: "Performance analytics",
    analyticsDescription: "Detailed analysis of your strengths and weaknesses",
    strengths: "Strengths",
    areasForImprovement: "Areas for improvement",
    
    // Roadmap tasks
    reviewAlgebra: "Review algebra",
    physicsPractice: "Physics exercises",
    chemistryTest: "Chemistry test",
    mathsExercises: "Math exercises",
    physicsRevision: "Physics revision",
    
    // Notifications Module
    notificationsDescription: "Manage your notifications and alerts",
    allNotifications: "All notifications",
    notificationSettings: "Notification settings",
    recentNotifications: "Recent notifications",
    markAllAsRead: "Mark all as read",
    noNotifications: "No notifications",
    noNotificationsDescription: "You have no new notifications",
    
    // Notification types
    testReminder: "Test reminder",
    testReminderMessage: "You have a math test scheduled tomorrow",
    newAchievement: "New achievement",
    achievementMessage: "Congratulations! You completed 10 tests this month",
    newRecommendation: "New recommendation",
    recommendationMessage: "AI suggests you review algebra",
    deadlineWarning: "Warning: deadline",
    deadlineMessage: "Physics exam in 3 days",
    
    // Notification settings
    notificationPreferences: "Notification preferences",
    notificationPreferencesDescription: "Choose when and how to be notified",
    notificationTypes: "Notification types",
    testReminders: "Test reminders",
    testRemindersDesc: "Receive reminders before tests and exams",
    achievements: "Achievements",
    achievementsDesc: "Be notified of new achievements and badges",
    recommendationsDesc: "Receive personalized AI suggestions",
    deadlines: "Deadlines",
    deadlinesDesc: "Alerts for important deadlines",
    weeklySummary: "Weekly summary",
    weeklySummaryDesc: "Receive a summary of your progress each week",
    deliveryMethods: "Delivery methods",
    emailNotifications: "Email notifications",
    emailNotificationsDesc: "Receive notifications by email",
    pushNotifications: "Push notifications",
    pushNotificationsDesc: "Receive notifications on your device",
    saveSettings: "Save settings",
    
    // Settings Module
    settingsDescription: "Manage your account and preferences",
    profile: "Profile",
    preferences: "Preferences",
    security: "Security",
    personalInformation: "Personal information",
    personalInformationDescription: "Manage your profile information",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    dateOfBirth: "Date of birth",
    city: "City",
    educationLevel: "Education level",
    saveChanges: "Save changes",
    
    // Preferences
    applicationPreferences: "Application preferences",
    applicationPreferencesDescription: "Customize your experience",
    language: "Language",
    interfaceLanguage: "Interface language",
    languageDescription: "Choose your preferred language",
    appearance: "Appearance",
    darkMode: "Dark mode",
    darkModeDescription: "Use dark theme",
    features: "Features",
    autoSave: "Auto save",
    autoSaveDescription: "Automatically save your progress",
    advancedStatistics: "Advanced statistics",
    advancedStatisticsDescription: "Show detailed analytics",
    weeklyDigest: "Weekly digest",
    weeklyDigestDescription: "Receive weekly summary by email",
    savePreferences: "Save preferences",
    
    // Security
    securitySettings: "Security settings",
    securitySettingsDescription: "Protect your account",
    twoFactorAuth: "Two-factor authentication",
    twoFactorAuthDescription: "Add an extra layer of security",
    loginAlerts: "Login alerts",
    loginAlertsDescription: "Be notified of new logins",
    sessionTimeout: "Session timeout",
    sessionTimeoutDescription: "Duration before automatic logout (minutes)",
    passwordSecurity: "Password security",
    changePassword: "Change password",
    saveSecuritySettings: "Save security settings",
    
    // Common actions
    date: "Date",
    totalQuestions: "Total questions",
    
    // User roles and connection
    connectedAs: "Connected as",
    administrator: "Administrator",
    teacher: "Teacher",
    student: "Student",
    parent: "Parent"
  },
  fr: {
    // Navigation et général
    platformName: "ZIDNEY",
    platformSubtitle: "Plateforme d'étude",
    dashboard: "Tableau de bord",
    mcqTests: "Tests QCM",
    exams: "Examens",
    library: "Bibliothèque",
    aiAssistant: "Assistant IA",
    notifications: "Notifications",
    settings: "Paramètres",
    
    // Dashboard
    dashboardTitle: "Tableau de bord",
    dashboardSubtitle: "Suivez vos progrès et performances",
    testsCompleted: "Tests complétés",
    averageScore: "Score moyen",
    studyTime: "Temps d'étude",
    goalsAchieved: "Objectifs atteints",
    thisMonth: "ce mois",
    allSubjects: "toutes matières",
    thisWeek: "cette semaine",
    quickAccess: "Accès rapide",
    newMcqTest: "Nouveau test QCM",
    createCustomTest: "Créer un test personnalisé",
    getRecommendations: "Obtenir des recommandations",
    planRevision: "Planifier révision",
    organizeSchedule: "Organiser votre emploi du temps",
    recentTests: "Tests récents",
    recentPerformances: "Vos dernières performances",
    upcomingExams: "Examens à venir",
    aiRecommendations: "Recommandations IA",
    suggestedRevision: "Révision suggérée",
    focusOnDifferential: "Concentrez-vous sur les équations différentielles",
    seeMoreSuggestions: "Voir plus de suggestions",
    
    // Matières
    mathematics: "Mathématiques",
    physics: "Physique",
    chemistry: "Chimie",
    biology: "Biologie",
    arabic: "Arabe",
    french: "Français",
    
    // Temps
    daysAgo: "il y a {days} jours",
    weekAgo: "il y a 1 semaine",
    questions: "questions",
    
    // Types d'examens
    finalExam: "Examen final",
    mcqTest: "Test QCM",
    partialExam: "Examen partiel",
    
    // Module MCQ
    mcqDescription: "Créez et passez des tests QCM personnalisés ou prédéfinis",
    overview: "Aperçu",
    createTest: "Créer un test",
    preconfiguredTests: "Tests préconfigurés",
    history: "Historique",
    rank: "Classement",
    timeSpent: "Temps passé",
    recentTestsDescription: "Vos derniers résultats",
    upcomingTestsDescription: "Tests planifiés à venir",
    viewAll: "Voir tout",
    startTest: "Commencer le test",
    
    // Création de test personnalisé
    customTestDescription: "Configurez votre test selon vos besoins",
    subject: "Matière",
    selectSubject: "Sélectionner une matière",
    numberOfQuestions: "Nombre de questions",
    timeLimit: "Limite de temps",
    durationMinutes: "Durée (minutes)",
    testSummary: "Résumé du test",
    notSelected: "Non sélectionné",
    unlimited: "Illimité",
    
    // Tests préconfigurés
    availableTests: "Tests disponibles",
    intermediate: "Intermédiaire",
    beginner: "Débutant",
    advanced: "Avancé",
    participants: "participants",
    scheduledTests: "Tests planifiés",
    scheduled: "Planifié",
    deadline: "Date limite",
    resultsNotVisible: "Résultats non visibles avant publication",
    
    // Historique des tests
    testHistory: "Historique des tests",
    exportResults: "Exporter les résultats",
    goodJob: "Bon travail !",
    needsImprovement: "À améliorer",
    excellent: "Excellent !",
    pending: "En attente",
    viewDetails: "Voir détails",
    statistics: "Statistiques",
    resultsNotAvailable: "Résultats non disponibles",
    feedback: "Commentaire",
    duration: "Durée",
    
    // Module Examens
    examsDescription: "Passez des examens structurés en sections",
    availableExams: "Examens disponibles",
    completedExams: "Examens terminés",
    scheduledExams: "Examens planifiés",
    minutes: "minutes",
    sections: "sections",
    examSections: "Sections de l'examen",
    section: "Section",
    startExam: "Commencer l'examen",
    sectionResults: "Résultats par section",
    noScheduledExams: "Aucun examen planifié",
    noScheduledExamsDescription: "Aucun examen n'est actuellement planifié",
    
    // Types de questions et sections
    mcqQuestions: "Questions QCM",
    freeQuestions: "Questions libres",
    mixedQuestions: "Questions mixtes",
    algebra: "Algèbre",
    geometry: "Géométrie",
    analysis: "Analyse",
    mechanics: "Mécanique",
    thermodynamics: "Thermodynamique",
    waves: "Ondes",
    organicChemistry: "Chimie organique",
    inorganicChemistry: "Chimie inorganique",
    physicalChemistry: "Chimie physique",
    
    // Descriptions des sections
    algebraDescription: "Équations, fonctions et systèmes algébriques",
    geometryDescription: "Formes, surfaces et volumes dans l'espace",
    analysisDescription: "Dérivées, intégrales et limites",
    mechanicsDescription: "Forces, mouvement et équilibre",
    thermodynamicsDescription: "Chaleur, température et énergie",
    wavesDescription: "Oscillations, ondes et phénomènes vibratoires",
    
    // Noms d'examens
    midtermMathExam: "Examen de mi-semestre - Mathématiques",
    physicsExam: "Examen de Physique",
    chemistryExam: "Examen de Chimie",
    
    // Module Bibliothèque
    libraryDescription: "Explorez notre collection de ressources pédagogiques",
    searchAndFilters: "Recherche et filtres",
    searchResources: "Rechercher des ressources...",
    allSubjectsFilter: "Toutes les matières",
    format: "Format",
    allFormats: "Tous les formats",
    video: "Vidéo",
    audio: "Audio",
    image: "Image",
    type: "Type",
    allTypes: "Tous les types",
    summary: "Résumé",
    course: "Cours",
    podcast: "Podcast",
    diagrams: "Schémas",
    searchResults: "Résultats de recherche",
    advancedFilters: "Filtres avancés",
    downloads: "téléchargements",
    view: "Voir",
    download: "Télécharger",
    noResults: "Aucun résultat",
    noResultsDescription: "Essayez de modifier vos critères de recherche",
    
    // Ressources de la bibliothèque
    algebraSummary: "Résumé d'Algèbre",
    algebraSummaryDesc: "Concepts fondamentaux d'algèbre avec exemples",
    mechanicsVideo: "Cours vidéo - Mécanique",
    mechanicsVideoDesc: "Introduction complète à la mécanique classique",
    organicChemistryAudio: "Podcast - Chimie Organique",
    organicChemistryAudioDesc: "Discussions sur les réactions organiques",
    geometryDiagrams: "Schémas de Géométrie",
    geometryDiagramsDesc: "Collection de figures géométriques annotées",
    
    // Module Assistant IA
    assistantDescription: "Votre compagnon intelligent pour optimiser votre apprentissage",
    myRoadmap: "Ma feuille de route",
    recommendations: "Recommandations",
    analytics: "Analyses",
    preparationBac: "Préparation au Baccalauréat",
    roadmapProgress: "Suivi de votre progression personnalisée",
    completedTasks: "Tâches terminées",
    remainingTasks: "Tâches restantes",
    daysLeft: "Jours restants",
    weeklyGoal: "Objectif hebdomadaire",
    upcomingTasks: "Tâches à venir",
    upcomingTasksDescription: "Prochaines étapes de votre feuille de route",
    completed: "Terminé",
    inProgress: "En cours",
    viewFullRoadmap: "Voir la feuille de route complète",
    
    // Recommandations
    personalizedRecommendations: "Recommandations personnalisées",
    recommendationsDescription: "Basées sur votre performance et vos objectifs",
    improveAlgebra: "Améliorer l'algèbre",
    algebraWeakness: "Des difficultés détectées en algèbre",
    readAlgebraPDF: "Lire le PDF d'algèbre",
    practicePhysics: "Pratiquer la physique",
    physicsImprovement: "Vos résultats en physique peuvent être améliorés",
    takePhysicsTest: "Passer un test de physique",
    reviewSchedule: "Réviser le planning",
    reviewReminder: "Il est temps de réviser votre planning",
    viewSchedule: "Voir le planning",
    high: "Haute",
    medium: "Moyenne",
    low: "Basse",
    
    // Analyses
    performanceAnalytics: "Analyses de performance",
    analyticsDescription: "Analyse détaillée de vos forces et faiblesses",
    strengths: "Points forts",
    areasForImprovement: "Points à améliorer",
    
    // Tâches de la feuille de route
    reviewAlgebra: "Réviser l'algèbre",
    physicsPractice: "Exercices de physique",
    chemistryTest: "Test de chimie",
    mathsExercises: "Exercices de mathématiques",
    physicsRevision: "Révision de physique",
    
    // Module Notifications
    notificationsDescription: "Gérez vos notifications et alertes",
    allNotifications: "Toutes les notifications",
    notificationSettings: "Paramètres de notification",
    recentNotifications: "Notifications récentes",
    markAllAsRead: "Tout marquer comme lu",
    noNotifications: "Aucune notification",
    noNotificationsDescription: "Vous n'avez aucune nouvelle notification",
    
    // Types de notifications
    testReminder: "Rappel de test",
    testReminderMessage: "Vous avez un test de mathématiques prévu demain",
    newAchievement: "Nouveau succès",
    achievementMessage: "Félicitations ! Vous avez terminé 10 tests ce mois-ci",
    newRecommendation: "Nouvelle recommandation",
    recommendationMessage: "L'IA vous suggère de réviser l'algèbre",
    deadlineWarning: "Attention : échéance",
    deadlineMessage: "L'examen de physique est dans 3 jours",
    
    // Paramètres de notifications
    notificationPreferences: "Préférences de notification",
    notificationPreferencesDescription: "Choisissez quand et comment être notifié",
    notificationTypes: "Types de notifications",
    testReminders: "Rappels de tests",
    testRemindersDesc: "Recevoir des rappels avant les tests et examens",
    achievements: "Succès",
    achievementsDesc: "Être notifié des nouveaux succès et badges",
    recommendationsDesc: "Recevoir des suggestions personnalisées de l'IA",
    deadlines: "Échéances",
    deadlinesDesc: "Alertes pour les dates limites importantes",
    weeklySummary: "Résumé hebdomadaire",
    weeklySummaryDesc: "Recevoir un résumé de vos progrès chaque semaine",
    deliveryMethods: "Méthodes de livraison",
    emailNotifications: "Notifications par e-mail",
    emailNotificationsDesc: "Recevoir les notifications par e-mail",
    pushNotifications: "Notifications push",
    pushNotificationsDesc: "Recevoir des notifications sur votre appareil",
    saveSettings: "Enregistrer les paramètres",
    
    // Module Paramètres
    settingsDescription: "Gérez votre compte et vos préférences",
    profile: "Profil",
    preferences: "Préférences",
    security: "Sécurité",
    personalInformation: "Informations personnelles",
    personalInformationDescription: "Gérez vos informations de profil",
    firstName: "Prénom",
    lastName: "Nom",
    email: "E-mail",
    phone: "Téléphone",
    dateOfBirth: "Date de naissance",
    city: "Ville",
    educationLevel: "Niveau d'études",
    saveChanges: "Enregistrer les modifications",
    
    // Préférences
    applicationPreferences: "Préférences de l'application",
    applicationPreferencesDescription: "Personnalisez votre expérience",
    language: "Langue",
    interfaceLanguage: "Langue de l'interface",
    languageDescription: "Choisissez votre langue préférée",
    appearance: "Apparence",
    darkMode: "Mode sombre",
    darkModeDescription: "Utiliser le thème sombre",
    features: "Fonctionnalités",
    autoSave: "Sauvegarde automatique",
    autoSaveDescription: "Sauvegarder automatiquement vos progrès",
    advancedStatistics: "Statistiques avancées",
    advancedStatisticsDescription: "Afficher des analyses détaillées",
    weeklyDigest: "Digest hebdomadaire",
    weeklyDigestDescription: "Recevoir un résumé par e-mail chaque semaine",
    savePreferences: "Enregistrer les préférences",
    
    // Sécurité
    securitySettings: "Paramètres de sécurité",
    securitySettingsDescription: "Protégez votre compte",
    twoFactorAuth: "Authentification à deux facteurs",
    twoFactorAuthDescription: "Ajouter une couche de sécurité supplémentaire",
    loginAlerts: "Alertes de connexion",
    loginAlertsDescription: "Être averti des nouvelles connexions",
    sessionTimeout: "Délai d'expiration de session",
    sessionTimeoutDescription: "Durée avant déconnexion automatique (minutes)",
    passwordSecurity: "Sécurité du mot de passe",
    changePassword: "Changer le mot de passe",
    saveSecuritySettings: "Enregistrer les paramètres de sécurité",
    
    // Actions communes
    date: "Date",
    totalQuestions: "Total des questions",
    
    // Rôles et connexion utilisateur
    connectedAs: "Connecté en tant que",
    administrator: "Administrateur",
    teacher: "Professeur",
    student: "Étudiant",
    parent: "Parent"
  },
  ar: {
    // Navigation et général
    platformName: "منصة زدني",
    platformSubtitle: "منصة التعلم",
    dashboard: "لوحة التحكم",
    mcqTests: "اختبارات الاختيار من متعدد",
    exams: "الامتحانات",
    library: "المكتبة",
    aiAssistant: "المساعد الذكي",
    notifications: "الإشعارات",
    settings: "الإعدادات",
    
    // Dashboard
    dashboardTitle: "لوحة التحكم",
    dashboardSubtitle: "تتبع تقدمك وأداءك",
    testsCompleted: "الاختبارات المنجزة",
    averageScore: "المتوسط العام",
    studyTime: "وقت الدراسة",
    goalsAchieved: "الأهداف المحققة",
    thisMonth: "هذا الشهر",
    allSubjects: "جميع المواد",
    thisWeek: "هذا الأسبوع",
    quickAccess: "الوصول السريع",
    newMcqTest: "اختبار جديد",
    createCustomTest: "إنشاء اختبار مخصص",
    getRecommendations: "الحصول على توصيات",
    planRevision: "تخطيط المراجعة",
    organizeSchedule: "تنظيم جدولك",
    recentTests: "الاختبارات الأخيرة",
    recentPerformances: "أداءك الأخير",
    upcomingExams: "الامتحانات القادمة",
    aiRecommendations: "توصيات الذكاء الاصطناعي",
    suggestedRevision: "مراجعة مقترحة",
    focusOnDifferential: "ركز على المعادلات التفاضلية",
    seeMoreSuggestions: "عرض المزيد من الاقتراحات",
    
    // Matières
    mathematics: "الرياضيات",
    physics: "الفيزياء",
    chemistry: "الكيمياء",
    biology: "علوم الحياة",
    arabic: "اللغة العربية",
    french: "اللغة الفرنسية",
    
    // Temps
    daysAgo: "منذ {days} أيام",
    weekAgo: "منذ أسبوع",
    questions: "أسئلة",
    
    // Types d'examens
    finalExam: "امتحان نهائي",
    mcqTest: "اختبار الاختيار من متعدد",
    partialExam: "امتحان جزئي",
    
    // Module MCQ
    mcqDescription: "أنشئ واجتز اختبارات الاختيار من متعدد المخصصة أو المحددة مسبقاً",
    overview: "نظرة عامة",
    createTest: "إنشاء اختبار",
    preconfiguredTests: "اختبارات محددة مسبقاً",
    history: "السجل",
    rank: "الترتيب",
    timeSpent: "الوقت المستغرق",
    recentTestsDescription: "نتائجك الأخيرة",
    upcomingTestsDescription: "الاختبارات المجدولة القادمة",
    viewAll: "عرض الكل",
    startTest: "بدء الاختبار",
    
    // Création de test personnalisé
    customTestDescription: "اضبط اختبارك حسب احتياجاتك",
    subject: "المادة",
    selectSubject: "اختر المادة",
    numberOfQuestions: "عدد الأسئلة",
    timeLimit: "حد زمني",
    durationMinutes: "المدة (بالدقائق)",
    testSummary: "ملخص الاختبار",
    notSelected: "غير محدد",
    unlimited: "غير محدود",
    
    // Tests préconfigurés
    availableTests: "الاختبارات المتاحة",
    intermediate: "متوسط",
    beginner: "مبتدئ",
    advanced: "متقدم",
    participants: "مشاركين",
    scheduledTests: "الاختبارات المجدولة",
    scheduled: "مجدول",
    deadline: "الموعد النهائي",
    resultsNotVisible: "النتائج غير مرئية قبل النشر",
    
    // Historique des tests
    testHistory: "سجل الاختبارات",
    exportResults: "تصدير النتائج",
    goodJob: "عمل جيد!",
    needsImprovement: "يحتاج تحسين",
    excellent: "ممتاز!",
    pending: "قيد الانتظار",
    viewDetails: "عرض التفاصيل",
    statistics: "الإحصائيات",
    resultsNotAvailable: "النتائج غير متوفرة",
    feedback: "التعليق",
    duration: "المدة",
    
    // Module Examens
    examsDescription: "اجتز امتحانات منظمة في أقسام",
    availableExams: "الامتحانات المتاحة",
    completedExams: "الامتحانات المنجزة",
    scheduledExams: "الامتحانات المجدولة",
    minutes: "دقائق",
    sections: "أقسام",
    examSections: "أقسام الامتحان",
    section: "القسم",
    startExam: "بدء الامتحان",
    sectionResults: "نتائج الأقسام",
    noScheduledExams: "لا توجد امتحانات مجدولة",
    noScheduledExamsDescription: "لا يوجد حالياً أي امتحان مجدول",
    
    // Types de questions et sections
    mcqQuestions: "أسئلة الاختيار من متعدد",
    freeQuestions: "أسئلة حرة",
    mixedQuestions: "أسئلة مختلطة",
    algebra: "الجبر",
    geometry: "الهندسة",
    analysis: "التحليل",
    mechanics: "الميكانيكا",
    thermodynamics: "الديناميكا الحرارية",
    waves: "الموجات",
    organicChemistry: "الكيمياء العضوية",
    inorganicChemistry: "الكيمياء غير العضوية",
    physicalChemistry: "الكيمياء الفيزيائية",
    
    // Descriptions des sections
    algebraDescription: "المعادلات والدوال والأنظمة الجبرية",
    geometryDescription: "الأشكال والسطوح والحجوم في الفضاء",
    analysisDescription: "المشتقات والتكاملات والنهايات",
    mechanicsDescription: "القوى والحركة والتوازن",
    thermodynamicsDescription: "الحرارة ودرجة الحرارة والطاقة",
    wavesDescription: "التذبذبات والموجات والظواهر الاهتزازية",
    
    // Noms d'examens
    midtermMathExam: "امتحان منتصف الفصل - الرياضيات",
    physicsExam: "امتحان الفيزياء",
    chemistryExam: "امتحان الكيمياء",
    
    // Module Bibliothèque
    libraryDescription: "اكتشف مجموعتنا من الموارد التعليمية",
    searchAndFilters: "البحث والمرشحات",
    searchResources: "البحث في الموارد...",
    allSubjectsFilter: "جميع المواد",
    format: "التنسيق",
    allFormats: "جميع التنسيقات",
    video: "فيديو",
    audio: "صوت",
    image: "صورة",
    type: "النوع",
    allTypes: "جميع الأنواع",
    summary: "ملخص",
    course: "دورة",
    podcast: "بودكاست",
    diagrams: "مخططات",
    searchResults: "نتائج البحث",
    advancedFilters: "مرشحات متقدمة",
    downloads: "تحميلات",
    view: "عرض",
    download: "تحميل",
    noResults: "لا توجد نتائج",
    noResultsDescription: "حاول تعديل معايير البحث",
    
    // Ressources de la bibliothèque
    algebraSummary: "ملخص الجبر",
    algebraSummaryDesc: "المفاهيم الأساسية للجبر مع أمثلة",
    mechanicsVideo: "دروس فيديو - الميكانيكا",
    mechanicsVideoDesc: "مقدمة شاملة للميكانيكا الكلاسيكية",
    organicChemistryAudio: "بودكاست - الكيمياء العضوية",
    organicChemistryAudioDesc: "مناقشات حول التفاعلات العضوية",
    geometryDiagrams: "مخططات الهندسة",
    geometryDiagramsDesc: "مجموعة من الأشكال الهندسية المشروحة",
    
    // Module Assistant IA
    assistantDescription: "رفيقك الذكي لتحسين تعلمك",
    myRoadmap: "خارطة طريقي",
    recommendations: "التوصيات",
    analytics: "التحليلات",
    preparationBac: "التحضير للبكالوريا",
    roadmapProgress: "متابعة تقدمك الشخصي",
    completedTasks: "المهام المنجزة",
    remainingTasks: "المهام المتبقية",
    daysLeft: "أيام متبقية",
    weeklyGoal: "الهدف الأسبوعي",
    upcomingTasks: "المهام القادمة",
    upcomingTasksDescription: "الخطوات التالية في خارطة طريقك",
    completed: "منجز",
    inProgress: "قيد التنفيذ",
    viewFullRoadmap: "عرض خارطة الطريق كاملة",
    
    // Recommandations
    personalizedRecommendations: "توصيات شخصية",
    recommendationsDescription: "بناءً على أداءك وأهدافك",
    improveAlgebra: "تحسين الجبر",
    algebraWeakness: "تم اكتشاف صعوبات في الجبر",
    readAlgebraPDF: "قراءة ملف الجبر",
    practicePhysics: "ممارسة الفيزياء",
    physicsImprovement: "يمكن تحسين نتائجك في الفيزياء",
    takePhysicsTest: "إجراء اختبار فيزياء",
    reviewSchedule: "مراجعة الجدول",
    reviewReminder: "حان وقت مراجعة جدولك",
    viewSchedule: "عرض الجدول",
    high: "عالية",
    medium: "متوسطة",
    low: "منخفضة",
    
    // Analyses
    performanceAnalytics: "تحليلات الأداء",
    analyticsDescription: "تحليل مفصل لنقاط قوتك وضعفك",
    strengths: "نقاط القوة",
    areasForImprovement: "نقاط التحسين",
    
    // Tâches de la feuille de route
    reviewAlgebra: "مراجعة الجبر",
    physicsPractice: "تمارين الفيزياء",
    chemistryTest: "اختبار الكيمياء",
    mathsExercises: "تمارين الرياضيات",
    physicsRevision: "مراجعة الفيزياء",
    
    // Module Notifications
    notificationsDescription: "إدارة إشعاراتك وتنبيهاتك",
    allNotifications: "جميع الإشعارات",
    notificationSettings: "إعدادات الإشعارات",
    recentNotifications: "الإشعارات الأخيرة",
    markAllAsRead: "تحديد الكل كمقروء",
    noNotifications: "لا توجد إشعارات",
    noNotificationsDescription: "ليس لديك إشعارات جديدة",
    
    // Types de notifications
    testReminder: "تذكير بالاختبار",
    testReminderMessage: "لديك اختبار رياضيات مجدول غداً",
    newAchievement: "إنجاز جديد",
    achievementMessage: "تهانينا! لقد أنهيت 10 اختبارات هذا الشهر",
    newRecommendation: "توصية جديدة",
    recommendationMessage: "الذكاء الاصطناعي يقترح عليك مراجعة الجبر",
    deadlineWarning: "تنبيه: موعد نهائي",
    deadlineMessage: "امتحان الفيزياء خلال 3 أيام",
    
    // Paramètres de notifications
    notificationPreferences: "تفضيلات الإشعارات",
    notificationPreferencesDescription: "اختر متى وكيف تريد أن يتم إشعارك",
    notificationTypes: "أنواع الإشعارات",
    testReminders: "تذكيرات الاختبارات",
    testRemindersDesc: "تلقي تذكيرات قبل الاختبارات والامتحانات",
    achievements: "الإنجازات",
    achievementsDesc: "الحصول على إشعارات للإنجازات والشارات الجديدة",
    recommendationsDesc: "تلقي اقتراحات شخصية من الذكاء الاصطناعي",
    deadlines: "المواعيد النهائية",
    deadlinesDesc: "تنبيهات للمواعيد النهائية المهمة",
    weeklySummary: "الملخص الأسبوعي",
    weeklySummaryDesc: "تلقي ملخص لتقدمك كل أسبوع",
    deliveryMethods: "طرق التسليم",
    emailNotifications: "إشعارات البريد الإلكتروني",
    emailNotificationsDesc: "تلقي الإشعارات عبر البريد الإلكتروني",
    pushNotifications: "الإشعارات الفورية",
    pushNotificationsDesc: "تلقي إشعارات على جهازك",
    saveSettings: "حفظ الإعدادات",
    
    // Module Paramètres
    settingsDescription: "إدارة حسابك وتفضيلاتك",
    profile: "الملف الشخصي",
    preferences: "التفضيلات",
    security: "الأمان",
    personalInformation: "المعلومات الشخصية",
    personalInformationDescription: "إدارة معلومات ملفك الشخصي",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    dateOfBirth: "تاريخ الميلاد",
    city: "المدينة",
    educationLevel: "المستوى التعليمي",
    saveChanges: "حفظ التغييرات",
    
    // Préférences
    applicationPreferences: "تفضيلات التطبيق",
    applicationPreferencesDescription: "خصص تجربتك",
    language: "اللغة",
    interfaceLanguage: "لغة الواجهة",
    languageDescription: "اختر لغتك المفضلة",
    appearance: "المظهر",
    darkMode: "الوضع المظلم",
    darkModeDescription: "استخدام السمة المظلمة",
    features: "الميزات",
    autoSave: "الحفظ التلقائي",
    autoSaveDescription: "حفظ تقدمك تلقائياً",
    advancedStatistics: "إحصائيات متقدمة",
    advancedStatisticsDescription: "عرض تحليلات مفصلة",
    weeklyDigest: "الملخص الأسبوعي",
    weeklyDigestDescription: "تلقي ملخص عبر البريد الإلكتروني كل أسبوع",
    savePreferences: "حفظ التفضيلات",
    
    // Sécurité
    securitySettings: "إعدادات الأمان",
    securitySettingsDescription: "احم حسابك",
    twoFactorAuth: "المصادقة ثنائية العوامل",
    twoFactorAuthDescription: "إضافة طبقة أمان إضافية",
    loginAlerts: "تنبيهات تسجيل الدخول",
    loginAlertsDescription: "الحصول على تنبيه عند تسجيل دخول جديد",
    sessionTimeout: "انتهاء مهلة الجلسة",
    sessionTimeoutDescription: "المدة قبل قطع الاتصال التلقائي (بالدقائق)",
    passwordSecurity: "أمان كلمة المرور",
    changePassword: "تغيير كلمة المرور",
    saveSecuritySettings: "حفظ إعدادات الأمان",
    
    // Actions communes
    date: "التاريخ",
    totalQuestions: "إجمالي الأسئلة",
    
    // أدوار المستخدم والاتصال
    connectedAs: "متصل كـ",
    administrator: "مدير",
    teacher: "مدرس",
    student: "طالب",
    parent: "ولي أمر"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fr] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className={language === 'ar' ? 'font-arabic' : 'font-sans'}>
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
