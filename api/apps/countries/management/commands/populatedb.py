import json
import os
import random
import logging


from django.core.management.base import BaseCommand
from apps.countries.models import Country, Province


logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Populates countries and cities"

    def handle(self, *args, **kwargs):
        with open(
            os.path.join(os.path.dirname(__file__), "countries+states+cities.json"), "rb"
        ) as file_handle:
            data = json.load(file_handle)

            for country in data:
                logger.info(f"Creating {country['name']}")
                print(f"Creating {country['name']}")

                c = Country.objects.create(
                    name=country["name"],
                    continent=country["region"],
                    population=random.randint(int(1e6), int(2e9)),
                    median_age=random.randint(45, 65),
                    fertility_rate=round(random.uniform(0.5, 2.0), 2),
                    land_area=random.randint(1000, 5000),
                )

                for province in country["states"]:
                    p = Province.objects.create(
                        country=c,
                        name=province["name"],
                        population=random.randint(int(1e6), int(2e7)),
                        median_age=random.randint(45, 65),
                    )
