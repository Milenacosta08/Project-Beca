from django.contrib import admin
from .models import Cpae

class CpaeAdmin(admin.ModelAdmin):
    list_display = ('user', 'password')

admin.site.register(Cpae, CpaeAdmin)
