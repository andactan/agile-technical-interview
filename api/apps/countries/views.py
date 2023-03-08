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
        writer.writerow(["id", "name", "continent", "population"])

        # get filtered queryset, then export
        filtered_qs = self.filterset_class(self.request.GET, self.get_queryset()).qs
        for country in filtered_qs.values_list("id", "name", "continent", "population"):
            writer.writerow(country)

        return response


class ProvinceView(AbstractView):
    queryset = Province.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ProvinceSerializer
    filterset_class = ProvinceFilter
