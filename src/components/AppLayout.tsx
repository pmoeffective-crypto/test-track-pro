
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserRole } from "@/contexts/UserRoleContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { t } = useLanguage();
  const { userName, role } = useUserRole();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-teal-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <div className="border-b bg-white/80 backdrop-blur-sm">
            <div className="flex h-16 items-center justify-between px-4">
              <div className="flex items-center space-x-2">
                <SidebarTrigger className="mr-4" />
                <div className="flex items-center space-x-3">
                  <img 
                    src="/lovable-uploads/58230061-e916-401f-819d-14d1f2264c70.png" 
                    alt="ZIDNEY Logo" 
                    className="h-10 w-auto"
                  />
                  <div className="ml-3 hidden sm:block">
                    <p className="text-sm font-medium text-foreground">
                      {t('connectedAs')} {userName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {role === 'admin' ? t('administrator') : 
                       role === 'teacher' ? t('teacher') :
                       role === 'parent' ? t('parent') : t('student')}
                    </p>
                  </div>
                </div>
              </div>
              <LanguageToggle />
            </div>
          </div>
          <div className="flex-1 p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
