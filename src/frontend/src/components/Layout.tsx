import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from './ui/button';
import { Link, useRouterState } from '@tanstack/react-router';
import { Coins, ListTodo, History, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { SiCaffeine } from 'react-icons/si';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { clear, identity } = useInternetIdentity();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Coins },
    { name: 'Tasks', href: '/tasks', icon: ListTodo },
    { name: 'History', href: '/history', icon: History },
  ];

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-chart-1 to-chart-5 flex items-center justify-center shadow-md">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-chart-1 via-chart-4 to-chart-5 bg-clip-text text-transparent">
                Earning App
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      active
                        ? 'bg-gradient-to-r from-chart-1/10 to-chart-4/10 text-chart-1'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <Button
                onClick={clear}
                variant="outline"
                size="sm"
                className="hidden md:flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2 border-t border-border/40">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                      active
                        ? 'bg-gradient-to-r from-chart-1/10 to-chart-4/10 text-chart-1'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
              <Button
                onClick={() => {
                  clear();
                  setMobileMenuOpen(false);
                }}
                variant="outline"
                className="w-full justify-start gap-3"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">{children}</main>

      <footer className="border-t border-border/40 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Earning App. All rights reserved.</p>
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'earning-app'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              Built with <SiCaffeine className="w-4 h-4 text-chart-1" /> using caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
