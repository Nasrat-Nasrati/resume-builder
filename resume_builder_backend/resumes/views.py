from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    Template, Resume, PersonalInfo, Education, Experience,
    Project, Skill, Certificate
)
from .serializers import (
    TemplateSerializer,
    ResumeListSerializer, ResumeDetailSerializer,
    PersonalInfoSerializer, EducationSerializer,
    ExperienceSerializer, ProjectSerializer,
    SkillSerializer, CertificateSerializer
)


class TemplateListView(generics.ListAPIView):
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer
    permission_classes = [permissions.AllowAny]


class TemplateDetailView(generics.RetrieveAPIView):
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer
    permission_classes = [permissions.AllowAny]


class ResumeListCreateView(generics.ListCreateAPIView):
    serializer_class = ResumeListSerializer

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ResumeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Resume.objects.all()
    serializer_class = ResumeDetailSerializer

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)


class PublicResumeView(generics.RetrieveAPIView):
    lookup_field = 'slug'
    queryset = Resume.objects.filter(is_public=True)
    serializer_class = ResumeDetailSerializer
    permission_classes = [permissions.AllowAny]


# ------- PERSONAL INFO (one-per-resume, GET/PUT) -------
class PersonalInfoRetrieveUpdateView(APIView):
    def get_object(self, resume_id):
        resume = get_object_or_404(Resume, id=resume_id, user=self.request.user)
        personal_info, created = PersonalInfo.objects.get_or_create(
            resume=resume,
            defaults={'full_name': self.request.user.get_full_name() or self.request.user.username,
                      'email': self.request.user.email}
        )
        return personal_info

    def get(self, request, resume_id):
        obj = self.get_object(resume_id)
        serializer = PersonalInfoSerializer(obj)
        return Response(serializer.data)

    def put(self, request, resume_id):
        obj = self.get_object(resume_id)
        serializer = PersonalInfoSerializer(obj, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


# ------- EDUCATION (list & detail) -------
class EducationListCreateView(generics.ListCreateAPIView):
    serializer_class = EducationSerializer

    def get_queryset(self):
        resume_id = self.kwargs['resume_id']
        return Education.objects.filter(resume__id=resume_id, resume__user=self.request.user)

    def perform_create(self, serializer):
        resume_id = self.kwargs['resume_id']
        resume = get_object_or_404(Resume, id=resume_id, user=self.request.user)
        serializer.save(resume=resume)


class EducationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

    def get_queryset(self):
        return Education.objects.filter(resume__user=self.request.user)


# ------- EXPERIENCE -------
class ExperienceListCreateView(generics.ListCreateAPIView):
    serializer_class = ExperienceSerializer

    def get_queryset(self):
        resume_id = self.kwargs['resume_id']
        return Experience.objects.filter(resume__id=resume_id, resume__user=self.request.user)

    def perform_create(self, serializer):
        resume_id = self.kwargs['resume_id']
        resume = get_object_or_404(Resume, id=resume_id, user=self.request.user)
        serializer.save(resume=resume)


class ExperienceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

    def get_queryset(self):
        return Experience.objects.filter(resume__user=self.request.user)


# ------- PROJECTS -------
class ProjectListCreateView(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        resume_id = self.kwargs['resume_id']
        return Project.objects.filter(resume__id=resume_id, resume__user=self.request.user)

    def perform_create(self, serializer):
        resume_id = self.kwargs['resume_id']
        resume = get_object_or_404(Resume, id=resume_id, user=self.request.user)
        serializer.save(resume=resume)


class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return Project.objects.filter(resume__user=self.request.user)


# ------- SKILLS -------
class SkillListCreateView(generics.ListCreateAPIView):
    serializer_class = SkillSerializer

    def get_queryset(self):
        resume_id = self.kwargs['resume_id']
        return Skill.objects.filter(resume__id=resume_id, resume__user=self.request.user)

    def perform_create(self, serializer):
        resume_id = self.kwargs['resume_id']
        resume = get_object_or_404(Resume, id=resume_id, user=self.request.user)
        serializer.save(resume=resume)


class SkillDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

    def get_queryset(self):
        return Skill.objects.filter(resume__user=self.request.user)


# ------- CERTIFICATES -------
class CertificateListCreateView(generics.ListCreateAPIView):
    serializer_class = CertificateSerializer

    def get_queryset(self):
        resume_id = self.kwargs['resume_id']
        return Certificate.objects.filter(resume__id=resume_id, resume__user=self.request.user)

    def perform_create(self, serializer):
        resume_id = self.kwargs['resume_id']
        resume = get_object_or_404(Resume, id=resume_id, user=self.request.user)
        serializer.save(resume=resume)


class CertificateDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer

    def get_queryset(self):
        return Certificate.objects.filter(resume__user=self.request.user)
