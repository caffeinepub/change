import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertCircle, ListTodo } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function Tasks() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-chart-4 to-chart-5 flex items-center justify-center shadow-md">
          <ListTodo className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Available Tasks</h1>
          <p className="text-muted-foreground">Complete tasks to earn rewards</p>
        </div>
      </div>

      <Alert className="border-chart-1/30 bg-chart-1/5">
        <AlertCircle className="h-4 w-4 text-chart-1" />
        <AlertDescription className="text-foreground">
          Tasks are currently being set up. Check back soon for earning opportunities!
        </AlertDescription>
      </Alert>

      <Card className="border-dashed border-2 border-border/50">
        <CardHeader>
          <CardTitle className="text-center text-muted-foreground">No Tasks Available Yet</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            New tasks will appear here once they are added by administrators.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
