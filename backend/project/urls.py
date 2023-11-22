from django.urls import path

from . import views

urlpatterns = [
    path('create/', views.ProjectViewSet.create),
    path('list/', views.ProjectViewSet.list),
    path('update/<int:id>/', views.ProjectViewSet.update),
    path('delete/<int:id>/', views.ProjectViewSet.delete),
    path('get/<int:id>/', views.ProjectViewSet.get),
]