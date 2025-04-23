import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { HealthStatus, TrendDirection } from '../types/health-check';
import { CheckCircle2, AlertTriangle, XCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Engineer {
  id: string;
  name: string;
}

interface TeamHealthCard {
  id: string;
  title: string;
  status: HealthStatus;
  trend: TrendDirection;
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

interface TeamHealthSession {
  id: string;
  title: string;
  date: string;
  cards: TeamHealthCard[];
}

const TeamView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data for demonstration
  const [team] = useState({
    id: id || '1',
    name: 'Frontend Team',
    departmentId: '1',
    departmentName: 'Engineering'
  });
  
  const [engineers] = useState<Engineer[]>([
    { id: '1', name: 'John Smith' },
    { id: '2', name: 'Sarah Johnson' },
    { id: '3', name: 'Mike Williams' },
    { id: '4', name: 'Emma Davis' },
    { id: '5', name: 'Robert Brown' }
  ]);
  
  const [sessions] = useState<TeamHealthSession[]>([
    {
      id: '1',
      title: 'Q2 Health Check',
      date: '2025-04-15',
      cards: [
        {
          id: '1', 
          title: 'Codebase Health',
          status: HealthStatus.GREEN,
          trend: TrendDirection.UP,
          votesCount: { red: 0, amber: 1, green: 4 },
          trendsCount: { up: 3, down: 0, neutral: 2 }
        },
        {
          id: '2', 
          title: 'Testing',
          status: HealthStatus.AMBER,
          trend: TrendDirection.NEUTRAL,
          votesCount: { red: 1, amber: 3, green: 1 },
          trendsCount: { up: 1, down: 1, neutral: 3 }
        },
        {
          id: '3', 
          title: 'Release Process',
          status: HealthStatus.RED,
          trend: TrendDirection.DOWN,
          votesCount: { red: 4, amber: 1, green: 0 },
          trendsCount: { up: 0, down: 4, neutral: 1 }
        },
        {
          id: '4', 
          title: 'Team Collaboration',
          status: HealthStatus.GREEN,
          trend: TrendDirection.NEUTRAL,
          votesCount: { red: 0, amber: 1, green: 4 },
          trendsCount: { up: 2, down: 0, neutral: 3 }
        },
        {
          id: '5', 
          title: 'Learning & Growth',
          status: HealthStatus.GREEN,
          trend: TrendDirection.UP,
          votesCount: { red: 0, amber: 0, green: 5 },
          trendsCount: { up: 4, down: 0, neutral: 1 }
        }
      ]
    },
    {
      id: '2',
      title: 'Q1 Health Check',
      date: '2025-01-15',
      cards: [
        {
          id: '1', 
          title: 'Codebase Health',
          status: HealthStatus.AMBER,
          trend: TrendDirection.NEUTRAL,
          votesCount: { red: 1, amber: 3, green: 1 },
          trendsCount: { up: 1, down: 1, neutral: 3 }
        },
        {
          id: '2', 
          title: 'Testing',
          status: HealthStatus.RED,
          trend: TrendDirection.DOWN,
          votesCount: { red: 3, amber: 2, green: 0 },
          trendsCount: { up: 0, down: 4, neutral: 1 }
        },
        {
          id: '3', 
          title: 'Release Process',
          status: HealthStatus.RED,
          trend: TrendDirection.DOWN,
          votesCount: { red: 4, amber: 1, green: 0 },
          trendsCount: { up: 0, down: 5, neutral: 0 }
        },
        {
          id: '4', 
          title: 'Team Collaboration',
          status: HealthStatus.GREEN,
          trend: TrendDirection.UP,
          votesCount: { red: 0, amber: 1, green: 4 },
          trendsCount: { up: 3, down: 0, neutral: 2 }
        },
        {
          id: '5', 
          title: 'Learning & Growth',
          status: HealthStatus.AMBER,
          trend: TrendDirection.UP,
          votesCount: { red: 0, amber: 3, green: 2 },
          trendsCount: { up: 3, down: 0, neutral: 2 }
        }
      ]
    }
  ]);
  
  const [selectedSession, setSelectedSession] = useState<string>(sessions[0].id);
  
  const renderStatusIcon = (status: HealthStatus) => {
    switch (status) {
      case HealthStatus.GREEN:
        return <CheckCircle2 className="text-green-500" size={24} />;
      case HealthStatus.AMBER:
        return <AlertTriangle className="text-amber-500" size={24} />;
      case HealthStatus.RED:
        return <XCircle className="text-red-500" size={24} />;
      default:
        return null;
    }
  };
  
  const renderTrendIcon = (trend: TrendDirection) => {
    switch (trend) {
      case TrendDirection.UP:
        return <TrendingUp className="text-green-500" size={20} />;
      case TrendDirection.DOWN:
        return <TrendingDown className="text-red-500" size={20} />;
      case TrendDirection.NEUTRAL:
        return <Minus className="text-gray-500" size={20} />;
      default:
        return null;
    }
  };
  
  const getCurrentSession = () => {
    return sessions.find(session => session.id === selectedSession) || sessions[0];
  };
  
  const renderVotesBar = (votesCount: TeamHealthCard['votesCount']) => {
    const total = votesCount.red + votesCount.amber + votesCount.green;
    const redPercent = (votesCount.red / total) * 100;
    const amberPercent = (votesCount.amber / total) * 100;
    const greenPercent = (votesCount.green / total) * 100;
    
    return (
      <div className="w-full h-6 flex rounded-md overflow-hidden">
        {votesCount.green > 0 && (
          <div 
            className="bg-green-500 h-full flex items-center justify-center text-white text-xs font-medium"
            style={{ width: `${greenPercent}%` }}
          >
            {votesCount.green}
          </div>
        )}
        {votesCount.amber > 0 && (
          <div 
            className="bg-amber-500 h-full flex items-center justify-center text-white text-xs font-medium"
            style={{ width: `${amberPercent}%` }}
          >
            {votesCount.amber}
          </div>
        )}
        {votesCount.red > 0 && (
          <div 
            className="bg-red-500 h-full flex items-center justify-center text-white text-xs font-medium"
            style={{ width: `${redPercent}%` }}
          >
            {votesCount.red}
          </div>
        )}
      </div>
    );
  };
  
  const renderTrendsBar = (trendsCount: TeamHealthCard['trendsCount']) => {
    const total = trendsCount.up + trendsCount.down + trendsCount.neutral;
    const upPercent = (trendsCount.up / total) * 100;
    const neutralPercent = (trendsCount.neutral / total) * 100;
    const downPercent = (trendsCount.down / total) * 100;
    
    return (
      <div className="w-full h-6 flex rounded-md overflow-hidden">
        {trendsCount.up > 0 && (
          <div 
            className="bg-green-500 h-full flex items-center justify-center text-white text-xs font-medium"
            style={{ width: `${upPercent}%` }}
          >
            {trendsCount.up}
          </div>
        )}
        {trendsCount.neutral > 0 && (
          <div 
            className="bg-gray-500 h-full flex items-center justify-center text-white text-xs font-medium"
            style={{ width: `${neutralPercent}%` }}
          >
            {trendsCount.neutral}
          </div>
        )}
        {trendsCount.down > 0 && (
          <div 
            className="bg-red-500 h-full flex items-center justify-center text-white text-xs font-medium"
            style={{ width: `${downPercent}%` }}
          >
            {trendsCount.down}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{team.name}</h2>
        <p className="text-gray-600">Department: {team.departmentName}</p>
      </div>
      
      <div className="mb-6 flex justify-between items-center">
        <div>
          <label htmlFor="session-select" className="block text-sm font-medium text-gray-700 mb-1">
            Session:
          </label>
          <select
            id="session-select"
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
          >
            {sessions.map(session => (
              <option key={session.id} value={session.id}>
                {session.title} ({new Date(session.date).toLocaleDateString()})
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-2">Team Members:</span>
          <span className="text-gray-600">{engineers.length}</span>
        </div>
      </div>
      
      <div className="space-y-6">
        {getCurrentSession().cards.map(card => (
          <div key={card.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  {renderStatusIcon(card.status)}
                  <span className="ml-2">{card.title}</span>
                  <span className="ml-3">{renderTrendIcon(card.trend)}</span>
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Status Distribution</span>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                        Green: {card.votesCount.green}
                      </span>
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-amber-500 rounded-full mr-1"></div>
                        Amber: {card.votesCount.amber}
                      </span>
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                        Red: {card.votesCount.red}
                      </span>
                    </div>
                  </div>
                  {renderVotesBar(card.votesCount)}
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Trend Distribution</span>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                        Up: {card.trendsCount.up}
                      </span>
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-gray-500 rounded-full mr-1"></div>
                        Stable: {card.trendsCount.neutral}
                      </span>
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                        Down: {card.trendsCount.down}
                      </span>
                    </div>
                  </div>
                  {renderTrendsBar(card.trendsCount)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamView;