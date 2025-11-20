
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { UserRoleProvider } from "@/contexts/UserRoleContext";
import Index from "./pages/Index";
import MCQTests from "./pages/MCQTests";
import Exams from "./pages/Exams";
import Library from "./pages/Library";
import Assistant from "./pages/Assistant";
import Forum from "./pages/Forum";
import Lives from "./pages/Lives";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import UserManagement from "./pages/admin/UserManagement";
import RoleManagement from "./pages/admin/RoleManagement";
import ContentManagement from "./pages/admin/ContentManagement";
import SystemSettings from "./pages/admin/SystemSettings";
import ContentCreation from "./pages/teacher/ContentCreation";
import StudentTracking from "./pages/teacher/StudentTracking";
import Resources from "./pages/teacher/Resources";

const queryClient = new QueryClient();

// Main App component with routing configuration
const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <UserRoleProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/mcq" element={<MCQTests />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/library" element={<Library />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/lives" element={<Lives />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/roles" element={<RoleManagement />} />
            <Route path="/admin/content" element={<ContentManagement />} />
            <Route path="/admin/system" element={<SystemSettings />} />
            <Route path="/teacher/content" element={<ContentCreation />} />
            <Route path="/teacher/students" element={<StudentTracking />} />
            <Route path="/teacher/resources" element={<Resources />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserRoleProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
