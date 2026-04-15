from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_premium')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'is_premium')
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Info', {'fields': ('phone_number', 'is_premium', 'daily_generation_count', 'last_generation_date', 'plan_limit')}),
    )

admin.site.register(CustomUser, CustomUserAdmin)
