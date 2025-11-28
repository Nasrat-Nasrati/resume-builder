from django.contrib import admin
from .models import (
    Template, Resume, PersonalInfo, Education, Experience,
    Project, Skill, Certificate, DownloadLog
)


@admin.register(Template)
class TemplateAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'is_premium', 'created_at')
    search_fields = ('name',)
    list_filter = ('is_premium',)


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'user', 'slug', 'is_public', 'created_at', 'updated_at')
    search_fields = ('title', 'user__username', 'slug')
    list_filter = ('is_public', 'created_at')
    raw_id_fields = ('user',)


@admin.register(PersonalInfo)
class PersonalInfoAdmin(admin.ModelAdmin):
    list_display = ('id', 'resume', 'full_name', 'email', 'phone')
    search_fields = ('full_name', 'email', 'resume__title')
    raw_id_fields = ('resume',)


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('id', 'resume', 'institution', 'degree', 'start_date', 'end_date', 'is_current', 'order')
    search_fields = ('institution', 'degree', 'resume__title')
    list_filter = ('is_current', 'start_date')
    raw_id_fields = ('resume',)
    ordering = ('resume', 'order')


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('id', 'resume', 'company', 'position', 'start_date', 'end_date', 'is_current', 'order')
    search_fields = ('company', 'position', 'resume__title')
    list_filter = ('is_current', 'start_date')
    raw_id_fields = ('resume',)
    ordering = ('resume', 'order')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'resume', 'name', 'role', 'order')
    search_fields = ('name', 'role', 'resume__title')
    raw_id_fields = ('resume',)
    ordering = ('resume', 'order')


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('id', 'resume', 'name', 'category', 'level', 'order')
    search_fields = ('name', 'category', 'resume__title')
    list_filter = ('level', 'category')
    raw_id_fields = ('resume',)
    ordering = ('resume', 'order')


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('id', 'resume', 'name', 'issuer', 'issue_date', 'expiry_date', 'order')
    search_fields = ('name', 'issuer', 'resume__title')
    list_filter = ('issue_date', 'expiry_date')
    raw_id_fields = ('resume',)
    ordering = ('resume', 'order')


@admin.register(DownloadLog)
class DownloadLogAdmin(admin.ModelAdmin):
    list_display = ('id', 'resume', 'user', 'format', 'downloaded_at')
    search_fields = ('resume__title', 'user__username', 'format')
    list_filter = ('format', 'downloaded_at')
    raw_id_fields = ('resume', 'user')
