import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/user';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  Users, 
  Building2, 
  BarChart3, 
  Settings 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/', 
      icon: <LayoutDashboard size={20} />, 
      roles: [UserRole.ENGINEER, UserRole.TEAM_LEADER, UserRole.DEPARTMENT_LEADER, UserRole.SENIOR_MANAGER, UserRole.ADMIN] 
    },
    { 
      name: 'Health Check', 
      path: '/health-check', 
      icon: <CheckCircle2 size={20} />, 
      roles: [UserRole.ENGINEER, UserRole.TEAM_LEADER] 
    },
    { 
      name: 'Team View', 
      path: '/team/1', 
      icon: <Users size={20} />, 
      roles: [UserRole.TEAM_LEADER, UserRole.DEPARTMENT_LEADER, UserRole.SENIOR_MANAGER] 
    },
    { 
      name: 'Department View', 
      path: '/department/1', 
      icon: <Building2 size={20} />, 
      roles: [UserRole.DEPARTMENT_LEADER, UserRole.SENIOR_MANAGER] 
    },
    { 
      name: 'Organization View', 
      path: '/organization', 
      icon: <BarChart3 size={20} />, 
      roles: [UserRole.SENIOR_MANAGER] 
    },
    { 
      name: 'Settings', 
      path: '/settings', 
      icon: <Settings size={20} />, 
      roles: [UserRole.ADMIN] 
    }
  ];
  
  const filteredNavItems = navItems.filter(item => 
    user && item.roles.includes(user.role as UserRole)
  );
  
  return (
    <div className="hidden md:flex flex-col w-64 bg-sky-800 text-white">
      <div className="h-16 flex items-center justify-center border-b border-sky-700">
        <span className="text-xl font-bold">Health Check</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {filteredNavItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                  isActive(item.path)
                    ? 'bg-sky-700 text-white'
                    : 'text-sky-100 hover:bg-sky-700 hover:text-white'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-sky-700">
        <div className="flex items-center">
          <div className="text-sm">
            <p className="font-medium text-white">{user?.name}</p>
            <p className="text-sky-200">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;