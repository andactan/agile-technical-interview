import csv

from rest_framework import viewsets, mixins, permissions, decorators
from django.http import HttpResponse
from apps.countries.models import Country, Province
from apps.countries.serializers import CountrySerializer, ProvinceSerializer
from apps.countries.filters import CountryFilter, ProvinceFilter


class AbstractView(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    ...


class CountryView(AbstractView):
    queryset = Country.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CountrySerializer
    filterset_class = CountryFilter

    @decorators.action(detail=False, methods=["get"])
    def export_to_csv(self, request, *args, **kwargs):
        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = 'attachment; filename="export.csv"'

        writer = csv.writer(response)
        writer.writerow(["first_name", "last_name", "phone_number", "country"])
        writer.writerow(["Huzaif", "Sayyed", "+919954465169", "India"])
        writer.writerow(["Adil", "Shaikh", "+91545454169", "India"])
        writer.writerow(["Ahtesham", "Shah", "+917554554169", "India"])

        return response


class ProvinceView(AbstractView):
    queryset = Province.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ProvinceSerializer
    filterset_class = ProvinceFilter
