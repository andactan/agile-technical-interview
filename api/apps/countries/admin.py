from django.contrib import admin
from apps.countries.models import Country, Province


# Register your models here.
admin.site.register(Country)
admin.site.register(Province)
