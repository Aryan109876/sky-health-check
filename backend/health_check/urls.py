from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'departments', views.DepartmentViewSet)
router.register(r'teams', views.TeamViewSet)
router.register(r'sessions', views.HealthCheckSessionViewSet)
router.register(r'cards', views.HealthCardViewSet)
router.register(r'votes', views.VoteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]