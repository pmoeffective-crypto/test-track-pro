
import { Home, BookOpen, Brain, Library, Bell, Settings, BarChart3, MessageSquare, Video } from "lucide-react";
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
import { useNavigate, useLocation } from "react-router-dom";

export function AppSidebar() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: t('dashboard'),
      url: "/",
      icon: Home,
      id: "dashboard"
    },
    {
      title: t('mcqTests'),
      url: "/mcq",
      icon: BookOpen,
      id: "mcq"
    },
    {
      title: t('exams'),
      url: "/exams",
      icon: BarChart3,
      id: "exams"
    },
    {
      title: t('library'),
      url: "/library",
      icon: Library,
      id: "library"
    },
    {
      title: t('aiAssistant'),
      url: "/assistant",
      icon: Brain,
      id: "assistant"
    },
    {
      title: "Forum",
      url: "/forum",
      icon: MessageSquare,
      id: "forum"
    },
    {
      title: "Lives",
      url: "/lives",
      icon: Video,
      id: "lives"
    },
  ];

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
          <SidebarGroupLabel>Modules principaux</SidebarGroupLabel>
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
            <span className="text-white font-semibold text-xs">ME</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Mon Étudiant</p>
            <p className="text-xs text-muted-foreground truncate">etudiant@exemple.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
