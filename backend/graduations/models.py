from django.db import models

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=200)

    def _str_(self):
        return self.name
    

class Graduation(models.Model):
    title = models.CharField(max_length=200)
    registration_date_start = models.DateField(default=None)
    registration_date_end = models.DateField(default=None)
    duration = models.CharField(max_length=80)
    vacancies = models.IntegerField()
    link = models.CharField(max_length=200)
    offerer = models.CharField(max_length=200)
    categories = models.ManyToManyField(Category)
    
    def _str_(self):
        return self.title
