from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Department, Team, UserProfile, HealthCheckSession, HealthCard, Vote

class HealthCheckTests(APITestCase):
    def setUp(self):
        # Create test user
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        
        # Create department
        self.department = Department.objects.create(name='Engineering')
        
        # Create team
        self.team = Team.objects.create(
            name='Frontend Team',
            department=self.department
        )
        
        # Create user profile
        self.user_profile = UserProfile.objects.create(
            user=self.user,
            role='engineer',
            team=self.team,
            department=self.department
        )
        
        # Create session
        self.session = HealthCheckSession.objects.create(
            title='Q1 Health Check',
            start_date='2024-01-01',
            end_date='2024-01-15',
            is_active=True
        )
        
        # Create health card
        self.card = HealthCard.objects.create(
            title='Code Quality',
            description='Assessment of code quality standards',
            category='technical'
        )
        
        # Authenticate
        self.client.force_authenticate(user=self.user)

    def test_create_vote(self):
        """Test creating a new vote"""
        url = '/api/votes/'
        data = {
            'session': self.session.id,
            'card': self.card.id,
            'status': 'green',
            'trend': 'up'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Vote.objects.count(), 1)
        self.assertEqual(Vote.objects.get().status, 'green')

    def test_update_vote(self):
        """Test updating an existing vote"""
        vote = Vote.objects.create(
            user=self.user,
            session=self.session,
            card=self.card,
            status='amber',
            trend='neutral'
        )
        
        url = f'/api/votes/{vote.id}/'
        data = {
            'session': self.session.id,
            'card': self.card.id,
            'status': 'green',
            'trend': 'up'
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        vote.refresh_from_db()
        self.assertEqual(vote.status, 'green')
        self.assertEqual(vote.trend, 'up')

    def test_vote_validation(self):
        """Test vote validation"""
        url = '/api/votes/'
        data = {
            'session': self.session.id,
            'card': self.card.id,
            'status': 'invalid_status',  # Invalid status
            'trend': 'up'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_session_summary(self):
        """Test session summary endpoint"""
        # Create some votes
        Vote.objects.create(
            user=self.user,
            session=self.session,
            card=self.card,
            status='green',
            trend='up'
        )
        
        url = f'/api/sessions/{self.session.id}/summary/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)

    def test_role_based_access(self):
        """Test role-based access control"""
        # Create another team
        other_team = Team.objects.create(
            name='Backend Team',
            department=self.department
        )
        
        # Create another user as team leader
        team_leader = User.objects.create_user(
            username='teamlead',
            password='testpass123'
        )
        
        UserProfile.objects.create(
            user=team_leader,
            role='team_leader',
            team=other_team,
            department=self.department
        )
        
        # Create vote for other team
        other_vote = Vote.objects.create(
            user=team_leader,
            session=self.session,
            card=self.card,
            status='red',
            trend='down'
        )
        
        # Test that engineer can't see other team's votes
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/api/votes/')
        self.assertEqual(len(response.data), 0)
        
        # Test that team leader can see their team's votes
        self.client.force_authenticate(user=team_leader)
        response = self.client.get('/api/votes/')
        self.assertEqual(len(response.data), 1)