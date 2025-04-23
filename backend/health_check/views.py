from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Count
from .models import Department, Team, UserProfile, HealthCheckSession, HealthCard, Vote
from .serializers import (
    DepartmentSerializer, TeamSerializer, UserProfileSerializer,
    HealthCheckSessionSerializer, HealthCardSerializer, VoteSerializer,
    CreateVoteSerializer
)

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [permissions.IsAuthenticated]

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_profile = UserProfile.objects.get(user=self.request.user)
        if user_profile.role in ['senior_manager', 'admin']:
            return Team.objects.all()
        elif user_profile.role == 'department_leader':
            return Team.objects.filter(department=user_profile.department)
        elif user_profile.role == 'team_leader':
            return Team.objects.filter(id=user_profile.team.id)
        return Team.objects.none()

class HealthCheckSessionViewSet(viewsets.ModelViewSet):
    queryset = HealthCheckSession.objects.all()
    serializer_class = HealthCheckSessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['get'])
    def summary(self, request, pk=None):
        session = self.get_object()
        votes = Vote.objects.filter(session=session)
        
        summary = votes.values('card').annotate(
            red_count=Count('status', filter=models.Q(status='red')),
            amber_count=Count('status', filter=models.Q(status='amber')),
            green_count=Count('status', filter=models.Q(status='green')),
            up_count=Count('trend', filter=models.Q(trend='up')),
            down_count=Count('trend', filter=models.Q(trend='down')),
            neutral_count=Count('trend', filter=models.Q(trend='neutral'))
        )
        
        return Response(summary)

class HealthCardViewSet(viewsets.ModelViewSet):
    queryset = HealthCard.objects.all()
    serializer_class = HealthCardSerializer
    permission_classes = [permissions.IsAuthenticated]

class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return CreateVoteSerializer
        return VoteSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user_profile = UserProfile.objects.get(user=self.request.user)
        if user_profile.role in ['senior_manager', 'admin']:
            return Vote.objects.all()
        elif user_profile.role == 'department_leader':
            return Vote.objects.filter(user__userprofile__department=user_profile.department)
        elif user_profile.role == 'team_leader':
            return Vote.objects.filter(user__userprofile__team=user_profile.team)
        return Vote.objects.filter(user=self.request.user)