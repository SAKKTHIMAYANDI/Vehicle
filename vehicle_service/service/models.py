from django.db import models

class Component(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    # is_repairable = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name


class Vehicle(models.Model):
    vehicle_id = models.CharField(max_length=17, unique=True)
    owner_name = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=15,default=0)
    
    def __str__(self):
        return self.vehicle_id

class Issue(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    description = models.TextField()
    reported_date = models.DateTimeField(auto_now_add=True)
    
    status = models.CharField(max_length=50, choices=[('Pending', 'Pending'), ('Resolved', 'Resolved')], default='Pending')
    def __str__(self):
        return f"Issue {self.id} for {self.vehicle}"

class Invoice(models.Model):
    issue = models.OneToOneField(Issue, on_delete=models.CASCADE)
    component = models.ForeignKey(Component, on_delete=models.CASCADE,default=None)
    quantity = models.IntegerField(default=1)
    labor_cost = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    
    
    # def save(self, *args, **kwargs):
    #     self.total_cost = (self.component.price * self.quantity) + self.labor_cost
    #     super().save(*args, **kwargs)

    def __str__(self):
        return f"Repair {self.id} for Issue {self.issue.id}"
