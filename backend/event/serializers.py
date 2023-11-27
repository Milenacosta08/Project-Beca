from rest_framework import serializers
from .models import Category, Program, Event

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = ['id', 'title', 'local', 'date', 'hour']

class EventSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    programs = ProgramSerializer(read_only=True)

    class Meta:
        model = Event
        fields = ['id', 'title', 'duration', 'local', 'description', 'categories', 'programs']