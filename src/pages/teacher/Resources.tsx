import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FolderOpen, Upload, Download, Eye, FileText, Video, Image, Archive, Search, Filter, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Resource {
  id: string;
  name: string;
  type: 'document' | 'video' | 'image' | 'archive';
  size: string;
  uploadDate: string;
  downloads: number;
  category: string;
}

export default function Resources() {
  const { language } = useLanguage();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const resources: Resource[] = [
    {
      id: "1",
      name: "Cours - Équations du second degré.pdf",
      type: "document",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      downloads: 127,
      category: "Cours"
    },
    {
      id: "2",
      name: "Live - Fonctions logarithmiques.mp4",
      type: "video", 
      size: "156 MB",
      uploadDate: "2024-01-12",
      downloads: 89,
      category: "Lives"
    },
    {
      id: "3",
      name: "Exercices - Dérivées.pdf",
      type: "document",
      size: "1.8 MB", 
      uploadDate: "2024-01-10",
      downloads: 156,
      category: "Exercices"
    },
    {
      id: "4",
      name: "Schéma - Géométrie analytique.png",
      type: "image",
      size: "892 KB",
      uploadDate: "2024-01-08",
      downloads: 73,
      category: "Supports"
    },
    {
      id: "5",
      name: "Corrections - Contrôle janvier.zip",
      type: "archive",
      size: "4.2 MB",
      uploadDate: "2024-01-05",
      downloads: 234,
      category: "Corrections"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return FileText;
      case 'video': return Video;
      case 'image': return Image;
      case 'archive': return Archive;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document': return 'bg-blue-100 text-blue-800';
      case 'video': return 'bg-purple-100 text-purple-800';
      case 'image': return 'bg-green-100 text-green-800';
      case 'archive': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || resource.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
            Bibliothèque numérique
          </h1>
          <p className="text-muted-foreground">
            Gérez vos documents, vidéos et ressources pédagogiques
          </p>
        </div>

        {/* Statistiques des ressources */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center">
                <FolderOpen className="h-8 w-8 text-teal-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total fichiers</p>
                  <p className="text-2xl font-bold">{resources.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center">
                <Download className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Téléchargements</p>
                  <p className="text-2xl font-bold">679</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center">
                <Video className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Lives archivés</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Documents</p>
                  <p className="text-2xl font-bold">28</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Barre d'actions */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 lg:items-end">
              {/* Recherche */}
              <div className="flex-1">
                <Label htmlFor="search">Rechercher un fichier</Label>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Nom du fichier..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Filtre catégorie */}
              <div>
                <Label>Catégorie</Label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="mt-2 w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    <SelectItem value="Cours">Cours</SelectItem>
                    <SelectItem value="Exercices">Exercices</SelectItem>
                    <SelectItem value="Lives">Lives</SelectItem>
                    <SelectItem value="Supports">Supports</SelectItem>
                    <SelectItem value="Corrections">Corrections</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bouton upload */}
              <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Ajouter un fichier
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Ajouter un nouveau fichier</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="file">Fichier</Label>
                      <Input id="file" type="file" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="category">Catégorie</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cours">Cours</SelectItem>
                          <SelectItem value="exercices">Exercices</SelectItem>
                          <SelectItem value="lives">Lives</SelectItem>
                          <SelectItem value="supports">Supports</SelectItem>
                          <SelectItem value="corrections">Corrections</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex space-x-2 pt-4">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setIsUploadDialogOpen(false)}
                      >
                        Annuler
                      </Button>
                      <Button 
                        className="flex-1 bg-teal-600 hover:bg-teal-700"
                        onClick={() => setIsUploadDialogOpen(false)}
                      >
                        Ajouter
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Liste des ressources */}
        <Card>
          <CardHeader>
            <CardTitle>Mes ressources ({filteredResources.length})</CardTitle>
            <CardDescription>
              Bibliothèque de documents et supports pédagogiques
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="grid" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="grid">Vue grille</TabsTrigger>
                <TabsTrigger value="list">Vue liste</TabsTrigger>
              </TabsList>

              <TabsContent value="grid" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredResources.map((resource) => {
                    const IconComponent = getTypeIcon(resource.type);
                    return (
                      <Card key={resource.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                                <IconComponent className="w-5 h-5 text-white" />
                              </div>
                              <Badge className={getTypeColor(resource.type)}>
                                {resource.category}
                              </Badge>
                            </div>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                          
                          <h3 className="font-medium text-sm mb-2 line-clamp-2">{resource.name}</h3>
                          
                          <div className="space-y-2 text-xs text-muted-foreground">
                            <div className="flex justify-between">
                              <span>Taille: {resource.size}</span>
                              <span>{resource.downloads} téléchargements</span>
                            </div>
                            <div>Ajouté le {resource.uploadDate}</div>
                          </div>
                          
                          <div className="flex space-x-2 mt-4">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Eye className="w-4 h-4 mr-1" />
                              Voir
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Download className="w-4 h-4 mr-1" />
                              Télécharger
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="list" className="space-y-3 mt-6">
                {filteredResources.map((resource) => {
                  const IconComponent = getTypeIcon(resource.type);
                  return (
                    <div key={resource.id} className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center space-x-4 flex-1 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{resource.name}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <Badge className={getTypeColor(resource.type)} variant="outline">
                              {resource.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{resource.size}</span>
                            <span className="text-xs text-muted-foreground">{resource.downloads} téléchargements</span>
                            <span className="text-xs text-muted-foreground">Ajouté le {resource.uploadDate}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`flex items-center space-x-2 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}