import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet, useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import TransactionHistory from './pages/TransactionHistory';
import Layout from './components/Layout';
import { Button } from './components/ui/button';
import { Coins } from 'lucide-react';

function LoginPrompt() {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/5 to-background">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-chart-1 to-chart-5 flex items-center justify-center shadow-lg">
            <Coins className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-chart-1 via-chart-4 to-chart-5 bg-clip-text text-transparent">
            Welcome to Earning App
          </h1>
          <p className="text-muted-foreground text-lg">
            Complete tasks, earn rewards, and track your progress
          </p>
        </div>
        <Button
          onClick={login}
          disabled={isLoggingIn}
          size="lg"
          className="bg-gradient-to-r from-chart-1 to-chart-4 hover:from-chart-1/90 hover:to-chart-4/90 text-white font-semibold px-8 shadow-lg"
        >
          {isLoggingIn ? 'Connecting...' : 'Sign In to Start Earning'}
        </Button>
      </div>
    </div>
  );
}

function LayoutWrapper() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

const rootRoute = createRootRoute({
  component: LayoutWrapper,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
});

const tasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tasks',
  component: Tasks,
});

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/history',
  component: TransactionHistory,
});

const routeTree = rootRoute.addChildren([indexRoute, tasksRoute, historyRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-chart-1 border-t-transparent"></div>
      </div>
    );
  }

  if (!identity) {
    return <LoginPrompt />;
  }

  return <RouterProvider router={router} />;
}
