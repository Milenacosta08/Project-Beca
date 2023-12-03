from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.http import Http404

from rest_framework import viewsets

from .models import Graduation
from .serializers import GraduationSerializer

import json


class GraduationViewSet(viewsets.ModelViewSet):

    def list(self):
        graduations = Graduation.objects.all()
        return JsonResponse(GraduationSerializer(graduations, many=True).data, safe=False)
    

    def get(self, id):
        try:
            graduation = Graduation.objects.get(id=id)
        except Graduation.DoesNotExist:
            raise Http404("Graduation does not exist")
        return JsonResponse(GraduationSerializer(graduation).data, safe=False)
    

    @csrf_exempt
    def create(request):
        data = json.loads(request.body)
        serializer = GraduationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    

    @csrf_exempt
    def update(request, id):
        data = json.loads(request.body)
        try:
            graduation = Graduation.objects.get(id=id)
        except Graduation.DoesNotExist:
            return JsonResponse({'error': 'Graduation not found'}, status=404)
        
        serializer = GraduationSerializer(graduation, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)


    @csrf_exempt
    def delete(self, id):
        try:
            graduation = Graduation.objects.get(id=id)
        except Graduation.DoesNotExist:
            raise Http404("Graduation does not exist")
        graduation.delete()
        return JsonResponse({'message': 'Graduation was deleted successfully!'}, status=204)

