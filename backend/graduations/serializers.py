from rest_framework import serializers
from .models import Graduation


class GraduationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Graduation
        fields = ['id', 'title', 'registration_date_start', 'registration_date_end', 'duration', 'vacancies', 'link', 'offerer']

