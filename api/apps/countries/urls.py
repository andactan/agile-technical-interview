from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.countries.views import CountryView, ProvinceView


router = DefaultRouter()
router.register(r"countries", CountryView)
router.register(r"provinces", ProvinceView)

urlpatterns = [path("", include(router.urls))]
