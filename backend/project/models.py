from django.db import models

# Create your models here.

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=2000)
    registration_date_start = models.DateField(default=None)
    registration_date_end = models.DateField(default=None)
    validity_date_start = models.DateField(default=None)
    validity_date_end = models.DateField(default=None)
    vacancies = models.IntegerField()
    value = models.CharField(max_length=20)
    duration = models.CharField(max_length=80)
    link = models.CharField(max_length=200)
    offerer = models.CharField(max_length=200)

    def _str_(self):
        return self.title