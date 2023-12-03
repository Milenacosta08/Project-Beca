from django.contrib.auth import login
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Cpae


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        try:
            user = Cpae.objects.get(username=username)
            if user is not None and user.id is not None:
                if user.check_password(password):
                    login(request, user)
                    Token.objects.filter(user=user).delete()
                    token = Token.objects.create(user=user)
                    permissions = user.get_all_permissions()
                    return Response({'token': token.key, 'permissions': permissions}, status=200)
                else:
                    return Response({'error': 'Invalid password'}, status=400)
        except Cpae.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=400)
        

class LogoutView(APIView):
    def post(self, request):
        Token.objects.filter(user=request.user).delete()
        return Response(status=200)
