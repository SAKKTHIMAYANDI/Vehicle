# Generated by Django 5.1.6 on 2025-02-27 10:03

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='vehicle',
            old_name='vin',
            new_name='vehicle_id',
        ),
        migrations.AddField(
            model_name='invoice',
            name='component',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='service.component'),
        ),
        migrations.AddField(
            model_name='invoice',
            name='quantity',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='issue',
            name='reported_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='vehicle',
            name='contact_number',
            field=models.CharField(default=0, max_length=15),
        ),
    ]
