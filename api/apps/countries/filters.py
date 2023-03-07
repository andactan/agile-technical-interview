import django_filters as filters
from apps.countries.models import Country


class CountryFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="icontains")
    continent = filters.CharFilter(field_name="continent", lookup_expr="iexact")
    province = filters.CharFilter(field_name="country__provinces__name", lookup_expr="icontains")
    population__gte = filters.NumberFilter(field_name="population", lookup_expr="gte")
    population__lte = filters.NumberFilter(field_name="population", lookup_expr="lte")
    fertility_rate__gte = filters.NumberFilter(field_name="fertility_rate", lookup_expr="gte")
    fertility_rate__lte = filters.NumberFilter(field_name="fertility_rate", lookup_expr="lte")

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
