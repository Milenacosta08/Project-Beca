from rest_framework import serializers
from .models import Program, Event

class ProgramSerializer(serializers.ModelSerializer):
    event = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Program
        fields = ['id', 'title', 'local', 'date', 'hour', 'event']

class EventSerializer(serializers.ModelSerializer):
    programs = ProgramSerializer(many=True)

    class Meta:
        model = Event
        fields = ['id', 'title', 'duration', 'local', 'description', 'programs']

    def create(self, validated_data):
        programs_data = validated_data.pop('programs', [])
        event = Event.objects.create(**validated_data)
        for program_data in programs_data:
            Program.objects.create(event=event, **program_data)
        return event