import django_filters as filters
from apps.countries.models import Country


class CountryFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="icontains")
    continent = filters.CharFilter(field_name="continent", lookup_expr="iexact")
    # province = filters.CharFilter(field_name="country__provinces__name", lookup_expr="icontains")
    population__gte = filters.NumberFilter(field_name="population", lookup_expr="gte")
    population__lte = filters.NumberFilter(field_name="population", lookup_expr="lte")
    fertility_rate__gte = filters.NumberFilter(field_name="fertility_rate", lookup_expr="gte")
    fertility_rate__lte = filters.NumberFilter(field_name="fertility_rate", lookup_expr="lte")
    median_age__lte = filters.NumberFilter(field_name="median_age", lookup_expr="lte")
    median_age__gte = filters.NumberFilter(field_name="median_age", lookup_expr="gte")
    province = filters.CharFilter(field_name="provinces__name", lookup_expr="icontains")

    order = filters.OrderingFilter(
        fields=[
            ("name", "name"),
            ("population", "population"),
            ("fertility_rate", "fertility_rate"),
            ("median_age", "median_age"),
            ("land_area", "land_area"),
            ("continent", "continent"),
        ]
    )

    class Meta:
        model = Country
        fields = ["name", "continent", "population"]


class ProvinceFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="icontains")
    country__name = filters.CharFilter(field_name="country__name", lookup_expr="exact")
    country__id = filters.NumberFilter(field_name="country__id")
    population__gte = filters.NumberFilter(field_name="population", lookup_expr="gte")
    population__lte = filters.NumberFilter(field_name="population", lookup_expr="lte")
    median_age__lte = filters.NumberFilter(field_name="median_age", lookup_expr="lte")
    median_age__gte = filters.NumberFilter(field_name="median_age", lookup_expr="gte")

    order = filters.OrderingFilter(
        fields=[
            ("name", "name"),
            ("population", "population"),
            ("median_age", "median_age"),
        ]
    )
