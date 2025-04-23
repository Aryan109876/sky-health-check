from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Department, Team, UserProfile, HealthCheckSession, HealthCard, Vote

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)

    class Meta:
        model = Team
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    team = TeamSerializer(read_only=True)
    department = DepartmentSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = '__all__'

class HealthCheckSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthCheckSession
        fields = '__all__'

class HealthCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthCard
        fields = '__all__'

class VoteSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    card = HealthCardSerializer(read_only=True)
    session = HealthCheckSessionSerializer(read_only=True)

    class Meta:
        model = Vote
        fields = '__all__'

class CreateVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ('session', 'card', 'status', 'trend')