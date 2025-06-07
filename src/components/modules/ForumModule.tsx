import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Plus, Search, Filter, Pin, Flag, Eye, MessageCircle, Clock, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ForumTopic {
  id: number;
  title: string;
  description: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
  isPinned: boolean;
  isFlagged: boolean;
  role: string;
}

export function ForumModule() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("discussions");
  const [showCreateTopic, setShowCreateTopic] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const mockTopics: ForumTopic[] = [
    {
      id: 1,
      title: "Méthodes d'apprentissage efficaces en mathématiques",
      description: "Discussion sur les meilleures approches pédagogiques pour enseigner les mathématiques au niveau secondaire",
      author: "Prof. Martin",
      category: "Pédagogie",
      replies: 24,
      views: 156,
      lastActivity: "Il y a 2h",
      isPinned: true,
      isFlagged: false,
      role: "Professeur"
    },
    {
      id: 2,
      title: "Préparation aux examens : conseils et stratégies",
      description: "Partage d'expériences et de conseils pour aider les étudiants dans leur préparation",
      author: "Sarah L.",
      category: "Examens",
      replies: 18,
      views: 89,
      lastActivity: "Il y a 4h",
      isPinned: false,
      isFlagged: false,
      role: "Étudiant"
    },
    {
      id: 3,
      title: "Communication parent-professeur",
      description: "Comment améliorer la communication entre les familles et l'équipe pédagogique",
      author: "Admin ZIDNEY",
      category: "Communication",
      replies: 31,
      views: 203,
      lastActivity: "Il y a 1j",
      isPinned: true,
      isFlagged: false,
      role: "Administrateur"
    }
  ];

  const categories = ["Pédagogie", "Examens", "Communication", "Général", "Support technique"];

  const filteredTopics = mockTopics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const CreateTopicForm = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <Plus className="w-5 h-5" />
          Créer un nouveau sujet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Titre du sujet</label>
          <Input placeholder="Entrez le titre de votre sujet..." className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Catégorie</label>
          <Select>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Sélectionnez une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea 
            placeholder="Décrivez votre sujet en détail..." 
            className="mt-1 min-h-[100px]"
          />
        </div>
        <div className={`flex gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <Button onClick={() => setShowCreateTopic(false)}>
            Publier le sujet
          </Button>
          <Button variant="outline" onClick={() => setShowCreateTopic(false)}>
            Annuler
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const TopicCard = ({ topic }: { topic: ForumTopic }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className={`flex items-start justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <div className="flex-1">
            <div className={`flex items-center gap-2 mb-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              {topic.isPinned && <Pin className="w-4 h-4 text-teal-600" />}
              {topic.isFlagged && <Flag className="w-4 h-4 text-orange-500" />}
              <h3 className="font-semibold text-lg hover:text-teal-600 cursor-pointer">
                {topic.title}
              </h3>
            </div>
            <p className="text-muted-foreground text-sm mb-3">{topic.description}</p>
            <div className={`flex items-center gap-4 text-xs text-muted-foreground ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-1 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <User className="w-3 h-3" />
                <span>{topic.author}</span>
                <Badge variant="outline" className="text-xs">{topic.role}</Badge>
              </div>
              <div className={`flex items-center gap-1 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <Clock className="w-3 h-3" />
                <span>{topic.lastActivity}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 text-center min-w-[80px]">
            <Badge className="bg-teal-100 text-teal-700">{topic.category}</Badge>
            <div className={`flex items-center gap-4 text-xs ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-1 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <MessageCircle className="w-3 h-3" />
                <span>{topic.replies}</span>
              </div>
              <div className={`flex items-center gap-1 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <Eye className="w-3 h-3" />
                <span>{topic.views}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
          Forum de Discussion
        </h1>
        <p className="text-muted-foreground">
          Échangez avec la communauté éducative : professeurs, étudiants et parents
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="mes-sujets">Mes sujets</TabsTrigger>
          <TabsTrigger value="suivis">Sujets suivis</TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="space-y-6">
          {/* Barre d'actions */}
          <div className={`flex flex-col sm:flex-row gap-4 ${language === 'ar' ? 'sm:flex-row-reverse' : ''}`}>
            <div className="flex-1">
              <div className="relative">
                <Search className={`absolute top-2.5 w-4 h-4 text-muted-foreground ${language === 'ar' ? 'right-3' : 'left-3'}`} />
                <Input
                  placeholder="Rechercher dans les discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={language === 'ar' ? 'pr-10' : 'pl-10'}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={() => setShowCreateTopic(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nouveau sujet
              </Button>
            </div>
          </div>

          {/* Formulaire de création */}
          {showCreateTopic && <CreateTopicForm />}

          {/* Liste des sujets */}
          <div className="space-y-4">
            {filteredTopics.map(topic => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mes-sujets" className="space-y-4">
          <Card>
            <CardContent className="p-6 text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucun sujet créé</h3>
              <p className="text-muted-foreground mb-4">
                Vous n'avez pas encore créé de sujet de discussion.
              </p>
              <Button onClick={() => setShowCreateTopic(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Créer mon premier sujet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suivis" className="space-y-4">
          <Card>
            <CardContent className="p-6 text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucun sujet suivi</h3>
              <p className="text-muted-foreground">
                Suivez des sujets pour être notifié des nouvelles réponses.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}