
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: "blue" | "green" | "purple" | "orange";
  action: () => void;
}

const colorVariants = {
  blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
  green: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
  purple: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
  orange: "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
};

export function QuickAccessCard({ title, description, icon: Icon, color, action }: QuickAccessCardProps) {
  const gradientColors = colorVariants[color];

  return (
    <Card 
      className="border-0 cursor-pointer transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-lg"
      onClick={action}
    >
      <CardContent className="p-6">
        <div className={`w-12 h-12 bg-gradient-to-r ${gradientColors} rounded-lg flex items-center justify-center mb-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
