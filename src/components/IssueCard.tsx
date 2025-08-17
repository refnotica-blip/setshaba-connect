import React from "react";
import { Issue, categoryIcons, statusColors } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, MapPin } from "lucide-react";

interface IssueCardProps {
  issue: Issue;
  onClick?: () => void;
  showProgress?: boolean;
}

export const IssueCard: React.FC<IssueCardProps> = ({ 
  issue, 
  onClick,
  showProgress = true 
}) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 ${
        issue.isUrgent 
          ? 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 shadow-lg shadow-red-200 dark:shadow-red-900/20' 
          : 'bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-lg hover:shadow-xl'
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <span className="text-2xl">{categoryIcons[issue.category]}</span>
            </div>
            <div>
              <CardTitle className={`text-xl font-bold ${issue.isUrgent ? 'text-red-700 dark:text-red-300' : 'text-gray-900 dark:text-white'}`}>
                {issue.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{issue.location}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge 
              className={`px-3 py-1 text-xs font-semibold ${
                issue.status === 'Resolved' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                  : issue.status === 'In Progress'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
              }`}
            >
              {issue.status}
            </Badge>
            {issue.isUrgent && (
              <Badge className="bg-red-500 text-white animate-pulse">
                Urgent
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{issue.description}</p>
        
        {showProgress && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{issue.progress}%</span>
            </div>
            <Progress 
              value={issue.progress}
              className={`h-3 ${
                issue.progress === 100 ? 'bg-green-100' : 
                issue.progress > 50 ? 'bg-yellow-100' : 'bg-blue-100'
              }`}
            />
          </div>
        )}
        
        <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Reported {formatDate(issue.reportedAt)} at {formatTime(issue.reportedAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
};