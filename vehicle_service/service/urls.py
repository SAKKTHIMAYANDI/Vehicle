from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ComponentViewSet, VehicleViewSet, IssueViewSet, InvoiceViewSet
# from .views import get_vehicles

router = DefaultRouter()
router.register(r'components', ComponentViewSet)
router.register(r'vehicles', VehicleViewSet)
router.register(r'issues', IssueViewSet)
router.register(r'services', InvoiceViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
