from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.db import models

class CpaeManager(BaseUserManager):
    def create_user(self, username, password=None):
        if not username:
            raise ValueError('The Username field must be set')
        user = self.model(username=username)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None):
        user = self.create_user(username, password=password)
        user.is_admin = True
        user.save(using=self._db)
        return user

class Cpae(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=200, unique=True, default='')
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=True)

    objects = CpaeManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['password']

    def _str_(self):
        return self.username
    
    def has_module_perms(self, app_label):
        return True
    
    @property
    def is_staff(self):
        return self.is_admin
    