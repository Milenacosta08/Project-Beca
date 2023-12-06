from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.http import Http404

from rest_framework import viewsets

from .models import Event, Program
from .serializers import EventSerializer, ProgramSerializer

import json


class EventViewSet(viewsets.ModelViewSet):
        
        # def listPrograms(self):
        #     programs = Program.objects.all()
        #     return JsonResponse(ProgramSerializer(programs, many=True).data, safe=False)
    
        def list(self):
            events = Event.objects.all()
            return JsonResponse(EventSerializer(events, many=True).data, safe=False)
        
    
        def get(self, id):
            try:
                event = Event.objects.get(id=id)
            except Event.DoesNotExist:
                raise Http404("Event does not exist")
            return JsonResponse(EventSerializer(event).data, safe=False)
        
    
        @csrf_exempt
        def create(request):
            if request.method == 'POST':
                data = json.loads(request.body)
                event_serializer = EventSerializer(data=data)
                if event_serializer.is_valid():
                    event = event_serializer.save()
                    return JsonResponse(EventSerializer(event).data, status=201)
                return JsonResponse(event_serializer.errors, status=400)
            else:
                return JsonResponse({'error': 'Invalid request method'}, status=400)
        
    
        @csrf_exempt
        def update(request, id):
            data = json.loads(request.body)
            programs_data = data.pop('programs', [])
            event = Event.objects.get(id=id)
            event.title = data['title']
            event.duration = data['duration']
            event.local = data['local']
            event.description = data['description']
            event.save()
            for program_data in programs_data:
                program_id = program_data.get('id', None)
                if program_id:
                    program = Program.objects.get(id=program_id)
                    program.title = program_data['title']
                    program.local = program_data['local']
                    program.date = program_data['date']
                    program.hour = program_data['hour']
                    program.save()
                else:
                    Program.objects.create(event=event, **program_data)
            return JsonResponse(EventSerializer(event).data, safe=False)
        
    
        @csrf_exempt
        def delete(request, id):
            event = Event.objects.get(id=id)
            event.delete()
            return JsonResponse({'message': 'Event deleted successfully!'}, safe=False)        