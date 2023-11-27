from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.http import Http404

from rest_framework import viewsets

from .models import Event, Program, Category
from .serializers import EventSerializer, ProgramSerializer, CategorySerializer

import json


class EventViewSet(viewsets.ModelViewSet):
        
        def List_Programs(self):
            programs = Program.objects.all()
            return JsonResponse(ProgramSerializer(programs, many=True).data, safe=False)
    
        def list(self):
            events = Event.objects.all()
            return JsonResponse(EventSerializer(events, many=True).data, safe=False)
        
    
        def get(self, id, *args, **kwargs):
            try:
                event = Event.objects.get(id=id)
            except Event.DoesNotExist:
                raise Http404("Event does not exist")
            return JsonResponse(EventSerializer(event).data, safe=False)
        
    
        @csrf_exempt
        def create(request, *args, **kwargs):
            if request.method == 'POST':
                data = json.loads(request.body)
                categories_data = data.pop('categories', [])
                programs_data = data.pop('program', [])
                event_serializer = EventSerializer(data=data)
                if event_serializer.is_valid():
                    event = event_serializer.save()
                    for category_data in categories_data:
                        category, created = Category.objects.get_or_create(name=category_data['name'])
                        event.categories.add(category)
                    for program_data in programs_data:
                        program_data['event'] = event.id
                        program_serializer = ProgramSerializer(data=program_data)
                        if program_serializer.is_valid():
                            program_serializer.save()
                    return JsonResponse(EventSerializer(event).data, status=201)
                return JsonResponse(event_serializer.errors, status=400)
            else:
                return JsonResponse({'error': 'Invalid request method'}, status=400)
        
    
        @csrf_exempt
        def update(request, id, *args, **kwargs):
            data = json.loads(request.body)
            categories_data = data.pop('categories')
            programs_data = data.pop('programs')
            event = Event.objects.get(id=id)
            event.title = data['title']
            event.duration = data['duration']
            event.local = data['local']
            event.description = data['description']
            event.categories.clear()
            event.programs.clear()
            for category_data in categories_data:
                category = Category.objects.create(**category_data)
                event.categories.add(category)
            
            for program_data in programs_data:
                program = Program.objects.create(**program_data)
                event.programs.add(program)
            event.save()
            return JsonResponse(EventSerializer(event).data, safe=False)
        
    
        @csrf_exempt
        def delete(request, id, *args, **kwargs):
            event = Event.objects.get(id=id)
            event.delete()
            return JsonResponse({'message': 'Event deleted successfully!'}, safe=False)