from django.db import models

# Create your models here.
class Cpae(models.Model):
    user = models.CharField(max_length=200)
    password = models.TextField()

    def _str_(self):
        return self.user