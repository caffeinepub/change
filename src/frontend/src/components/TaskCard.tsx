import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Coins, CheckCircle2 } from 'lucide-react';

interface TaskCardProps {
  task: {
    id: number;
    description: string;
    reward: number;
    completed: boolean;
  };
  onComplete: (taskId: number) => void;
  isCompleting: boolean;
}

export default function TaskCard({ task, onComplete, isCompleting }: TaskCardProps) {
  return (
    <Card className={`transition-all ${task.completed ? 'opacity-60' : 'hover:shadow-md border-border/50'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <img
              src="/assets/generated/task-icon.dim_64x64.png"
              alt="Task"
              className="w-10 h-10 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base leading-snug">{task.description}</CardTitle>
            </div>
          </div>
          {task.completed && (
            <CheckCircle2 className="w-5 h-5 text-chart-2 flex-shrink-0" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <Badge className="bg-gradient-to-r from-chart-1 to-chart-4 text-white border-0">
            <Coins className="w-3 h-3 mr-1" />
            +{task.reward} Coins
          </Badge>
          <Button
            onClick={() => onComplete(task.id)}
            disabled={task.completed || isCompleting}
            size="sm"
            className={
              task.completed
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-gradient-to-r from-chart-1 to-chart-4 hover:from-chart-1/90 hover:to-chart-4/90 text-white'
            }
          >
            {task.completed ? 'Completed' : isCompleting ? 'Completing...' : 'Complete Task'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
