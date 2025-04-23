import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HealthStatus, TrendDirection } from '../types/health-check';
import { CheckCircle2, AlertTriangle, XCircle, TrendingUp, TrendingDown, Minus, BarChart } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  membersCount: number;
}

interface HealthCardSummary {
  id: string;
  title: string;
  overallStatus: HealthStatus;
  overallTrend: TrendDirection;
  teamStatuses: Record<string, HealthStatus>;
  teamTrends: Record<string, TrendDirection>;
}

interface DepartmentSession {
  id: string;
  title: string;
  date: string;
  cardSummaries: HealthCardSummary[];
}

const DepartmentView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data for demonstration
  const [department] = useState({
    id: id || '1',
    name: 'Engineering Department'
  });
  
  const [teams] = useState<Team[]>([
    { id: '1', name: 'Frontend Team', membersCount: 5 },
    { id: '2', name: 'Backend Team', membersCount: 6 },
    { id: '3', name: 'DevOps Team', membersCount: 3 }
  ]);
  
  const [sessions] = useState<DepartmentSession[]>([
    {
      id: '1',
      title: 'Q2 Health Check',
      date: '2025-04-15',
      cardSummaries: [
        {
          id: '1',
          title: 'Codebase Health',
          overallStatus: HealthStatus.AMBER,
          overallTrend: TrendDirection.UP,
          teamStatuses: {
            '1': HealthStatus.GREEN,
            '2': HealthStatus.AMBER,
            '3': HealthStatus.AMBER
          },
          teamTrends: {
            '1': TrendDirection.UP,
            '2': TrendDirection.UP,
            '3': TrendDirection.NEUTRAL
          }
        },
        {
          id: '2',
          title: 'Testing',
          overallStatus: HealthStatus.AMBER,
          overallTrend: TrendDirection.UP,
          teamStatuses: {
            '1': HealthStatus.AMBER,
            '2': HealthStatus.GREEN,
            '3': HealthStatus.AMBER
          },
          teamTrends: {
            '1': TrendDirection.NEUTRAL,
            '2': TrendDirection.UP,
            '3': TrendDirection.UP
          }
        },
        {
          id: '3',
          title: 'Release Process',
          overallStatus: HealthStatus.RED,
          overallTrend: TrendDirection.NEUTRAL,
          teamStatuses: {
            '1': HealthStatus.RED,
            '2': HealthStatus.AMBER,
            '3': HealthStatus.RED
          },
          teamTrends: {
            '1': TrendDirection.DOWN,
            '2': TrendDirection.NEUTRAL,
            '3': TrendDirection.UP
          }
        },
        {
          id: '4',
          title: 'Team Collaboration',
          overallStatus: HealthStatus.GREEN,
          overallTrend: TrendDirection.UP,
          teamStatuses: {
            '1': HealthStatus.GREEN,
            '2': HealthStatus.GREEN,
            '3': HealthStatus.GREEN
          },
          teamTrends: {
            '1': TrendDirection.NEUTRAL,
            '2': TrendDirection.UP,
            '3': TrendDirection.UP
          }
        },
        {
          id: '5',
          title: 'Learning & Growth',
          overallStatus: HealthStatus.GREEN,
          overallTrend: TrendDirection.UP,
          teamStatuses: {
            '1': HealthStatus.GREEN,
            '2': HealthStatus.GREEN,
            '3': HealthStatus.AMBER
          },
          teamTrends: {
            '1': TrendDirection.UP,
            '2': TrendDirection.UP,
            '3': TrendDirection.UP
          }
        }
      ]
    },
    {
      id: '2',
      title: 'Q1 Health Check',
      date: '2025-01-15',
      cardSummaries: [
        {
          id: '1',
          title: 'Codebase Health',
          overallStatus: HealthStatus.AMBER,
          overallTrend: TrendDirection.NEUTRAL,
          teamStatuses: {
            '1': HealthStatus.AMBER,
            '2': HealthStatus.AMBER,
            '3': HealthStatus.AMBER
          },
          teamTrends: {
            '1': TrendDirection.NEUTRAL,
            '2': TrendDirection.DOWN,
            '3': TrendDirection.NEUTRAL
          }
        },
        {
          id: '2',
          title: 'Testing',
          overallStatus: HealthStatus.RED,
          overallTrend: TrendDirection.DOWN,
          teamStatuses: {
            '1': HealthStatus.RED,
            '2': HealthStatus.AMBER,
            '3': HealthStatus.RED
          },
          teamTrends: {
            '1': TrendDirection.DOWN,
            '2': TrendDirection.DOWN,
            '3': TrendDirection.DOWN
          }
        },
        {
          id: '3',
          title: 'Release Process',
          overallStatus: HealthStatus.RED,
          overallTrend: TrendDirection.DOWN,
          teamStatuses: {
            '1': HealthStatus.RED,
            '2': HealthStatus.RED,
            '3': HealthStatus.RED
          },
          teamTrends: {
            '1': TrendDirection.DOWN,
            '2': TrendDirection.DOWN,
            '3': TrendDirection.DOWN
          }
        },
        {
          id: '4',
          title: 'Team Collaboration',
          overallStatus: HealthStatus.GREEN,
          overallTrend: TrendDirection.UP,
          teamStatuses: {
            '1': HealthStatus.GREEN,
            '2': HealthStatus.GREEN,
            '3': HealthStatus.AMBER
          },
          teamTrends: {
            '1': TrendDirection.UP,
            '2': TrendDirection.UP,
            '3': TrendDirection.UP
          }
        },
        {
          id: '5',
          title: 'Learning & Growth',
          overallStatus: HealthStatus.AMBER,
          overallTrend: TrendDirection.NEUTRAL,
          teamStatuses: {
            '1': HealthStatus.AMBER,
            '2': HealthStatus.AMBER,
            '3': HealthStatus.RED
          },
          teamTrends: {
            '1': TrendDirection.UP,
            '2': TrendDirection.NEUTRAL,
            '3': TrendDirection.DOWN
          }
        }
      ]
    }
  ]);
  
  const [selectedSession, setSelectedSession] = useState<string>(sessions[0].id);
  const [viewMode, setViewMode] = useState<'summary' | 'detailed'>('summary');
  
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
  
  const getStatusColor = (status: HealthStatus) => {
    switch (status) {
      case HealthStatus.GREEN:
        return 'bg-green-500';
      case HealthStatus.AMBER:
        return 'bg-amber-500';
      case HealthStatus.RED:
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const renderSummaryView = () => {
    const currentSession = getCurrentSession();
    
    return (
      <div className="space-y-6">
        {currentSession.cardSummaries.map(card => (
          <div key={card.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  {renderStatusIcon(card.overallStatus)}
                  <span className="ml-2">{card.title}</span>
                  <span className="ml-3">{renderTrendIcon(card.overallTrend)}</span>
                </h3>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Team Status</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {teams.map(team => (
                    <Link
                      key={team.id}
                      to={`/team/${team.id}`}
                      className="block bg-gray-50 hover:bg-gray-100 rounded-md p-3 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-medium text-gray-900">{team.name}</h5>
                        {renderStatusIcon(card.teamStatuses[team.id])}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>Trend:</span>
                        <span className="ml-2">{renderTrendIcon(card.teamTrends[team.id])}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const renderDetailedView = () => {
    const currentSession = getCurrentSession();
    
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Health Area
              </th>
              <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Overall
              </th>
              {teams.map(team => (
                <th key={team.id} className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {team.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentSession.cardSummaries.map(card => (
              <tr key={card.id} className="hover:bg-gray-50">
                <td className="py-4 px-4 text-sm font-medium text-gray-900">
                  {card.title}
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-col items-center">
                    {renderStatusIcon(card.overallStatus)}
                    <div className="mt-1">{renderTrendIcon(card.overallTrend)}</div>
                  </div>
                </td>
                {teams.map(team => (
                  <td key={team.id} className="py-4 px-4">
                    <Link to={`/team/${team.id}`} className="flex flex-col items-center hover:opacity-75">
                      {renderStatusIcon(card.teamStatuses[team.id])}
                      <div className="mt-1">{renderTrendIcon(card.teamTrends[team.id])}</div>
                    </Link>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{department.name}</h2>
        <p className="text-gray-600">{teams.length} Teams, {teams.reduce((sum, team) => sum + team.membersCount, 0)} Engineers</p>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
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
        
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setViewMode('summary')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              viewMode === 'summary'
                ? 'bg-sky-600 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Summary View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('detailed')}
            className={`px-4 py-2 text-sm font-medium rounded-md flex items-center ${
              viewMode === 'detailed'
                ? 'bg-sky-600 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <BarChart size={16} className="mr-1" />
            Detailed View
          </button>
        </div>
      </div>
      
      {viewMode === 'summary' ? renderSummaryView() : renderDetailedView()}
    </div>
  );
};

export default DepartmentView;