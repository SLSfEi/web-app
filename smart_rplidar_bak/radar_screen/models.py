from django.db import models

class ScanIteration(models.Model):
    id = models.AutoField(primary_key=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    csv_string = models.TextField(null=True)
