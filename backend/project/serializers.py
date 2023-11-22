from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'registration_date_start', 'registration_date_end', 'validity_date_start', 'validity_date_end', 'vacancies', 'value', 'duration', 'link', 'offerer']