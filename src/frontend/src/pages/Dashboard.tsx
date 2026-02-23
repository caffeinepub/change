import { useEffect } from 'react';
import { useProfile } from '../hooks/useQueries';
import ProfileCard from '../components/ProfileCard';
import { Card, CardContent } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { AlertCircle, TrendingUp, Target, Award } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Link } from '@tanstack/react-router';
import { Button } from '../components/ui/button';

export default function Dashboard() {
  const { data: profile, isLoading, error, refetch } = useProfile();

  // Poll for profile updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);
    return () => clearInterval(interval);
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="w-full h-64 rounded-lg" />
        <Skeleton className="w-full h-48 rounded-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error instanceof Error ? error.message : 'Failed to load profile. Please try again.'}
        </AlertDescription>
      </Alert>
    );
  }

  if (!profile) {
    return null;
  }

  const stats = [
    {
      icon: TrendingUp,
      label: 'Total Earned',
      value: profile.balance.toString(),
      color: 'from-chart-1 to-chart-4',
    },
    {
      icon: Target,
      label: 'Active Tasks',
      value: 'Available',
      color: 'from-chart-4 to-chart-5',
    },
    {
      icon: Award,
      label: 'Status',
      value: 'Active',
      color: 'from-chart-2 to-chart-3',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl">
        <img
          src="/assets/generated/hero-banner.dim_1200x400.png"
          alt="Earning App Banner"
          className="w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
          <div className="px-8 space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Welcome Back!</h1>
            <p className="text-white/90 text-lg max-w-md">
              Complete tasks and earn rewards. Your journey to success starts here.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Profile Card */}
      <ProfileCard profile={profile} />

      {/* Quick Actions */}
      <Card className="border-2 border-dashed border-border/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Ready to Earn More?</h3>
              <p className="text-muted-foreground">Check out available tasks and start earning rewards today!</p>
            </div>
            <Link to="/tasks">
              <Button size="lg" className="bg-gradient-to-r from-chart-1 to-chart-4 hover:from-chart-1/90 hover:to-chart-4/90 text-white font-semibold shadow-md">
                View Tasks
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
