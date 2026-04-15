from django.shortcuts import render
from django.http import HttpResponseRedirect

from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator
from django.conf import settings

from .serializers import RegisterSerializer, UserSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        user.is_active = True # User can still login but is_verified is False
        user.save()
        
        # Send verification email
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        # For now, we point to the backend URL for verification, 
        # but in a real app, this might point to a frontend route.
        verification_url = f"{self.request.build_absolute_uri('/api/auth/verify/')}?uid={uid}&token={token}"
        
        subject = "Verify Your Account - Resume Builder"
        message = render_to_string('accounts/verification_email.html', {
            'user': user,
            'verification_url': verification_url,
        })
        
        send_mail(subject, "", settings.DEFAULT_FROM_EMAIL, [user.email], html_message=message)


class VerifyEmailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        uidb64 = request.query_params.get('uid')
        token = request.query_params.get('token')
        
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_verified = True
            user.save()
            return HttpResponseRedirect('http://localhost:3000/auth/jwt/sign-in?verified=true')
        else:
            return HttpResponseRedirect('http://localhost:3000/auth/jwt/sign-in?error=verification_failed')


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
