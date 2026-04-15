from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse
from datetime import date
from .utils.generators import generate_pdf, generate_docx

from .models import (
    Template, Resume, PersonalInfo, Education, Experience,
    Project, Skill, Certificate
)
from .serializers import (
    TemplateSerializer,
    ResumeListSerializer, ResumeDetailSerializer,
    PersonalInfoSerializer, EducationSerializer,
    ExperienceSerializer, ProjectSerializer,
    SkillSerializer, CertificateSerializer, LanguageSerializer
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


# ------- LANGUAGES -------
class LanguageListCreateView(generics.ListCreateAPIView):
    serializer_class = LanguageSerializer

    def get_queryset(self):
        resume_id = self.kwargs['resume_id']
        return Language.objects.filter(resume__id=resume_id, resume__user=self.request.user)

    def perform_create(self, serializer):
        resume_id = self.kwargs['resume_id']
        resume = get_object_or_404(Resume, id=resume_id, user=self.request.user)
        serializer.save(resume=resume)


class LanguageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

    def get_queryset(self):
        return Language.objects.filter(resume__user=self.request.user)

# ------- GENERATION & EXPORT -------
class BaseDownloadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def check_and_update_limits(self, user):
        today = date.today()
        if user.last_generation_date != today:
            user.last_generation_date = today
            user.daily_generation_count = 0
            
        if user.daily_generation_count >= user.plan_limit:
            return False
            
        user.daily_generation_count += 1
        user.save()
        return True


class DownloadPDFView(BaseDownloadView):
    def get(self, request, resume_id):
        resume = get_object_or_404(Resume, id=resume_id, user=request.user)
        
        if not self.check_and_update_limits(request.user):
            return Response({"error": "Daily Limit Reached. Please upgrade or wait 24 hours."}, status=status.HTTP_403_FORBIDDEN)
            
        try:
            pdf_bytes = generate_pdf(resume)
            response = HttpResponse(pdf_bytes, content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="{resume.slug}.pdf"'
            return response
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DownloadDOCXView(BaseDownloadView):
    def get(self, request, resume_id):
        resume = get_object_or_404(Resume, id=resume_id, user=request.user)
        
        if not request.user.is_premium:
            return Response({"error": "Upgrade Required for DOCX downloads."}, status=status.HTTP_403_FORBIDDEN)
            
        if not self.check_and_update_limits(request.user):
            return Response({"error": "Daily Limit Reached. Please upgrade or wait 24 hours."}, status=status.HTTP_403_FORBIDDEN)
            
        try:
            docx_bytes = generate_docx(resume)
            response = HttpResponse(docx_bytes, content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            response['Content-Disposition'] = f'attachment; filename="{resume.slug}.docx"'
            return response
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
