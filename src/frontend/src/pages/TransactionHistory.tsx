import { useTransactions } from '../hooks/useQueries';
import TransactionItem from '../components/TransactionItem';
import { Skeleton } from '../components/ui/skeleton';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertCircle, History, Inbox } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function TransactionHistory() {
  const { data: transactions, isLoading, error } = useTransactions();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-chart-2 to-chart-3 flex items-center justify-center shadow-md">
          <History className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Transaction History</h1>
          <p className="text-muted-foreground">View all your earning activities</p>
        </div>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="w-full h-20 rounded-lg" />
          ))}
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error instanceof Error ? error.message : 'Failed to load transactions. Please try again.'}
          </AlertDescription>
        </Alert>
      )}

      {!isLoading && !error && transactions && transactions.length === 0 && (
        <Card className="border-dashed border-2 border-border/50">
          <CardHeader>
            <CardTitle className="text-center text-muted-foreground flex items-center justify-center gap-2">
              <Inbox className="w-5 h-5" />
              No Transactions Yet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Complete tasks to see your earning history here.
            </p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && transactions && transactions.length > 0 && (
        <div className="space-y-3">
          {transactions
            .slice()
            .reverse()
            .map((transaction, index) => (
              <TransactionItem key={index} transaction={transaction} />
            ))}
        </div>
      )}
    </div>
  );
}
