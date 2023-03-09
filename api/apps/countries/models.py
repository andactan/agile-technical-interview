from django.db import models
from core.mixins import DefaultModelMixin


class Country(DefaultModelMixin, models.Model):
    name = models.CharField(blank=False, null=False, max_length=64)
    continent = models.CharField(blank=False, null=False, max_length=64)
    population = models.IntegerField()
    median_age = models.IntegerField()
    land_area = models.IntegerField()
    fertility_rate = models.FloatField()


class Province(DefaultModelMixin, models.Model):
    name = models.CharField(blank=False, null=False, max_length=128)
    population = models.IntegerField()
    median_age = models.IntegerField()
    country = models.ForeignKey(Country, related_name="provinces", on_delete=models.CASCADE)
