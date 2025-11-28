from django.urls import path

from .views import (
    TemplateListView, TemplateDetailView,
    ResumeListCreateView, ResumeDetailView, PublicResumeView,
    PersonalInfoRetrieveUpdateView,
    EducationListCreateView, EducationDetailView,
    ExperienceListCreateView, ExperienceDetailView,
    ProjectListCreateView, ProjectDetailView,
    SkillListCreateView, SkillDetailView,
    CertificateListCreateView, CertificateDetailView,
)

urlpatterns = [
    # Templates
    path('templates/', TemplateListView.as_view(), name='template-list'),
    path('templates/<int:pk>/', TemplateDetailView.as_view(), name='template-detail'),

    # Resumes
    path('resumes/', ResumeListCreateView.as_view(), name='resume-list-create'),
    path('resumes/<int:pk>/', ResumeDetailView.as_view(), name='resume-detail'),
    path('resumes/<slug:slug>/public/', PublicResumeView.as_view(), name='resume-public'),

    # Personal info (GET/PUT)
    path('resumes/<int:resume_id>/personal-info/', PersonalInfoRetrieveUpdateView.as_view(),
         name='personal-info'),

    # Education
    path('resumes/<int:resume_id>/education/', EducationListCreateView.as_view(),
         name='education-list-create'),
    path('education/<int:pk>/', EducationDetailView.as_view(), name='education-detail'),

    # Experience
    path('resumes/<int:resume_id>/experience/', ExperienceListCreateView.as_view(),
         name='experience-list-create'),
    path('experience/<int:pk>/', ExperienceDetailView.as_view(), name='experience-detail'),

    # Projects
    path('resumes/<int:resume_id>/projects/', ProjectListCreateView.as_view(),
         name='project-list-create'),
    path('projects/<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),

    # Skills
    path('resumes/<int:resume_id>/skills/', SkillListCreateView.as_view(),
         name='skill-list-create'),
    path('skills/<int:pk>/', SkillDetailView.as_view(), name='skill-detail'),

    # Certificates
    path('resumes/<int:resume_id>/certificates/', CertificateListCreateView.as_view(),
         name='certificate-list-create'),
    path('certificates/<int:pk>/', CertificateDetailView.as_view(), name='certificate-detail'),
]
