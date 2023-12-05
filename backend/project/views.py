from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.http import Http404

from rest_framework import viewsets

from .models import Project
from .serializers import ProjectSerializer

import json


class ProjectViewSet(viewsets.ModelViewSet):
    
        def list(self):
            projects = Project.objects.all()
            return JsonResponse(ProjectSerializer(projects, many=True).data, safe=False)
        
    
        def get(self, id):
            try:
                project = Project.objects.get(id=id)
            except Project.DoesNotExist:
                raise Http404("Project does not exist")
            return JsonResponse(ProjectSerializer(project).data, safe=False)
        
    
        @csrf_exempt
        def create(request):
            data = json.loads(request.body)
            project = Project.objects.create(**data)
            return JsonResponse(ProjectSerializer(project).data, safe=False)
        
    
        @csrf_exempt
        def update(request, id):
            data = json.loads(request.body)
            try:
                project = Project.objects.get(id=id)
            except Project.DoesNotExist:
                return JsonResponse({'error': 'Project not found'}, status=404)
            serializer = ProjectSerializer(project, data=data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data)
            return JsonResponse(serializer.errors, status=400)
        
    
        @csrf_exempt
        def delete(request, id):
            try:
                project = Project.objects.get(id=id)
            except Project.DoesNotExist:
                raise Http404("Project does not exist")
            project.delete()
            return JsonResponse({"message": "Project deleted successfully!"}, safe=False)