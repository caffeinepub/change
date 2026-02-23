import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Coins, Calendar, User } from 'lucide-react';
import type { UserProfile } from '../backend';

interface ProfileCardProps {
  profile: UserProfile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPrincipal = (principal: string) => {
    if (principal.length <= 16) return principal;
    return `${principal.slice(0, 8)}...${principal.slice(-8)}`;
  };

  return (
    <Card className="border-2 border-border/50 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="w-5 h-5 text-chart-1" />
          Your Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-chart-1/10 via-chart-4/10 to-chart-5/10 border border-chart-1/20">
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/earnings-badge.dim_128x128.png"
              alt="Earnings Badge"
              className="w-12 h-12"
            />
            <div>
              <p className="text-sm text-muted-foreground font-medium">Total Earnings</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-chart-1 to-chart-4 bg-clip-text text-transparent">
                {profile.balance.toString()}
              </p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-chart-1 to-chart-4 text-white border-0 px-3 py-1">
            <Coins className="w-3 h-3 mr-1" />
            Coins
          </Badge>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-start gap-3">
            <User className="w-4 h-4 text-muted-foreground mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground font-medium">Principal ID</p>
              <p className="text-sm font-mono break-all">{formatPrincipal(profile.principal.toString())}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground font-medium">Member Since</p>
              <p className="text-sm">{formatDate(profile.joinDate)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
