import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, GraduationCap, User, Users } from "lucide-react";
import { useUserRole, UserRole } from "@/contexts/UserRoleContext";

interface SimulatedUser {
  id: string;
  name: string;
  role: UserRole;
  description: string;
  icon: any;
  color: string;
}

const simulatedUsers: SimulatedUser[] = [
  {
    id: 'amine',
    name: 'Amine',
    role: 'admin',
    description: 'Administrateur système',
    icon: Shield,
    color: 'bg-red-500'
  },
  {
    id: 'yacine',
    name: 'Yacine',
    role: 'teacher',
    description: 'Professeur de mathématiques',
    icon: GraduationCap,
    color: 'bg-green-500'
  },
  {
    id: 'walid',
    name: 'Walid',
    role: 'student',
    description: 'Étudiant en 3ème année',
    icon: User,
    color: 'bg-blue-500'
  },
  {
    id: 'salah',
    name: 'Salah',
    role: 'parent',
    description: 'Parent de Walid',
    icon: Users,
    color: 'bg-purple-500'
  }
];

export function UserSelector() {
  const [open, setOpen] = useState(false);
  const { setRole, setUserName } = useUserRole();

  const handleUserSelect = (user: SimulatedUser) => {
    setRole(user.role);
    setUserName(user.name);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          Changer d'utilisateur
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Choisir un utilisateur</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3">
          {simulatedUsers.map((user) => (
            <Card 
              key={user.id} 
              className="cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              onClick={() => handleUserSelect(user)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${user.color} rounded-lg flex items-center justify-center`}>
                    <user.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}