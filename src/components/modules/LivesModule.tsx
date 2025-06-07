import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Video, 
  Plus, 
  Search, 
  Calendar, 
  Clock, 
  Users, 
  Play, 
  Radio,
  Archive,
  Eye,
  Download
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface LiveSession {
  id: number;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  category: string;
  scheduledDate: string;
  duration: string;
  status: "live" | "upcoming" | "completed";
  viewers: number;
  isRecorded: boolean;
  thumbnail: string;
}

export function LivesModule() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("en-cours");
  const [searchTerm, setSearchTerm] = useState("");

  const mockLives: LiveSession[] = [
    {
      id: 1,
      title: "Résolution d'équations du second degré",
      description: "Cours en direct sur les méthodes de résolution d'équations quadratiques avec exercices pratiques",
      instructor: "Prof. Dubois",
      instructorAvatar: "/placeholder-avatar.jpg",
      category: "Mathématiques",
      scheduledDate: "2024-01-15T14:00:00",
      duration: "1h 30min",
      status: "live",
      viewers: 45,
      isRecorded: true,
      thumbnail: "/placeholder-thumbnail.jpg"
    },
    {
      id: 2,
      title: "Introduction à la chimie organique",
      description: "Découverte des bases de la chimie organique et des principales familles de molécules",
      instructor: "Dr. Martin",
      instructorAvatar: "/placeholder-avatar.jpg",
      category: "Chimie",
      scheduledDate: "2024-01-15T16:00:00",
      duration: "2h",
      status: "upcoming",
      viewers: 0,
      isRecorded: true,
      thumbnail: "/placeholder-thumbnail.jpg"
    },
    {
      id: 3,
      title: "Méthodologie de dissertation",
      description: "Techniques et astuces pour réussir ses dissertations en français",
      instructor: "Mme. Leroy",
      instructorAvatar: "/placeholder-avatar.jpg",
      category: "Français",
      scheduledDate: "2024-01-14T10:00:00",
      duration: "1h 15min",
      status: "completed",
      viewers: 67,
      isRecorded: true,
      thumbnail: "/placeholder-thumbnail.jpg"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return <Badge className="bg-red-500 text-white animate-pulse">🔴 En direct</Badge>;
      case "upcoming":
        return <Badge className="bg-blue-500 text-white">📅 À venir</Badge>;
      case "completed":
        return <Badge className="bg-gray-500 text-white">✅ Terminé</Badge>;
      default:
        return null;
    }
  };

  const LiveCard = ({ live }: { live: LiveSession }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="relative">
          <div className="aspect-video bg-gradient-to-br from-teal-100 to-blue-100 rounded-t-lg flex items-center justify-center">
            <Video className="w-12 h-12 text-teal-600" />
          </div>
          <div className="absolute top-2 right-2">
            {getStatusBadge(live.status)}
          </div>
          {live.status === "live" && (
            <div className={`absolute bottom-2 flex items-center gap-2 bg-black/70 text-white px-2 py-1 rounded text-xs ${language === 'ar' ? 'right-2' : 'left-2'}`}>
              <Users className="w-3 h-3" />
              <span>{live.viewers} spectateurs</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className={`flex items-start gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <Avatar className="w-10 h-10">
              <AvatarImage src={live.instructorAvatar} />
              <AvatarFallback>{live.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold line-clamp-2 mb-1">{live.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {live.description}
              </p>
              
              <div className={`flex items-center gap-4 text-xs text-muted-foreground mb-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <span className="font-medium">{live.instructor}</span>
                <Badge variant="outline">{live.category}</Badge>
                <div className={`flex items-center gap-1 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <Clock className="w-3 h-3" />
                  <span>{live.duration}</span>
                </div>
              </div>
              
              <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-1 text-xs text-muted-foreground ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(live.scheduledDate).toLocaleDateString('fr-FR')}</span>
                  <span>{new Date(live.scheduledDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                
                <Button size="sm" variant={live.status === "live" ? "default" : "outline"}>
                  {live.status === "live" && <Radio className="w-4 h-4 mr-2" />}
                  {live.status === "upcoming" && <Calendar className="w-4 h-4 mr-2" />}
                  {live.status === "completed" && <Play className="w-4 h-4 mr-2" />}
                  {live.status === "live" ? "Rejoindre" : 
                   live.status === "upcoming" ? "Programmer" : "Regarder"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const liveLives = mockLives.filter(live => live.status === "live");
  const upcomingLives = mockLives.filter(live => live.status === "upcoming");
  const completedLives = mockLives.filter(live => live.status === "completed");

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
          Lives & Rediffusions
        </h1>
        <p className="text-muted-foreground">
          Suivez les cours en direct et accédez à la bibliothèque vidéo
        </p>
      </div>

      {/* Barre de recherche et actions */}
      <div className={`flex flex-col sm:flex-row gap-4 ${language === 'ar' ? 'sm:flex-row-reverse' : ''}`}>
        <div className="flex-1">
          <div className="relative">
            <Search className={`absolute top-2.5 w-4 h-4 text-muted-foreground ${language === 'ar' ? 'right-3' : 'left-3'}`} />
            <Input
              placeholder="Rechercher un live ou une rediffusion..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={language === 'ar' ? 'pr-10' : 'pl-10'}
            />
          </div>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Programmer un live
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="en-cours" className="relative">
            En cours
            {liveLives.length > 0 && (
              <Badge className="ml-2 bg-red-500 text-white text-xs">
                {liveLives.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="a-venir">
            À venir ({upcomingLives.length})
          </TabsTrigger>
          <TabsTrigger value="passes">
            Passés ({completedLives.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="en-cours" className="space-y-4">
          {liveLives.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveLives.map(live => (
                <LiveCard key={live.id} live={live} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Radio className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Aucun live en cours</h3>
                <p className="text-muted-foreground mb-6">
                  Il n'y a actuellement aucune session en direct. Consultez les lives à venir ou la bibliothèque de rediffusions.
                </p>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Voir les lives à venir
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="a-venir" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingLives.map(live => (
              <LiveCard key={live.id} live={live} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="passes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedLives.map(live => (
              <LiveCard key={live.id} live={live} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}