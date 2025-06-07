import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Plus, Edit, Trash2, Users, Settings } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
  isSystem: boolean;
}

export default function RoleManagement() {
  const { language } = useLanguage();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const permissions: Permission[] = [
    { id: "user_create", name: "Créer des utilisateurs", description: "Peut créer de nouveaux comptes utilisateur", category: "Utilisateurs" },
    { id: "user_edit", name: "Modifier des utilisateurs", description: "Peut modifier les informations des utilisateurs", category: "Utilisateurs" },
    { id: "user_delete", name: "Supprimer des utilisateurs", description: "Peut supprimer des comptes utilisateur", category: "Utilisateurs" },
    { id: "content_create", name: "Créer du contenu", description: "Peut créer des QCM, examens, lives", category: "Contenu" },
    { id: "content_edit", name: "Modifier du contenu", description: "Peut modifier le contenu existant", category: "Contenu" },
    { id: "content_delete", name: "Supprimer du contenu", description: "Peut supprimer du contenu", category: "Contenu" },
    { id: "forum_moderate", name: "Modérer les forums", description: "Peut modérer les discussions", category: "Forum" },
    { id: "live_manage", name: "Gérer les lives", description: "Peut créer et gérer les sessions live", category: "Lives" },
    { id: "stats_view", name: "Voir les statistiques", description: "Accès aux rapports et statistiques", category: "Statistiques" },
    { id: "system_config", name: "Configuration système", description: "Peut modifier les paramètres système", category: "Système" }
  ];

  const roles: Role[] = [
    {
      id: "admin",
      name: "Administrateur",
      description: "Accès complet à toutes les fonctionnalités",
      userCount: 2,
      permissions: permissions.map(p => p.id),
      isSystem: true
    },
    {
      id: "teacher",
      name: "Professeur",
      description: "Création de contenu et suivi pédagogique",
      userCount: 15,
      permissions: ["content_create", "content_edit", "content_delete", "forum_moderate", "live_manage", "stats_view"],
      isSystem: true
    },
    {
      id: "student",
      name: "Étudiant",
      description: "Accès aux cours et examens",
      userCount: 234,
      permissions: [],
      isSystem: true
    },
    {
      id: "parent",
      name: "Parent",
      description: "Suivi des enfants et communication",
      userCount: 89,
      permissions: [],
      isSystem: true
    },
    {
      id: "moderator",
      name: "Modérateur",
      description: "Modération des forums et contenus",
      userCount: 3,
      permissions: ["forum_moderate", "content_edit"],
      isSystem: false
    }
  ];

  const getPermissionsByCategory = () => {
    const categories: { [key: string]: Permission[] } = {};
    permissions.forEach(permission => {
      if (!categories[permission.category]) {
        categories[permission.category] = [];
      }
      categories[permission.category].push(permission);
    });
    return categories;
  };

  const permissionsByCategory = getPermissionsByCategory();

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
            Gestion des rôles et permissions
          </h1>
          <p className="text-muted-foreground">
            Configurez les rôles utilisateur et leurs permissions
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-sm">
              {roles.length} rôles configurés
            </Badge>
            <Badge variant="outline" className="text-sm">
              {permissions.length} permissions disponibles
            </Badge>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau rôle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Créer un nouveau rôle</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="roleName">Nom du rôle</Label>
                    <Input id="roleName" placeholder="Ex: Modérateur" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="roleDescription">Description</Label>
                    <Textarea 
                      id="roleDescription" 
                      placeholder="Décrivez les responsabilités de ce rôle..." 
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Permissions</Label>
                  <div className="mt-4 space-y-6">
                    {Object.entries(permissionsByCategory).map(([category, perms]) => (
                      <div key={category}>
                        <h4 className="font-medium text-sm text-teal-700 mb-3">{category}</h4>
                        <div className="space-y-3 pl-4">
                          {perms.map((permission) => (
                            <div key={permission.id} className="flex items-start space-x-3">
                              <Checkbox id={permission.id} className="mt-0.5" />
                              <div className="flex-1">
                                <Label htmlFor={permission.id} className="text-sm font-medium">
                                  {permission.name}
                                </Label>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {permission.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
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
                    Créer le rôle
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Liste des rôles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {roles.map((role) => (
            <Card key={role.id} className={`${role.isSystem ? 'border-blue-200 bg-blue-50/30' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{role.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        {role.isSystem && (
                          <Badge variant="outline" className="text-xs">
                            Système
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          <Users className="w-3 h-3 mr-1" />
                          {role.userCount} utilisateurs
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    {!role.isSystem && (
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {role.description}
                </CardDescription>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Permissions ({role.permissions.length})
                  </h4>
                  {role.permissions.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 4).map((permId) => {
                        const perm = permissions.find(p => p.id === permId);
                        return perm ? (
                          <Badge key={permId} variant="secondary" className="text-xs">
                            {perm.name}
                          </Badge>
                        ) : null;
                      })}
                      {role.permissions.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{role.permissions.length - 4} autres
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Aucune permission spécifique</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Permissions disponibles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Permissions disponibles
            </CardTitle>
            <CardDescription>
              Liste complète des permissions configurables
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(permissionsByCategory).map(([category, perms]) => (
                <div key={category}>
                  <h4 className="font-medium text-teal-700 mb-3 flex items-center">
                    <Badge variant="outline" className="mr-2">{category}</Badge>
                    {perms.length} permissions
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {perms.map((permission) => (
                      <div key={permission.id} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-sm">{permission.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {permission.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}