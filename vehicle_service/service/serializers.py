from rest_framework import serializers
from .models import Component, Vehicle, Issue, Invoice

class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = '__all__'

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ['id','vehicle_id', 'owner_name','contact_number']

class IssueSerializer(serializers.ModelSerializer):
    owner_name = serializers.CharField(source="vehicle.vehicle_id", read_only=True)  # Assuming vehicle has an owner_name field
    
    class Meta:
        model = Issue
        fields = '__all__'

class InvoiceSerializer(serializers.ModelSerializer):
    issue_description = serializers.CharField(source="issue.description", read_only=True)
    owner_name = serializers.CharField(source="issue.vehicle.owner_name", read_only=True)  # Assuming vehicle has an owner_name field
    component_name = serializers.CharField(source="component.name", read_only=True)
    component_price = serializers.DecimalField(source="component.price", max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Invoice
        fields = '__all__'
