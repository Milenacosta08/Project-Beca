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
        
    
        def get(self, id, *args, **kwargs):
            try:
                project = Project.objects.get(id=id)
            except Project.DoesNotExist:
                raise Http404("Project does not exist")
            return JsonResponse(ProjectSerializer(project).data, safe=False)
        
    
        @csrf_exempt
        def create(request, *args, **kwargs):
            data = json.loads(request.body)
            project = Project.objects.create(**data)
            return JsonResponse(ProjectSerializer(project).data, safe=False)
        
    
        @csrf_exempt
        def update(request, id, *args, **kwargs):
            data = json.loads(request.body)
            project = Project.objects.get(id=id)
            project.title = data['title']
            project.description = data['description']
            project.registration_date_start = data['registration_date_start']
            project.registration_date_end = data['registration_date_end']
            project.validity_date_start = data['validity_date_start']
            project.validity_date_end = data['validity_date_end']
            project.vacancies = data['vacancies']
            project.value = data['value']
            project.duration = data['duration']
            project.link = data['link']
            project.offerer = data['offerer']
            project.save()
            return JsonResponse(ProjectSerializer(project).data, safe=False)
        
    
        @csrf_exempt
        def delete(request, id, *args, **kwargs):
            try:
                project = Project.objects.get(id=id)
            except Project.DoesNotExist:
                raise Http404("Project does not exist")
            project.delete()
            return JsonResponse({"message": "Project deleted successfully!"}, safe=False)