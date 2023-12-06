from django.db import models

    
class Event(models.Model):
    title = models.CharField(max_length=200)
    duration = models.CharField(max_length=100)
    local = models.CharField(max_length=100)
    description = models.CharField(max_length=500)

    def __str__(self):
        return self.title
    
class Program(models.Model):
    title = models.CharField(max_length=200)
    local = models.CharField(max_length=200)
    date = models.DateField()
    hour = models.TimeField()
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='programs')

    def __str__(self):
        return self.title

    