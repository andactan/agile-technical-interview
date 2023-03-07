from django.db import models

import uuid


class DefaultModelMixin:
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    created_at = models.DateTimeField(auto_now=True)
