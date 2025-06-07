import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Search, Filter, Eye, MessageSquare, BarChart3, TrendingUp, TrendingDown, Clock, Award } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Student {
  id: string;
  name: string;
  class: string;
  email: string;
  lastActivity: string;
  mcqAverage: number;
  examAverage: number;
  participation: number;
  forumActivity: number;
  status: 'active' | 'inactive' | 'at-risk';
}

export default function StudentTracking() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const students: Student[] = [
    {
      id: "1",
      name: "Sarah Ahmed",
      class: "Terminale S",
      email: "sarah@student.com",
      lastActivity: "Il y a 2h",
      mcqAverage: 85,
      examAverage: 82,
      participation: 90,
      forumActivity: 15,
      status: "active"
    },
    {
      id: "2", 
      name: "Mohamed Ali",
      class: "Terminale S",
      email: "mohamed@student.com",
      lastActivity: "Il y a 4h",
      mcqAverage: 72,
      examAverage: 75,
      participation: 65,
      forumActivity: 8,
      status: "active"
    },
    {
      id: "3",
      name: "Fatima Zahra",
      class: "1ère S",
      email: "fatima@student.com", 
      lastActivity: "Il y a 1 jour",
      mcqAverage: 91,
      examAverage: 88,
      participation: 95,
      forumActivity: 22,
      status: "active"
    },
    {
      id: "4",
      name: "Youssef Benali",
      class: "Terminale S",
      email: "youssef@student.com",
      lastActivity: "Il y a 6h",
      mcqAverage: 68,
      examAverage: 65,
      participation: 45,
      forumActivity: 3,
      status: "at-risk"
    },
    {
      id: "5",
      name: "Amina Mansouri",
      class: "1ère S", 
      email: "amina@student.com",
      lastActivity: "Il y a 3 jours",
      mcqAverage: 55,
      examAverage: 58,
      participation: 30,
      forumActivity: 1,
      status: "at-risk"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'at-risk': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'at-risk': return 'À risque';
      default: return status;
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getTrendIcon = (current: number, threshold: number) => {
    if (current >= threshold) return TrendingUp;
    return TrendingDown;
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === "all" || student.class === filterClass;
    const matchesStatus = filterStatus === "all" || student.status === filterStatus;
    
    return matchesSearch && matchesClass && matchesStatus;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
            Suivi des étudiants
          </h1>
          <p className="text-muted-foreground">
            Suivez les performances et l'activité de vos étudiants
          </p>
        </div>

        {/* Statistiques générales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-teal-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total étudiants</p>
                  <p className="text-2xl font-bold">127</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Moyenne générale</p>
                  <p className="text-2xl font-bold">76%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Actifs aujourd'hui</p>
                  <p className="text-2xl font-bold">89</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center">
                <TrendingDown className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">À risque</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 lg:items-end">
              <div className="flex-1">
                <label className="text-sm font-medium">Rechercher un étudiant</label>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Nom, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 lg:flex lg:space-x-4">
                <div>
                  <label className="text-sm font-medium">Classe</label>
                  <Select value={filterClass} onValueChange={setFilterClass}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les classes</SelectItem>
                      <SelectItem value="Terminale S">Terminale S</SelectItem>
                      <SelectItem value="1ère S">1ère S</SelectItem>
                      <SelectItem value="Seconde">Seconde</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Statut</label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="inactive">Inactif</SelectItem>
                      <SelectItem value="at-risk">À risque</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des étudiants */}
        <Card>
          <CardHeader>
            <CardTitle>Mes étudiants ({filteredStudents.length})</CardTitle>
            <CardDescription>
              Performances et activité détaillées
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="performance">Performances</TabsTrigger>
                <TabsTrigger value="activity">Activité</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-6">
                {filteredStudents.map((student) => (
                  <div key={student.id} className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center space-x-4 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.class} • {student.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getStatusColor(student.status)}>
                            {getStatusLabel(student.status)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {student.lastActivity}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`flex items-center space-x-4 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className="text-right">
                        <p className="text-sm font-medium">Moyenne générale</p>
                        <p className={`text-lg font-bold ${getPerformanceColor((student.mcqAverage + student.examAverage) / 2)}`}>
                          {Math.round((student.mcqAverage + student.examAverage) / 2)}%
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Détails
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="performance" className="space-y-4 mt-6">
                {filteredStudents.map((student) => (
                  <div key={student.id} className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center space-x-4 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.class}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground">QCM</p>
                        <p className={`font-bold ${getPerformanceColor(student.mcqAverage)}`}>
                          {student.mcqAverage}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Examens</p>
                        <p className={`font-bold ${getPerformanceColor(student.examAverage)}`}>
                          {student.examAverage}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Participation</p>
                        <p className={`font-bold ${getPerformanceColor(student.participation)}`}>
                          {student.participation}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="activity" className="space-y-4 mt-6">
                {filteredStudents.map((student) => (
                  <div key={student.id} className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center space-x-4 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.class}</p>
                        <p className="text-xs text-muted-foreground">{student.lastActivity}</p>
                      </div>
                    </div>
                    
                    <div className={`flex items-center space-x-6 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className="text-center">
                        <MessageSquare className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                        <p className="text-sm font-medium">{student.forumActivity}</p>
                        <p className="text-xs text-muted-foreground">Messages</p>
                      </div>
                      <div className="text-center">
                        <BarChart3 className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                        <p className="text-sm font-medium">{student.participation}%</p>
                        <p className="text-xs text-muted-foreground">Assiduité</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}