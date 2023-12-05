from django.urls import path

from . import views

urlpatterns = [
    path('create/', views.EventViewSet.create),
    path('list/', views.EventViewSet.list),
    path('update/<int:id>/', views.EventViewSet.update),
    path('delete/<int:id>/', views.EventViewSet.delete),
    path('get/<int:id>/', views.EventViewSet.get),

    # path('listPrograms/', views.EventViewSet.listPrograms),
]