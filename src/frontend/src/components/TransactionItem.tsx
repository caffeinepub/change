import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Coins, Calendar } from 'lucide-react';
import type { Transaction } from '../backend';

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="border-border/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-chart-1/20 to-chart-4/20 flex items-center justify-center flex-shrink-0">
              <Coins className="w-5 h-5 text-chart-1" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">Task #{transaction.taskId.toString()} Completed</p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                <Calendar className="w-3 h-3" />
                {formatDate(transaction.timestamp)}
              </div>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-chart-2/10 to-chart-2/20 text-chart-2 border-chart-2/30 font-semibold flex-shrink-0">
            +{transaction.amount.toString()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
