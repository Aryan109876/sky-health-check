export enum HealthStatus {
  RED = 'red',
  AMBER = 'amber',
  GREEN = 'green'
}

export enum TrendDirection {
  UP = 'up',
  DOWN = 'down',
  NEUTRAL = 'neutral'
}

export interface HealthCard {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface HealthVote {
  id: string;
  userId: string;
  cardId: string;
  sessionId: string;
  status: HealthStatus;
  trend: TrendDirection;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface TeamSummary {
  teamId: string;
  teamName: string;
  sessionId: string;
  cardId: string;
  cardTitle: string;
  overallStatus: HealthStatus;
  overallTrend: TrendDirection;
  votesCount: {
    red: number;
    amber: number;
    green: number;
  };
  trendsCount: {
    up: number;
    down: number;
    neutral: number;
  };
}