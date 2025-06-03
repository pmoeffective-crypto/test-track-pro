
import { Home, BookOpen, Brain, Library, Bell, Settings, BarChart3 } from "lucide-react";
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

export function AppSidebar() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const { t } = useLanguage();

  const menuItems = [
    {
      title: t('dashboard'),
      url: "#dashboard",
      icon: Home,
      id: "dashboard"
    },
    {
      title: t('mcqTests'),
      url: "#mcq",
      icon: BookOpen,
      id: "mcq"
    },
    {
      title: t('exams'),
      url: "#exams",
      icon: BarChart3,
      id: "exams"
    },
    {
      title: t('library'),
      url: "#library",
      icon: Library,
      id: "library"
    },
    {
      title: t('aiAssistant'),
      url: "#assistant",
      icon: Brain,
      id: "assistant"
    },
  ];

  const preferenceItems = [
    {
      title: t('notifications'),
      url: "#notifications",
      icon: Bell,
      id: "notifications"
    },
    {
      title: t('settings'),
      url: "#settings",
      icon: Settings,
      id: "settings"
    },
  ];

  return (
    <Sidebar className="border-r-0 bg-white/50 backdrop-blur-sm">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-teal-800 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">Z</span>
          </div>
          <div>
            <h2 className="font-semibold text-sm">{t('platformName')}</h2>
            <p className="text-xs text-muted-foreground">{t('platformSubtitle')}</p>
          </div>
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
                    asChild
                    isActive={activeItem === item.id}
                    onClick={() => setActiveItem(item.id)}
                    className="transition-all duration-200 hover:bg-teal-50 data-[active=true]:bg-gradient-to-r data-[active=true]:from-teal-600 data-[active=true]:to-teal-700 data-[active=true]:text-white"
                  >
                    <a href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
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
                    asChild
                    isActive={activeItem === item.id}
                    onClick={() => setActiveItem(item.id)}
                    className="transition-all duration-200 hover:bg-teal-50 data-[active=true]:bg-gradient-to-r data-[active=true]:from-teal-600 data-[active=true]:to-teal-700 data-[active=true]:text-white"
                  >
                    <a href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
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
