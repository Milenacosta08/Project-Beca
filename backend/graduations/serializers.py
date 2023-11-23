from rest_framework import serializers
from .models import Graduation, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class GraduationSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True) 

    class Meta:
        model = Graduation
        fields = ['id', 'title', 'registration_date_start', 'registration_date_end', 'duration', 'vacancies', 'link', 'offerer', 'categories']

