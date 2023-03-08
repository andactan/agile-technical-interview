from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.countries.views import CountryView, ProvinceView
from apps.countries.services import export_countries_to_csv


router = DefaultRouter(trailing_slash=False)
router.register(r"countries", CountryView)
router.register(r"provinces", ProvinceView)

urlpatterns = [path("", include(router.urls))]
