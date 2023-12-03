from rest_framework import serializers
from .models import Cpae

class CpaeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cpae
        fields = ('id', 'username', 'password')