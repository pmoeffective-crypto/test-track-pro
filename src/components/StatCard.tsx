
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  trend: string;
  color: "blue" | "green" | "purple" | "orange";
}

const colorVariants = {
  blue: "bg-blue-500 text-blue-600 bg-blue-50",
  green: "bg-green-500 text-green-600 bg-green-50",
  purple: "bg-purple-500 text-purple-600 bg-purple-50",
  orange: "bg-orange-500 text-orange-600 bg-orange-50"
};

export function StatCard({ title, value, subtitle, icon: Icon, trend, color }: StatCardProps) {
  const [bgColor, textColor, cardBg] = colorVariants[color].split(" ");

  return (
    <Card className={`${cardBg} border-0 shadow-sm hover:shadow-md transition-shadow duration-200`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <span className={`text-sm font-medium ${textColor}`}>
            {trend}
          </span>
          <span className="text-xs text-muted-foreground ml-1">
            par rapport au mois dernier
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
