from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    is_premium = models.BooleanField(default=False)
    daily_generation_count = models.IntegerField(default=0)
    last_generation_date = models.DateField(null=True, blank=True)
    plan_limit = models.IntegerField(default=5)  # 5 for free, 20 for premium

    def __str__(self):
        return self.username
