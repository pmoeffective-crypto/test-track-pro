
import { Home, BookOpen, Brain, Library, Bell, Settings, BarChart3, MessageSquare, Video, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserRole } from "@/contexts/UserRoleContext";
import { useNavigate, useLocation } from "react-router-dom";
import { UserSelector } from "@/components/UserSelector";

export function AppSidebar() {
const { t } = useLanguage();
  const { role, userName } = useUserRole();
  const navigate = useNavigate();
  const location = useLocation();

  // Menu items adaptés selon le rôle
  const getMenuItems = () => {
    const baseItems = [
      {
        title: t('dashboard'),
        url: "/",
        icon: Home,
        id: "dashboard",
        roles: ['admin', 'teacher', 'student', 'parent']
      }
    ];

    const roleSpecificItems = {
      admin: [
        { title: "Gestion Utilisateurs", url: "/admin/users", icon: Users, id: "users" },
        { title: "Modération", url: "/admin/moderation", icon: Shield, id: "moderation" },
        { title: t('library'), url: "/library", icon: Library, id: "library" },
        { title: "Forum", url: "/forum", icon: MessageSquare, id: "forum" },
        { title: "Lives", url: "/lives", icon: Video, id: "lives" }
      ],
      teacher: [
        { title: "Mes Cours", url: "/teacher/courses", icon: BookOpen, id: "courses" },
        { title: t('mcqTests'), url: "/mcq", icon: BarChart3, id: "mcq" },
        { title: t('library'), url: "/library", icon: Library, id: "library" },
        { title: "Forum", url: "/forum", icon: MessageSquare, id: "forum" },
        { title: "Lives", url: "/lives", icon: Video, id: "lives" }
      ],
      student: [
        { title: t('mcqTests'), url: "/mcq", icon: BookOpen, id: "mcq" },
        { title: t('exams'), url: "/exams", icon: BarChart3, id: "exams" },
        { title: t('library'), url: "/library", icon: Library, id: "library" },
        { title: t('aiAssistant'), url: "/assistant", icon: Brain, id: "assistant" },
        { title: "Forum", url: "/forum", icon: MessageSquare, id: "forum" },
        { title: "Lives", url: "/lives", icon: Video, id: "lives" }
      ],
      parent: [
        { title: "Mes Enfants", url: "/parent/children", icon: Users, id: "children" },
        { title: "Communication", url: "/parent/messages", icon: MessageSquare, id: "messages" },
        { title: "Lives Parents", url: "/lives", icon: Video, id: "lives" },
        { title: "Forum Parents", url: "/forum", icon: MessageSquare, id: "parent-forum" }
      ]
    };

    return [...baseItems, ...(roleSpecificItems[role] || roleSpecificItems.student)];
  };

  const menuItems = getMenuItems();

  const preferenceItems = [
    {
      title: t('notifications'),
      url: "/notifications",
      icon: Bell,
      id: "notifications"
    },
    {
      title: t('settings'),
      url: "/settings",
      icon: Settings,
      id: "settings"
    },
  ];

  const handleNavigation = (url: string) => {
    navigate(url);
  };

  const isActive = (url: string) => {
    return location.pathname === url;
  };

  return (
    <Sidebar className="border-r-0 bg-white/50 backdrop-blur-sm">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/58230061-e916-401f-819d-14d1f2264c70.png" 
            alt="ZIDNEY Logo" 
            className="h-8 w-auto"
          />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {role === 'admin' ? 'Administration' : 
             role === 'teacher' ? 'Enseignement' :
             role === 'parent' ? 'Suivi familial' : 'Modules principaux'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={isActive(item.url)}
                    onClick={() => handleNavigation(item.url)}
                    className="transition-all duration-200 hover:bg-teal-50 data-[active=true]:bg-gradient-to-r data-[active=true]:from-teal-600 data-[active=true]:to-teal-700 data-[active=true]:text-white"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Préférences</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {preferenceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={isActive(item.url)}
                    onClick={() => handleNavigation(item.url)}
                    className="transition-all duration-200 hover:bg-teal-50 data-[active=true]:bg-gradient-to-r data-[active=true]:from-teal-600 data-[active=true]:to-teal-700 data-[active=true]:text-white"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-xs">
              {role === 'admin' ? 'AD' : 
               role === 'teacher' ? 'PR' :
               role === 'parent' ? 'PA' : 'ET'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {userName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {role === 'admin' ? 'Administrateur' : 
               role === 'teacher' ? 'Professeur' :
               role === 'parent' ? 'Parent' : 'Étudiant'}
            </p>
          </div>
          <UserSelector />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
