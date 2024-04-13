from django.contrib.auth.models import User
from django.db import models


class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks', blank=True)

    class Meta:
        ordering = ('-pk',)
