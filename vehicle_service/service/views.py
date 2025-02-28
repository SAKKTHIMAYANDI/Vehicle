from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Component, Vehicle, Issue, Invoice
from .serializers import ComponentSerializer, VehicleSerializer, IssueSerializer, InvoiceSerializer

class ComponentViewSet(viewsets.ModelViewSet):
    queryset = Component.objects.all()
    # print("queryset:", queryset)
    serializer_class = ComponentSerializer

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all()
    print("VAlues")
    serializer_class = IssueSerializer
    
    # def create(self, request, *args, **kwargs):
    #     # print("🔵 Received Data:", request.data)  # Debugging log
    #     return super().create(request, *args, **kwargs)


class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

@api_view(['GET'])
def get_vehicles(request):
    vehicles = Vehicle.objects.all()
    print("Vehicles: ",vehicles)
    serializer = VehicleSerializer(vehicles, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_service(request):
    serializer = InvoiceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def get_issues(request):
    issues = Issue.objects.all().values("id", "description", "vehicle_id")
    print(issues)
    return JsonResponse(list(issues), safe=False)

def get_components(request):
    components = Component.objects.all().values("id", "name", "price")
    return JsonResponse(list(components), safe=False)

# @csrf_exempt  # Disable CSRF for development (Only for testing)
# def add_issue(request):
#     if request.method == "POST":
#         try:
#             data = json.loads(request.body)  # Convert request body to JSON
#             print("Received Data:", data)  # Debugging

#             # Ensure required fields are present
#             if "vehicle" not in data or "description" not in data:
#                 return JsonResponse({"error": "Missing required fields"}, status=400)

#             # Check if vehicle exists
#             try:
#                 vehicle = Vehicle.objects.get(vehicle_id=data["vehicle"])
#             except ObjectDoesNotExist:
#                 return JsonResponse({"error": "Invalid vehicle ID"}, status=400)

#             # Save the issue to the database
#             issue = Issue.objects.create(
#                 vehicle=vehicle,
#                 description=data["description"],
#                 status="Pending"
#             )

#             # Return success response
#             return JsonResponse({
#                 "message": "Issue reported successfully",
#                 "data": {
#                     "id": issue.id,
#                     "vehicle": issue.vehicle.vehicle_id,
#                     "description": issue.description,
#                     "status": issue.status,
#                     "reported_date": issue.created_at.strftime("%Y-%m-%d %H:%M:%S")
#                 }
#             }, status=201)

#         except json.JSONDecodeError:
#             return JsonResponse({"error": "Invalid JSON format"}, status=400)

#     return JsonResponse({"error": "Invalid request method"}, status=405)


@api_view(['PUT', 'DELETE'])
def service_detail(request, pk):
    print("pk: ",pk)
    try:
        Invoice = Invoice.objects.get(pk=pk)
    except Invoice.DoesNotExist:
        return Response({"error": "Invoice not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = InvoiceSerializer(Invoice, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        Invoice.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT'])
def update_vehicle(request, pk):
    try:
        vehicle = Vehicle.objects.get(pk=pk)
    except Vehicle.DoesNotExist:
        return Response({"error": "Vehicle not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = VehicleSerializer(vehicle, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_issue(request, id):
    try:
        issue = Issue.objects.get(id=id)
    except Issue.DoesNotExist:
        return Response({"error": "Issue not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = IssueSerializer(issue, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
