from django.urls import path

from . import views

urlpatterns = [
    path('create/', views.GraduationViewSet.create),
    path('list/', views.GraduationViewSet.list),
    path('update/<int:id>/', views.GraduationViewSet.update),
    path('delete/<int:id>/', views.GraduationViewSet.delete),
    path('get/<int:id>/', views.GraduationViewSet.get),
]