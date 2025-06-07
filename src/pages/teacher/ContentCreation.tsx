import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Plus, Edit, Trash2, Video, FileText, MessageSquare, Calendar, Eye, Users } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Content {
  id: string;
  title: string;
  type: 'mcq' | 'exam' | 'live' | 'forum';
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  studentsCount?: number;
  responses?: number;
}

export default function ContentCreation() {
  const { language } = useLanguage();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedContentType, setSelectedContentType] = useState<string>("");

  const contents: Content[] = [
    {
      id: "1",
      title: "QCM - Équations du second degré",
      type: "mcq",
      status: "published",
      createdAt: "2024-01-15",
      studentsCount: 45
    },
    {
      id: "2", 
      title: "Examen - Mathématiques Terminale S",
      type: "exam",
      status: "published",
      createdAt: "2024-01-10",
      studentsCount: 52
    },
    {
      id: "3",
      title: "Live - Fonctions logarithmiques", 
      type: "live",
      status: "published",
      createdAt: "2024-01-08",
      studentsCount: 38
    },
    {
      id: "4",
      title: "Discussion - Difficultés en dérivées",
      type: "forum", 
      status: "published",
      createdAt: "2024-01-05",
      responses: 12
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'mcq': return BookOpen;
      case 'exam': return FileText;
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

  const getStatusColor = (status: string) => {
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

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
            Création de contenu
          </h1>
          <p className="text-muted-foreground">
            Créez et gérez vos QCM, examens, lives et discussions forum
          </p>
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="h-20 flex-col bg-teal-600 hover:bg-teal-700"
                onClick={() => setSelectedContentType("mcq")}
              >
                <BookOpen className="w-6 h-6 mb-2" />
                <span className="text-sm">Nouveau QCM</span>
              </Button>
            </DialogTrigger>
          </Dialog>

          <Button 
            variant="outline" 
            className="h-20 flex-col"
            onClick={() => {
              setSelectedContentType("exam");
              setIsCreateDialogOpen(true);
            }}
          >
            <FileText className="w-6 h-6 mb-2" />
            <span className="text-sm">Nouvel examen</span>
          </Button>

          <Button 
            variant="outline" 
            className="h-20 flex-col"
            onClick={() => {
              setSelectedContentType("live");
              setIsCreateDialogOpen(true);
            }}
          >
            <Video className="w-6 h-6 mb-2" />
            <span className="text-sm">Planifier live</span>
          </Button>

          <Button 
            variant="outline" 
            className="h-20 flex-col"
            onClick={() => {
              setSelectedContentType("forum");
              setIsCreateDialogOpen(true);
            }}
          >
            <MessageSquare className="w-6 h-6 mb-2" />
            <span className="text-sm">Sujet forum</span>
          </Button>
        </div>

        {/* Contenu créé */}
        <Card>
          <CardHeader>
            <CardTitle>Mon contenu pédagogique</CardTitle>
            <CardDescription>
              Gérez tous vos contenus créés
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">Tout</TabsTrigger>
                <TabsTrigger value="mcq">QCM</TabsTrigger>
                <TabsTrigger value="exam">Examens</TabsTrigger>
                <TabsTrigger value="live">Lives</TabsTrigger>
                <TabsTrigger value="forum">Forums</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-6">
                {contents.map((content) => {
                  const IconComponent = getTypeIcon(content.type);
                  return (
                    <div key={content.id} className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center space-x-4 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{content.title}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline">
                              {getTypeLabel(content.type)}
                            </Badge>
                            <Badge className={getStatusColor(content.status)}>
                              {getStatusLabel(content.status)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Créé le {content.createdAt}
                            {content.studentsCount && ` • ${content.studentsCount} étudiants`}
                            {content.responses && ` • ${content.responses} réponses`}
                          </p>
                        </div>
                      </div>
                      
                      <div className={`flex items-center space-x-2 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>

              {/* Tabs pour chaque type de contenu */}
              {['mcq', 'exam', 'live', 'forum'].map((type) => (
                <TabsContent key={type} value={type} className="space-y-4 mt-6">
                  {contents.filter(c => c.type === type).map((content) => {
                    const IconComponent = getTypeIcon(content.type);
                    return (
                      <div key={content.id} className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex items-center space-x-4 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">{content.title}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className={getStatusColor(content.status)}>
                                {getStatusLabel(content.status)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Créé le {content.createdAt}
                              {content.studentsCount && ` • ${content.studentsCount} étudiants`}
                              {content.responses && ` • ${content.responses} réponses`}
                            </p>
                          </div>
                        </div>
                        
                        <div className={`flex items-center space-x-2 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Dialog de création */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                Créer un nouveau {getTypeLabel(selectedContentType)}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Titre</Label>
                <Input id="title" placeholder="Titre du contenu" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Description du contenu" className="mt-2" />
              </div>
              {selectedContentType === "live" && (
                <div>
                  <Label htmlFor="date">Date et heure</Label>
                  <Input id="date" type="datetime-local" className="mt-2" />
                </div>
              )}
              <div>
                <Label htmlFor="class">Classe cible</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Sélectionner une classe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="terminale-s">Terminale S</SelectItem>
                    <SelectItem value="premiere-s">1ère S</SelectItem>
                    <SelectItem value="seconde">Seconde</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button 
                  className="flex-1 bg-teal-600 hover:bg-teal-700"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Créer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}