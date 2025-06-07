
import { AppLayout } from "@/components/AppLayout";
import { useUserRole } from "@/contexts/UserRoleContext";
import { RoleSelector } from "@/components/RoleSelector";
import { AdminDashboard } from "@/components/dashboards/AdminDashboard";
import { TeacherDashboard } from "@/components/dashboards/TeacherDashboard";
import { StudentDashboard } from "@/components/dashboards/StudentDashboard";
import { ParentDashboard } from "@/components/dashboards/ParentDashboard";

const Index = () => {
  const { role } = useUserRole();

  // Si aucun rôle n'est sélectionné, afficher le sélecteur
  if (!role) {
    return <RoleSelector />;
  }

  // Afficher le dashboard approprié selon le rôle
  const renderDashboard = () => {
    switch (role) {
      case 'admin':
        return <AdminDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'student':
        return <StudentDashboard />;
      case 'parent':
        return <ParentDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <AppLayout>
      {renderDashboard()}
    </AppLayout>
  );
};

export default Index;
