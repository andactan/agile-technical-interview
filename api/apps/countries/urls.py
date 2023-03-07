from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.countries.views import CountryView


router = DefaultRouter()
router.register(r"countries", CountryView)

urlpatterns = [path("", include(router.urls))]
