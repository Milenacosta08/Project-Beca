from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CpaeSerializer
from .models import Cpae

class CpaeView(viewsets.ModelViewSet):
    serializer_class = CpaeSerializer
    queryset = Cpae.objects.all()
