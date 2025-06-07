import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Users, Plus, Edit, Trash2, Search, Filter, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  status: 'active' | 'inactive' | 'suspended';
  lastActivity: string;
  createdAt: string;
}

export default function UserManagement() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const users: User[] = [
    {
      id: "1",
      name: "Amine Belkacem",
      email: "amine@zidney.com",
      role: "admin",
      status: "active",
      lastActivity: "Il y a 2h",
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      name: "Yacine Mansouri",
      email: "yacine@zidney.com",
      role: "teacher",
      status: "active",
      lastActivity: "Il y a 30min",
      createdAt: "2024-02-10"
    },
    {
      id: "3",
      name: "Walid Ahmed",
      email: "walid@student.com",
      role: "student",
      status: "active",
      lastActivity: "Il y a 1h",
      createdAt: "2024-03-05"
    },
    {
      id: "4",
      name: "Salah Ahmed",
      email: "salah@parent.com",
      role: "parent",
      status: "active",
      lastActivity: "Il y a 4h",
      createdAt: "2024-03-05"
    },
    {
      id: "5",
      name: "Sarah Benali",
      email: "sarah@student.com",
      role: "student",
      status: "inactive",
      lastActivity: "Il y a 2 jours",
      createdAt: "2024-02-20"
    }
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'teacher': return 'bg-green-100 text-green-800';
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'parent': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrateur';
      case 'teacher': return 'Professeur';
      case 'student': return 'Étudiant';
      case 'parent': return 'Parent';
      default: return role;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'suspended': return 'Suspendu';
      default: return status;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
            Gestion des utilisateurs
          </h1>
          <p className="text-muted-foreground">
            Créer, modifier et gérer tous les utilisateurs de la plateforme
          </p>
        </div>

        {/* Barre d'actions */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 lg:items-end">
              {/* Recherche */}
              <div className="flex-1">
                <Label htmlFor="search">Rechercher un utilisateur</Label>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Nom, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Filtres */}
              <div className="grid grid-cols-2 gap-4 lg:flex lg:space-x-4">
                <div>
                  <Label>Rôle</Label>
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les rôles</SelectItem>
                      <SelectItem value="admin">Administrateur</SelectItem>
                      <SelectItem value="teacher">Professeur</SelectItem>
                      <SelectItem value="student">Étudiant</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Statut</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="inactive">Inactif</SelectItem>
                      <SelectItem value="suspended">Suspendu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Bouton créer */}
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvel utilisateur
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nom complet</Label>
                      <Input id="name" placeholder="Prénom Nom" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="email@example.com" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="role">Rôle</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Sélectionner un rôle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrateur</SelectItem>
                          <SelectItem value="teacher">Professeur</SelectItem>
                          <SelectItem value="student">Étudiant</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="password">Mot de passe temporaire</Label>
                      <Input id="password" type="password" placeholder="Mot de passe" className="mt-2" />
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
          </CardContent>
        </Card>

        {/* Liste des utilisateurs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Utilisateurs ({filteredUsers.length})
            </CardTitle>
            <CardDescription>
              Gérez les comptes et permissions des utilisateurs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center space-x-4 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getRoleBadgeColor(user.role)}>
                          {getRoleLabel(user.role)}
                        </Badge>
                        <Badge className={getStatusBadgeColor(user.status)}>
                          {getStatusLabel(user.status)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`flex items-center space-x-2 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className="text-right mr-4">
                      <p className="text-sm text-muted-foreground">Dernière activité</p>
                      <p className="text-sm font-medium">{user.lastActivity}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
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