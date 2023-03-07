from rest_framework import viewsets, mixins, permissions
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


class ProvinceView(AbstractView):
    queryset = Province.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ProvinceSerializer
    filterset_class = ProvinceFilter
