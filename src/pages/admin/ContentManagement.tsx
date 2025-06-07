import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, MessageSquare, BarChart3, Plus, Edit, Trash2, Search, Filter, Calendar, Users } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Content {
  id: string;
  title: string;
  type: 'mcq' | 'exam' | 'live' | 'forum';
  author: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  participants?: number;
  category?: string;
}

export default function ContentManagement() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const contents: Content[] = [
    {
      id: "1",
      title: "QCM Mathématiques - Équations du second degré",
      type: "mcq",
      author: "Yacine Mansouri",
      status: "published",
      createdAt: "2024-01-15",
      participants: 45,
      category: "Mathématiques"
    },
    {
      id: "2", 
      title: "Examen Final - Physique Terminale",
      type: "exam",
      author: "Sarah Benali",
      status: "published",
      createdAt: "2024-01-20",
      participants: 28,
      category: "Physique"
    },
    {
      id: "3",
      title: "Live - Révisions Baccalauréat",
      type: "live",
      author: "Yacine Mansouri",
      status: "published",
      createdAt: "2024-02-01",
      participants: 89,
      category: "Révisions"
    },
    {
      id: "4",
      title: "Discussion - Difficultés en mathématiques",
      type: "forum",
      author: "Ahmed Ali",
      status: "published",
      createdAt: "2024-02-05",
      participants: 12,
      category: "Entraide"
    },
    {
      id: "5",
      title: "QCM Français - Analyse littéraire",
      type: "mcq",
      author: "Fatima Zahra",
      status: "draft",
      createdAt: "2024-02-10",
      category: "Français"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'mcq': return BookOpen;
      case 'exam': return BarChart3;
      case 'live': return Video;
      case 'forum': return MessageSquare;
      default: return BookOpen;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'mcq': return 'QCM';
      case 'exam': return 'Examen';
      case 'live': return 'Live';
      case 'forum': return 'Forum';
      default: return type;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'Publié';
      case 'draft': return 'Brouillon';
      case 'archived': return 'Archivé';
      default: return status;
    }
  };

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || content.type === filterType;
    const matchesStatus = filterStatus === "all" || content.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getContentsByType = (type: string) => {
    return filteredContents.filter(content => content.type === type);
  };

  const ContentCard = ({ content }: { content: Content }) => {
    const IconComponent = getTypeIcon(content.type);
    
    return (
      <div className={`p-4 bg-white border rounded-lg hover:shadow-md transition-shadow ${language === 'ar' ? 'text-right' : ''}`}>
        <div className={`flex items-start justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-start space-x-3 flex-1 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <IconComponent className="w-5 h-5 text-teal-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm mb-1">{content.title}</h3>
              <div className="flex items-center space-x-2 mb-2">
                <Badge className={getStatusBadgeColor(content.status)}>
                  {getStatusLabel(content.status)}
                </Badge>
                {content.category && (
                  <Badge variant="outline" className="text-xs">
                    {content.category}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-1">
                Par {content.author}
              </p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(content.createdAt).toLocaleDateString('fr-FR')}
                </span>
                {content.participants && (
                  <span className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {content.participants}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className={`flex space-x-2 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Button size="sm" variant="outline">
              <Edit className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
            Gestion des contenus
          </h1>
          <p className="text-muted-foreground">
            Administrez tous les contenus pédagogiques de la plateforme
          </p>
        </div>

        {/* Barre d'actions */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 lg:items-end">
              {/* Recherche */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un contenu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Filtres */}
              <div className="grid grid-cols-2 gap-4 lg:flex lg:space-x-4">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="mcq">QCM</SelectItem>
                    <SelectItem value="exam">Examens</SelectItem>
                    <SelectItem value="live">Lives</SelectItem>
                    <SelectItem value="forum">Forums</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="published">Publié</SelectItem>
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="archived">Archivé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="bg-teal-600 hover:bg-teal-700">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau contenu
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">{contents.filter(c => c.type === 'mcq').length}</p>
                  <p className="text-sm text-muted-foreground">QCM</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-600">{contents.filter(c => c.type === 'exam').length}</p>
                  <p className="text-sm text-muted-foreground">Examens</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Video className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-purple-600">{contents.filter(c => c.type === 'live').length}</p>
                  <p className="text-sm text-muted-foreground">Lives</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-orange-600">{contents.filter(c => c.type === 'forum').length}</p>
                  <p className="text-sm text-muted-foreground">Sujets Forum</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des contenus par onglets */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">Tous ({filteredContents.length})</TabsTrigger>
            <TabsTrigger value="mcq">QCM ({getContentsByType('mcq').length})</TabsTrigger>
            <TabsTrigger value="exam">Examens ({getContentsByType('exam').length})</TabsTrigger>
            <TabsTrigger value="live">Lives ({getContentsByType('live').length})</TabsTrigger>
            <TabsTrigger value="forum">Forums ({getContentsByType('forum').length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Tous les contenus</CardTitle>
                <CardDescription>Vue d'ensemble de tous les contenus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredContents.map((content) => (
                    <ContentCard key={content.id} content={content} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mcq">
            <Card>
              <CardHeader>
                <CardTitle>QCM</CardTitle>
                <CardDescription>Questionnaires à choix multiples</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getContentsByType('mcq').map((content) => (
                    <ContentCard key={content.id} content={content} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exam">
            <Card>
              <CardHeader>
                <CardTitle>Examens</CardTitle>
                <CardDescription>Examens et évaluations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getContentsByType('exam').map((content) => (
                    <ContentCard key={content.id} content={content} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="live">
            <Card>
              <CardHeader>
                <CardTitle>Sessions Live</CardTitle>
                <CardDescription>Cours et événements en direct</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getContentsByType('live').map((content) => (
                    <ContentCard key={content.id} content={content} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forum">
            <Card>
              <CardHeader>
                <CardTitle>Sujets de Forum</CardTitle>
                <CardDescription>Discussions et questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getContentsByType('forum').map((content) => (
                    <ContentCard key={content.id} content={content} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}