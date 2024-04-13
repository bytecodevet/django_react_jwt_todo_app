from django.urls import include, path
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import TaskViewSet, UserRegisterView


router = SimpleRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('user/create/', UserRegisterView.as_view()),
    path('user/token/', TokenObtainPairView.as_view()),
    path('user/token/refresh/', TokenRefreshView.as_view()),
    path('', include(router.urls)),
]
