from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.http import Http404

from rest_framework import viewsets

from .models import Graduation, Category
from .serializers import GraduationSerializer, CategorySerializer

import json


class GraduationViewSet(viewsets.ModelViewSet):

    def list(self):
        graduations = Graduation.objects.all()
        return JsonResponse(GraduationSerializer(graduations, many=True).data, safe=False)
    

    def get(self, id, *args, **kwargs):
        try:
            graduation = Graduation.objects.get(id=id)
        except Graduation.DoesNotExist:
            raise Http404("Graduation does not exist")
        return JsonResponse(GraduationSerializer(graduation).data, safe=False)
    

    @csrf_exempt
    def create(request, *args, **kwargs):
        data = json.loads(request.body)
        categories_data = data.pop('categories')
        graduation = Graduation.objects.create(**data)
        
        for category_data in categories_data:
            category = Category.objects.create(**category_data)
            graduation.categories.add(category)
        return JsonResponse(GraduationSerializer(graduation).data, safe=False)
    

    @csrf_exempt
    def update(request, id, *args, **kwargs):
        data = json.loads(request.body)
        categories_data = data.pop('categories')
        graduation = Graduation.objects.get(id=id)
        graduation.title = data['title']
        graduation.registration_date_start = data['registration_date_start']
        graduation.registration_date_end = data['registration_date_end']
        graduation.duration = data['duration']
        graduation.vacancies = data['vacancies']
        graduation.link = data['link']
        graduation.offerer = data['offerer']
        graduation.categories.clear()
        for category_data in categories_data:
            category = Category.objects.create(**category_data)
            graduation.categories.add(category)
        graduation.save()
        return JsonResponse(GraduationSerializer(graduation).data, safe=False)
    

    @csrf_exempt
    def delete(self, id, *args, **kwargs):
        try:
            graduation = Graduation.objects.get(id=id)
        except Graduation.DoesNotExist:
            raise Http404("Graduation does not exist")
        graduation.delete()
        return JsonResponse({'message': 'Graduation was deleted successfully!'}, status=204)



class CategoryViewSet(viewsets.ModelViewSet):

    def create(self, request, *args, **kwargs):
        data = json.loads(request.body)
        category = Category.objects.create(**data)
        return JsonResponse(CategorySerializer(category).data, safe=False)
    
    def update(self, request, *args, **kwargs):
        data = json.loads(request.body)
        category = Category.objects.get(id=data['id'])
        category.name = data['name']
        category.save()
        return JsonResponse(CategorySerializer(category).data, safe=False)
    
    def destroy(self, request, *args, **kwargs):
        data = json.loads(request.body)
        category = Category.objects.get(id=data['id'])
        category.delete()
        return JsonResponse(CategorySerializer(category).data, safe=False)
    