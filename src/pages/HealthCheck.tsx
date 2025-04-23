import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { HealthStatus, TrendDirection } from '../types/health-check';
import { CheckCircle2, AlertTriangle, XCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Card {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface UserVote {
  cardId: string;
  status: HealthStatus | null;
  trend: TrendDirection | null;
}

const HealthCheck: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data for demonstration
  const [session] = useState({
    id: '1',
    title: 'Q2 Health Check',
    startDate: '2025-04-01',
    endDate: '2025-04-15',
    isActive: true
  });
  
  const [cards] = useState<Card[]>([
    {
      id: '1',
      title: 'Codebase Health',
      description: 'How well-maintained and clean is the codebase? Are there technical debt issues?',
      category: 'Technical'
    },
    {
      id: '2',
      title: 'Testing',
      description: 'How robust is the testing strategy? Are tests reliable and provide good coverage?',
      category: 'Technical'
    },
    {
      id: '3',
      title: 'Release Process',
      description: 'How smooth is the release process? Are there frequent issues during deployments?',
      category: 'Process'
    },
    {
      id: '4',
      title: 'Team Collaboration',
      description: 'How well does the team work together? Is there effective communication?',
      category: 'Culture'
    },
    {
      id: '5',
      title: 'Learning & Growth',
      description: 'Do team members have opportunities to learn and grow professionally?',
      category: 'Culture'
    },
    {
      id: '6',
      title: 'Technical Support',
      description: 'How good is the technical support for the team? Are there appropriate tools and resources?',
      category: 'Technical'
    },
    {
      id: '7',
      title: 'Stakeholder Relationships',
      description: 'How effective is the relationship with stakeholders? Is there clear communication?',
      category: 'Business'
    },
    {
      id: '8',
      title: 'Product Management',
      description: 'Is there a clear product roadmap? Are requirements well communicated?',
      category: 'Business'
    },
    {
      id: '9',
      title: 'Work Environment',
      description: 'Is the work environment conducive to productivity and well-being?',
      category: 'Culture'
    },
    {
      id: '10',
      title: 'Documentation',
      description: 'Is the documentation sufficient, up-to-date, and accessible?',
      category: 'Technical'
    }
  ]);
  
  // Group cards by category
  const cardsByCategory = cards.reduce((acc, card) => {
    if (!acc[card.category]) {
      acc[card.category] = [];
    }
    acc[card.category].push(card);
    return acc;
  }, {} as Record<string, Card[]>);
  
  const [userVotes, setUserVotes] = useState<UserVote[]>(
    cards.map(card => ({
      cardId: card.id,
      status: null,
      trend: null
    }))
  );
  
  const handleStatusChange = (cardId: string, status: HealthStatus) => {
    setUserVotes(prev => 
      prev.map(vote => 
        vote.cardId === cardId 
          ? { ...vote, status } 
          : vote
      )
    );
  };
  
  const handleTrendChange = (cardId: string, trend: TrendDirection) => {
    setUserVotes(prev => 
      prev.map(vote => 
        vote.cardId === cardId 
          ? { ...vote, trend } 
          : vote
      )
    );
  };
  
  const getVoteForCard = (cardId: string) => {
    return userVotes.find(vote => vote.cardId === cardId) || { cardId, status: null, trend: null };
  };
  
  const isStatusSelected = (cardId: string, status: HealthStatus) => {
    const vote = getVoteForCard(cardId);
    return vote.status === status;
  };
  
  const isTrendSelected = (cardId: string, trend: TrendDirection) => {
    const vote = getVoteForCard(cardId);
    return vote.trend === trend;
  };
  
  const handleSubmit = () => {
    // Here you would send the votes to your backend
    console.log('Submitting votes:', userVotes);
    alert('Your votes have been submitted successfully!');
  };
  
  const renderStatusButtons = (cardId: string) => (
    <div className="flex space-x-2">
      <button
        type="button"
        onClick={() => handleStatusChange(cardId, HealthStatus.GREEN)}
        className={`flex items-center p-2 rounded-md ${
          isStatusSelected(cardId, HealthStatus.GREEN)
            ? 'bg-green-100 ring-2 ring-green-500'
            : 'bg-gray-100 hover:bg-green-50'
        }`}
      >
        <CheckCircle2 className="text-green-500" size={24} />
        <span className="ml-2 font-medium">Good</span>
      </button>
      <button
        type="button"
        onClick={() => handleStatusChange(cardId, HealthStatus.AMBER)}
        className={`flex items-center p-2 rounded-md ${
          isStatusSelected(cardId, HealthStatus.AMBER)
            ? 'bg-amber-100 ring-2 ring-amber-500'
            : 'bg-gray-100 hover:bg-amber-50'
        }`}
      >
        <AlertTriangle className="text-amber-500" size={24} />
        <span className="ml-2 font-medium">Needs Attention</span>
      </button>
      <button
        type="button"
        onClick={() => handleStatusChange(cardId, HealthStatus.RED)}
        className={`flex items-center p-2 rounded-md ${
          isStatusSelected(cardId, HealthStatus.RED)
            ? 'bg-red-100 ring-2 ring-red-500'
            : 'bg-gray-100 hover:bg-red-50'
        }`}
      >
        <XCircle className="text-red-500" size={24} />
        <span className="ml-2 font-medium">Critical</span>
      </button>
    </div>
  );
  
  const renderTrendButtons = (cardId: string) => (
    <div className="flex space-x-2 mt-3">
      <button
        type="button"
        onClick={() => handleTrendChange(cardId, TrendDirection.UP)}
        className={`flex items-center p-2 rounded-md ${
          isTrendSelected(cardId, TrendDirection.UP)
            ? 'bg-green-100 ring-2 ring-green-500'
            : 'bg-gray-100 hover:bg-green-50'
        }`}
      >
        <TrendingUp className="text-green-500" size={20} />
        <span className="ml-2 font-medium">Improving</span>
      </button>
      <button
        type="button"
        onClick={() => handleTrendChange(cardId, TrendDirection.NEUTRAL)}
        className={`flex items-center p-2 rounded-md ${
          isTrendSelected(cardId, TrendDirection.NEUTRAL)
            ? 'bg-gray-200 ring-2 ring-gray-500'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        <Minus className="text-gray-500" size={20} />
        <span className="ml-2 font-medium">Stable</span>
      </button>
      <button
        type="button"
        onClick={() => handleTrendChange(cardId, TrendDirection.DOWN)}
        className={`flex items-center p-2 rounded-md ${
          isTrendSelected(cardId, TrendDirection.DOWN)
            ? 'bg-red-100 ring-2 ring-red-500'
            : 'bg-gray-100 hover:bg-red-50'
        }`}
      >
        <TrendingDown className="text-red-500" size={20} />
        <span className="ml-2 font-medium">Declining</span>
      </button>
    </div>
  );
  
  const renderCards = () => (
    <>
      {Object.entries(cardsByCategory).map(([category, categoryCards]) => (
        <div key={category} className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{category}</h3>
          
          <div className="space-y-6">
            {categoryCards.map(card => (
              <div key={card.id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">{card.title}</h4>
                  <p className="text-gray-600 mb-4">{card.description}</p>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How would you rate this area?
                    </label>
                    {renderStatusButtons(card.id)}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Is this area improving or getting worse?
                    </label>
                    {renderTrendButtons(card.id)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{session.title}</h2>
        <p className="text-gray-600">
          {new Date(session.startDate).toLocaleDateString()} - {new Date(session.endDate).toLocaleDateString()}
        </p>
      </div>
      
      <div className="mb-8 bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Instructions</h3>
        <p className="text-gray-600">
          For each health check area, provide your assessment using the traffic light system:
        </p>
        <ul className="mt-2 space-y-1 text-gray-600">
          <li className="flex items-center">
            <CheckCircle2 className="text-green-500 mr-2" size={20} />
            <span>Green: Good, healthy, no significant issues</span>
          </li>
          <li className="flex items-center">
            <AlertTriangle className="text-amber-500 mr-2" size={20} />
            <span>Amber: Needs attention, some issues, but not critical</span>
          </li>
          <li className="flex items-center">
            <XCircle className="text-red-500 mr-2" size={20} />
            <span>Red: Critical, urgent attention needed</span>
          </li>
        </ul>
        <p className="mt-3 text-gray-600">
          Also indicate whether you feel this area is improving, remaining stable, or declining.
        </p>
      </div>
      
      {renderCards()}
      
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-md text-md font-medium"
        >
          Submit Health Check
        </button>
      </div>
    </div>
  );
};

export default HealthCheck;