from typing import Any
from rest_framework import generics, status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Task
from .serializers import TaskSerializer, UserRegisterSerializer


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    renderer_classes = [JSONRenderer]

    def get_queryset(self) -> list[Task]:
        user = self.request.user
        return user.tasks.all()

    def perform_create(self, serializer: TaskSerializer) -> None:
        serializer.save(created_by=self.request.user)


class UserRegisterView(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer
    renderer_classes = [JSONRenderer]

    def create(self, request: Request, *args: tuple, **kwargs: dict[str, Any]) -> Response:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        user = serializer.instance
        refresh = RefreshToken.for_user(user)
        response_data = {
            'access': str(refresh.access_token),  # type: ignore
            'refresh': str(refresh)
        }

        headers = self.get_success_headers(response_data)
        return Response(response_data, status.HTTP_201_CREATED, headers=headers)
