
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { User, Shield, Bell, Palette, Globe, Save } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function SettingsModule() {
  const { t, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState("profile");

  const [profileData, setProfileData] = useState({
    firstName: "Ahmed",
    lastName: "Benali",
    email: "ahmed.benali@exemple.com",
    phone: "+212 6 12 34 56 78",
    dateOfBirth: "1998-05-15",
    city: "Rabat",
    level: "Terminale"
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    autoSave: true,
    showAdvancedStats: false,
    emailDigest: true,
    language: language
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    loginAlerts: true
  });

  const updateProfile = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updatePreferences = (field: string, value: boolean | string) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateSecurity = (field: string, value: boolean | number) => {
    setSecuritySettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveSettings = () => {
    console.log('Paramètres sauvegardés');
    // Logique de sauvegarde
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
          {t('settings')}
        </h1>
        <p className="text-muted-foreground">
          {t('settingsDescription')}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: "profile", label: t('profile'), icon: User },
          { id: "preferences", label: t('preferences'), icon: Palette },
          { id: "security", label: t('security'), icon: Shield },
          { id: "notifications", label: t('notifications'), icon: Bell }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            className={`flex-1 ${activeTab === tab.id ? 'bg-white shadow-sm' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </Button>
        ))}
      </div>

      {activeTab === "profile" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-6 h-6 text-teal-600" />
              {t('personalInformation')}
            </CardTitle>
            <CardDescription>
              {t('personalInformationDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t('firstName')}</Label>
                <Input
                  id="firstName"
                  value={profileData.firstName}
                  onChange={(e) => updateProfile('firstName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t('lastName')}</Label>
                <Input
                  id="lastName"
                  value={profileData.lastName}
                  onChange={(e) => updateProfile('lastName', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => updateProfile('email', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">{t('phone')}</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => updateProfile('phone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">{t('dateOfBirth')}</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) => updateProfile('dateOfBirth', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">{t('city')}</Label>
                <Input
                  id="city"
                  value={profileData.city}
                  onChange={(e) => updateProfile('city', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">{t('educationLevel')}</Label>
                <Input
                  id="level"
                  value={profileData.level}
                  onChange={(e) => updateProfile('level', e.target.value)}
                />
              </div>
            </div>

            <Button onClick={saveSettings} className="bg-teal-600 hover:bg-teal-700">
              <Save className="w-4 h-4 mr-2" />
              {t('saveChanges')}
            </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === "preferences" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-6 h-6 text-teal-600" />
              {t('applicationPreferences')}
            </CardTitle>
            <CardDescription>
              {t('applicationPreferencesDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Langue */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Globe className="w-5 h-5" />
                {t('language')}
              </h4>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{t('interfaceLanguage')}</p>
                  <p className="text-sm text-muted-foreground">{t('languageDescription')}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={language === 'fr' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLanguage('fr')}
                  >
                    Français
                  </Button>
                  <Button
                    variant={language === 'ar' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLanguage('ar')}
                  >
                    العربية
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Apparence */}
            <div className="space-y-4">
              <h4 className="font-semibold">{t('appearance')}</h4>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{t('darkMode')}</p>
                  <p className="text-sm text-muted-foreground">{t('darkModeDescription')}</p>
                </div>
                <Switch
                  checked={preferences.darkMode}
                  onCheckedChange={(checked) => updatePreferences('darkMode', checked)}
                />
              </div>
            </div>

            <Separator />

            {/* Fonctionnalités */}
            <div className="space-y-4">
              <h4 className="font-semibold">{t('features')}</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{t('autoSave')}</p>
                    <p className="text-sm text-muted-foreground">{t('autoSaveDescription')}</p>
                  </div>
                  <Switch
                    checked={preferences.autoSave}
                    onCheckedChange={(checked) => updatePreferences('autoSave', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{t('advancedStatistics')}</p>
                    <p className="text-sm text-muted-foreground">{t('advancedStatisticsDescription')}</p>
                  </div>
                  <Switch
                    checked={preferences.showAdvancedStats}
                    onCheckedChange={(checked) => updatePreferences('showAdvancedStats', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{t('weeklyDigest')}</p>
                    <p className="text-sm text-muted-foreground">{t('weeklyDigestDescription')}</p>
                  </div>
                  <Switch
                    checked={preferences.emailDigest}
                    onCheckedChange={(checked) => updatePreferences('emailDigest', checked)}
                  />
                </div>
              </div>
            </div>

            <Button onClick={saveSettings} className="w-full bg-teal-600 hover:bg-teal-700">
              <Save className="w-4 h-4 mr-2" />
              {t('savePreferences')}
            </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === "security" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-teal-600" />
              {t('securitySettings')}
            </CardTitle>
            <CardDescription>
              {t('securitySettingsDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{t('twoFactorAuth')}</p>
                  <p className="text-sm text-muted-foreground">{t('twoFactorAuthDescription')}</p>
                </div>
                <Switch
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => updateSecurity('twoFactorAuth', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{t('loginAlerts')}</p>
                  <p className="text-sm text-muted-foreground">{t('loginAlertsDescription')}</p>
                </div>
                <Switch
                  checked={securitySettings.loginAlerts}
                  onCheckedChange={(checked) => updateSecurity('loginAlerts', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">{t('sessionTimeout')}</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => updateSecurity('sessionTimeout', parseInt(e.target.value))}
                  min="15"
                  max="120"
                />
                <p className="text-xs text-muted-foreground">{t('sessionTimeoutDescription')}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-semibold">{t('passwordSecurity')}</h4>
              <Button variant="outline" className="w-full">
                {t('changePassword')}
              </Button>
            </div>

            <Button onClick={saveSettings} className="w-full bg-teal-600 hover:bg-teal-700">
              <Save className="w-4 h-4 mr-2" />
              {t('saveSecuritySettings')}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
