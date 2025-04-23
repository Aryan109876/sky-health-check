import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/user';
import { HealthStatus, TrendDirection } from '../types/health-check';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, XCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data for demonstration
  const [sessions] = useState([
    { id: '1', title: 'Q2 Health Check', startDate: '2025-04-01', endDate: '2025-04-15', isActive: true },
    { id: '2', title: 'Q1 Health Check', startDate: '2025-01-01', endDate: '2025-01-15', isActive: false },
  ]);
  
  const [teamSummaries] = useState([
    {
      teamId: '1',
      teamName: 'Frontend Team',
      cards: [
        { id: '1', title: 'Codebase Health', status: HealthStatus.GREEN, trend: TrendDirection.UP },
        { id: '2', title: 'Testing', status: HealthStatus.AMBER, trend: TrendDirection.NEUTRAL },
        { id: '3', title: 'Release Process', status: HealthStatus.RED, trend: TrendDirection.DOWN },
      ]
    },
    {
      teamId: '2',
      teamName: 'Backend Team',
      cards: [
        { id: '1', title: 'Codebase Health', status: HealthStatus.GREEN, trend: TrendDirection.NEUTRAL },
        { id: '2', title: 'Testing', status: HealthStatus.GREEN, trend: TrendDirection.UP },
        { id: '3', title: 'Release Process', status: HealthStatus.AMBER, trend: TrendDirection.UP },
      ]
    },
  ]);
  
  const [departmentSummaries] = useState([
    {
      departmentId: '1',
      departmentName: 'Engineering',
      cards: [
        { id: '1', title: 'Codebase Health', status: HealthStatus.AMBER, trend: TrendDirection.NEUTRAL },
        { id: '2', title: 'Testing', status: HealthStatus.AMBER, trend: TrendDirection.UP },
        { id: '3', title: 'Release Process', status: HealthStatus.AMBER, trend: TrendDirection.DOWN },
      ]
    },
    {
      departmentId: '2',
      departmentName: 'Product',
      cards: [
        { id: '1', title: 'Codebase Health', status: HealthStatus.GREEN, trend: TrendDirection.UP },
        { id: '2', title: 'Testing', status: HealthStatus.GREEN, trend: TrendDirection.UP },
        { id: '3', title: 'Release Process', status: HealthStatus.GREEN, trend: TrendDirection.NEUTRAL },
      ]
    },
  ]);
  
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
        return <TrendingUp className="text-green-500" size={18} />;
      case TrendDirection.DOWN:
        return <TrendingDown className="text-red-500" size={18} />;
      case TrendDirection.NEUTRAL:
        return <Minus className="text-gray-500" size={18} />;
      default:
        return null;
    }
  };
  
  const renderEngineerDashboard = () => (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Health Check Summary</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Active Sessions</h3>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {sessions.filter(session => session.isActive).map(session => (
              <div key={session.id} className="p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">{session.title}</h4>
                  <p className="text-sm text-gray-500">
                    {new Date(session.startDate).toLocaleDateString()} - {new Date(session.endDate).toLocaleDateString()}
                  </p>
                </div>
                <Link
                  to="/health-check"
                  className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Participate
                </Link>
              </div>
            ))}
            {sessions.filter(session => session.isActive).length === 0 && (
              <div className="p-4 text-center text-gray-500">
                No active sessions at the moment.
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Your Team's Health</h3>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Frontend Team</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {teamSummaries[0].cards.map(card => (
              <li key={card.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  {renderStatusIcon(card.status)}
                  <span className="ml-3 font-medium">{card.title}</span>
                </div>
                <div className="flex items-center">
                  {renderTrendIcon(card.trend)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  
  const renderTeamLeaderDashboard = () => (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Team Leader Dashboard</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Active Sessions</h3>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {sessions.filter(session => session.isActive).map(session => (
              <div key={session.id} className="p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">{session.title}</h4>
                  <p className="text-sm text-gray-500">
                    {new Date(session.startDate).toLocaleDateString()} - {new Date(session.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to="/health-check"
                    className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Participate
                  </Link>
                  <Link
                    to="/team/1"
                    className="border border-sky-600 text-sky-600 hover:bg-sky-50 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    View Team Results
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-gray-700">Your Team's Health</h3>
          <Link
            to="/team/1"
            className="text-sm font-medium text-sky-600 hover:text-sky-700"
          >
            View Details
          </Link>
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Frontend Team</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {teamSummaries[0].cards.map(card => (
              <li key={card.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  {renderStatusIcon(card.status)}
                  <span className="ml-3 font-medium">{card.title}</span>
                </div>
                <div className="flex items-center">
                  {renderTrendIcon(card.trend)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  
  const renderDepartmentLeaderDashboard = () => (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Department Leader Dashboard</h2>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-gray-700">Engineering Department Health</h3>
          <Link
            to="/department/1"
            className="text-sm font-medium text-sky-600 hover:text-sky-700"
          >
            View Details
          </Link>
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Department Summary</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Based on latest health check data</p>
          </div>
          <ul className="divide-y divide-gray-200">
            {departmentSummaries[0].cards.map(card => (
              <li key={card.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  {renderStatusIcon(card.status)}
                  <span className="ml-3 font-medium">{card.title}</span>
                </div>
                <div className="flex items-center">
                  {renderTrendIcon(card.trend)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamSummaries.map(team => (
          <div key={team.teamId} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">{team.teamName}</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Team health summary</p>
            </div>
            <ul className="divide-y divide-gray-200">
              {team.cards.map(card => (
                <li key={card.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    {renderStatusIcon(card.status)}
                    <span className="ml-3 font-medium">{card.title}</span>
                  </div>
                  <div className="flex items-center">
                    {renderTrendIcon(card.trend)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
  
  const renderSeniorManagerDashboard = () => (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Senior Manager Dashboard</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Organization Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-green-100 p-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">Healthy Areas</div>
                <div className="text-3xl font-semibold text-gray-900">8</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-amber-100 p-3">
                <AlertTriangle className="h-8 w-8 text-amber-600" />
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">Areas Needing Attention</div>
                <div className="text-3xl font-semibold text-gray-900">5</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-red-100 p-3">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">Critical Areas</div>
                <div className="text-3xl font-semibold text-gray-900">2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-gray-700">Department Health</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departmentSummaries.map(dept => (
            <div key={dept.departmentId} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">{dept.departmentName}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Department health summary</p>
              </div>
              <ul className="divide-y divide-gray-200">
                {dept.cards.map(card => (
                  <li key={card.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      {renderStatusIcon(card.status)}
                      <span className="ml-3 font-medium">{card.title}</span>
                    </div>
                    <div className="flex items-center">
                      {renderTrendIcon(card.trend)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  const renderDashboardByUserRole = () => {
    if (!user) return null;
    
    switch (user.role) {
      case UserRole.ENGINEER:
        return renderEngineerDashboard();
      case UserRole.TEAM_LEADER:
        return renderTeamLeaderDashboard();
      case UserRole.DEPARTMENT_LEADER:
        return renderDepartmentLeaderDashboard();
      case UserRole.SENIOR_MANAGER:
        return renderSeniorManagerDashboard();
      default:
        return <div>Dashboard for {user.role}</div>;
    }
  };
  
  return (
    <div>
      {renderDashboardByUserRole()}
    </div>
  );
};

export default Dashboard;