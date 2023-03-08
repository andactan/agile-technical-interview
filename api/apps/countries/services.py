import csv

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from apps.countries.models import Country


@api_view(["GET"])
def export_countries_to_csv(request):
    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = 'attachment; filename="export.csv"'

    writer = csv.writer(response)

    writer.writerow(["id, name, continent, population"])
    for country in Country.objects.all().values_list("id", "name", "continent", "population"):
        writer.writerow(country)

    return response
