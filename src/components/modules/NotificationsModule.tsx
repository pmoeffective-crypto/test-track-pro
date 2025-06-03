
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { Bell, Settings, CheckCircle, AlertCircle, Info, Trophy, Calendar } from "lucide-react";

export function NotificationsModule() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("notifications");

  const notifications = [
    {
      id: 1,
      type: 'test_reminder',
      title: t('testReminder'),
      message: t('testReminderMessage'),
      time: '2 heures',
      read: false,
      icon: Calendar,
      color: 'blue'
    },
    {
      id: 2,
      type: 'achievement',
      title: t('newAchievement'),
      message: t('achievementMessage'),
      time: '1 jour',
      read: false,
      icon: Trophy,
      color: 'yellow'
    },
    {
      id: 3,
      type: 'recommendation',
      title: t('newRecommendation'),
      message: t('recommendationMessage'),
      time: '2 jours',
      read: true,
      icon: Info,
      color: 'green'
    },
    {
      id: 4,
      type: 'deadline',
      title: t('deadlineWarning'),
      message: t('deadlineMessage'),
      time: '3 jours',
      read: true,
      icon: AlertCircle,
      color: 'red'
    }
  ];

  const notificationSettings = {
    test_reminders: true,
    achievements: true,
    recommendations: false,
    deadlines: true,
    weekly_summary: true,
    email_notifications: false,
    push_notifications: true
  };

  const [settings, setSettings] = useState(notificationSettings);

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const markAsRead = (id: number) => {
    // Fonction pour marquer comme lu
    console.log(`Marqué comme lu: ${id}`);
  };

  const markAllAsRead = () => {
    // Fonction pour marquer tout comme lu
    console.log('Toutes les notifications marquées comme lues');
  };

  const getNotificationIcon = (type: string, color: string) => {
    const iconProps = { className: `w-5 h-5 text-${color}-600` };
    
    switch(type) {
      case 'test_reminder': return <Calendar {...iconProps} />;
      case 'achievement': return <Trophy {...iconProps} />;
      case 'recommendation': return <Info {...iconProps} />;
      case 'deadline': return <AlertCircle {...iconProps} />;
      default: return <Bell {...iconProps} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
          {t('notifications')}
        </h1>
        <p className="text-muted-foreground">
          {t('notificationsDescription')}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: "notifications", label: t('allNotifications') },
          { id: "settings", label: t('notificationSettings') }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            className={`flex-1 ${activeTab === tab.id ? 'bg-white shadow-sm' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {activeTab === "notifications" && (
        <div className="space-y-6">
          {/* Actions */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{t('recentNotifications')}</h2>
            <Button variant="outline" onClick={markAllAsRead}>
              <CheckCircle className="w-4 h-4 mr-2" />
              {t('markAllAsRead')}
            </Button>
          </div>

          {/* Liste des notifications */}
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  !notification.read ? 'border-teal-200 bg-teal-50' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className={`flex items-start gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className={`p-2 rounded-lg bg-white border`}>
                      {getNotificationIcon(notification.type, notification.color)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold">{notification.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {notifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('noNotifications')}</h3>
              <p className="text-muted-foreground">{t('noNotificationsDescription')}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "settings" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-6 h-6 text-teal-600" />
                {t('notificationPreferences')}
              </CardTitle>
              <CardDescription>
                {t('notificationPreferencesDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Types de notifications */}
              <div className="space-y-4">
                <h4 className="font-semibold">{t('notificationTypes')}</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{t('testReminders')}</p>
                      <p className="text-sm text-muted-foreground">{t('testRemindersDesc')}</p>
                    </div>
                    <Switch
                      checked={settings.test_reminders}
                      onCheckedChange={(checked) => updateSetting('test_reminders', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{t('achievements')}</p>
                      <p className="text-sm text-muted-foreground">{t('achievementsDesc')}</p>
                    </div>
                    <Switch
                      checked={settings.achievements}
                      onCheckedChange={(checked) => updateSetting('achievements', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{t('recommendations')}</p>
                      <p className="text-sm text-muted-foreground">{t('recommendationsDesc')}</p>
                    </div>
                    <Switch
                      checked={settings.recommendations}
                      onCheckedChange={(checked) => updateSetting('recommendations', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{t('deadlines')}</p>
                      <p className="text-sm text-muted-foreground">{t('deadlinesDesc')}</p>
                    </div>
                    <Switch
                      checked={settings.deadlines}
                      onCheckedChange={(checked) => updateSetting('deadlines', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{t('weeklySummary')}</p>
                      <p className="text-sm text-muted-foreground">{t('weeklySummaryDesc')}</p>
                    </div>
                    <Switch
                      checked={settings.weekly_summary}
                      onCheckedChange={(checked) => updateSetting('weekly_summary', checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Méthodes de notification */}
              <div className="space-y-4">
                <h4 className="font-semibold">{t('deliveryMethods')}</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{t('emailNotifications')}</p>
                      <p className="text-sm text-muted-foreground">{t('emailNotificationsDesc')}</p>
                    </div>
                    <Switch
                      checked={settings.email_notifications}
                      onCheckedChange={(checked) => updateSetting('email_notifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{t('pushNotifications')}</p>
                      <p className="text-sm text-muted-foreground">{t('pushNotificationsDesc')}</p>
                    </div>
                    <Switch
                      checked={settings.push_notifications}
                      onCheckedChange={(checked) => updateSetting('push_notifications', checked)}
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full bg-teal-600 hover:bg-teal-700">
                {t('saveSettings')}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
