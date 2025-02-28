"""
URL configuration for vehicle_service project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from service.views import get_vehicles,get_issues,get_components,add_service,service_detail,update_vehicle,update_issue


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('service.urls')),
    path('vehicles/',  get_vehicles, name='get_vehicles'),
    path('issues/', get_issues, name='get_issues'), 
    path('components/', get_components, name='get_components'), 
    path("api/services/", add_service, name="add_service"),
    path('api/services/<int:pk>/', service_detail, name="service-detail"),
    path('api/vehicles/<int:pk>/', update_vehicle, name="vehicle-update"),
    path('api/issues/update/<int:id>/', update_issue, name='update_issue'),

]
