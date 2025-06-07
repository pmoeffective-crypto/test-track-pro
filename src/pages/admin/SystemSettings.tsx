import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Palette, Shield, Bell, Database, Globe, Save, Upload, Download } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SystemSettings() {
  const { language } = useLanguage();
  const [settings, setSettings] = useState({
    siteName: "ZIDNEY",
    siteDescription: "Plateforme e-learning et tests en ligne",
    maintenance: false,
    registrationOpen: true,
    emailNotifications: true,
    forumModeration: true,
    livesEnabled: true,
    mcqEnabled: true,
    libraryEnabled: true,
    maxFileSize: "10",
    sessionTimeout: "60",
    language: "fr",
    timezone: "Europe/Paris"
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
            Paramètres système
          </h1>
          <p className="text-muted-foreground">
            Configuration générale de la plateforme
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="space-y-6">
              {/* Informations générales */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Informations générales
                  </CardTitle>
                  <CardDescription>Configuration de base de la plateforme</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="siteName">Nom de la plateforme</Label>
                      <Input
                        id="siteName"
                        value={settings.siteName}
                        onChange={(e) => handleSettingChange('siteName', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="language">Langue par défaut</Label>
                      <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="ar">العربية</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="siteDescription">Description</Label>
                    <Textarea
                      id="siteDescription"
                      value={settings.siteDescription}
                      onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="timezone">Fuseau horaire</Label>
                      <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Europe/Paris">Europe/Paris (GMT+1)</SelectItem>
                          <SelectItem value="Africa/Algiers">Africa/Algiers (GMT+1)</SelectItem>
                          <SelectItem value="Africa/Cairo">Africa/Cairo (GMT+2)</SelectItem>
                          <SelectItem value="Europe/London">Europe/London (GMT+0)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="sessionTimeout">Timeout session (minutes)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personnalisation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Personnalisation
                  </CardTitle>
                  <CardDescription>Apparence et branding</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Logo principal</Label>
                      <div className="mt-2 p-4 border-2 border-dashed rounded-lg text-center">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <Button variant="outline" size="sm">
                          Télécharger logo
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label>Favicon</Label>
                      <div className="mt-2 p-4 border-2 border-dashed rounded-lg text-center">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <Button variant="outline" size="sm">
                          Télécharger favicon
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label>Image de fond</Label>
                      <div className="mt-2 p-4 border-2 border-dashed rounded-lg text-center">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <Button variant="outline" size="sm">
                          Télécharger image
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="modules">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des modules</CardTitle>
                <CardDescription>Activez ou désactivez les fonctionnalités</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Module QCM</h4>
                        <p className="text-sm text-muted-foreground">Questionnaires à choix multiples</p>
                      </div>
                      <Switch
                        checked={settings.mcqEnabled}
                        onCheckedChange={(checked) => handleSettingChange('mcqEnabled', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Module Lives</h4>
                        <p className="text-sm text-muted-foreground">Sessions en direct</p>
                      </div>
                      <Switch
                        checked={settings.livesEnabled}
                        onCheckedChange={(checked) => handleSettingChange('livesEnabled', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Bibliothèque</h4>
                        <p className="text-sm text-muted-foreground">Ressources pédagogiques</p>
                      </div>
                      <Switch
                        checked={settings.libraryEnabled}
                        onCheckedChange={(checked) => handleSettingChange('libraryEnabled', checked)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Forums</h4>
                        <p className="text-sm text-muted-foreground">Discussions communautaires</p>
                      </div>
                      <Switch
                        checked={settings.forumModeration}
                        onCheckedChange={(checked) => handleSettingChange('forumModeration', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Inscriptions</h4>
                        <p className="text-sm text-muted-foreground">Nouveaux comptes utilisateur</p>
                      </div>
                      <Switch
                        checked={settings.registrationOpen}
                        onCheckedChange={(checked) => handleSettingChange('registrationOpen', checked)}
                      />
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Taille max fichiers (MB)</h4>
                      <Input
                        type="number"
                        value={settings.maxFileSize}
                        onChange={(e) => handleSettingChange('maxFileSize', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Paramètres de sécurité
                </CardTitle>
                <CardDescription>Configuration de la sécurité système</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Politique de mot de passe</h4>
                      <div className="space-y-2">
                        <Label>Longueur minimale</Label>
                        <Input type="number" defaultValue="8" />
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-3">Authentification à deux facteurs</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Obligatoire pour les admins</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Tentatives de connexion</h4>
                      <div className="space-y-2">
                        <Label>Max tentatives avant blocage</Label>
                        <Input type="number" defaultValue="5" />
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Logs de sécurité</h4>
                      <div className="space-y-2">
                        <Label>Durée de conservation (jours)</Label>
                        <Input type="number" defaultValue="90" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications système
                </CardTitle>
                <CardDescription>Configuration des alertes et notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Notifications email</h4>
                        <p className="text-sm text-muted-foreground">Alertes par email</p>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                      />
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Serveur SMTP</h4>
                      <div className="space-y-2">
                        <Input placeholder="smtp.exemple.com" />
                        <div className="grid grid-cols-2 gap-2">
                          <Input placeholder="Port" />
                          <Input placeholder="Utilisateur" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-3">Types de notifications</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Nouveaux utilisateurs</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Contenu signalé</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Erreurs système</span>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Maintenance et sauvegarde
                </CardTitle>
                <CardDescription>Outils de maintenance système</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-3">Mode maintenance</h4>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm">Activer le mode maintenance</span>
                        <Switch
                          checked={settings.maintenance}
                          onCheckedChange={(checked) => handleSettingChange('maintenance', checked)}
                        />
                      </div>
                      {settings.maintenance && (
                        <div className="p-3 bg-orange-50 border border-orange-200 rounded text-sm">
                          <Badge variant="outline" className="mb-2">Actif</Badge>
                          <p>La plateforme est en mode maintenance. Seuls les administrateurs peuvent y accéder.</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Nettoyage automatique</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          <Database className="w-4 h-4 mr-2" />
                          Nettoyer les logs anciens
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Database className="w-4 h-4 mr-2" />
                          Optimiser la base de données
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Sauvegarde</h4>
                      <div className="space-y-2">
                        <Button className="w-full bg-teal-600 hover:bg-teal-700">
                          <Download className="w-4 h-4 mr-2" />
                          Créer une sauvegarde
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Upload className="w-4 h-4 mr-2" />
                          Restaurer une sauvegarde
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Statistiques système</h4>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Espace disque utilisé</span>
                          <span>2.3 GB / 10 GB</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Utilisateurs actifs</span>
                          <span>1,247</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dernière sauvegarde</span>
                          <span>Il y a 2 jours</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bouton de sauvegarde */}
        <div className="flex justify-end">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder les paramètres
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}