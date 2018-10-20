from __future__ import unicode_literals
from django.db import models
from apps.dashboard.models import *

class Team(models.Model):
    order = models.IntegerField()
    teams_trainer = models.ForeignKey(Trainers, related_name = "trainers_team")
    teams_pokemon = models.ForeignKey(Pokemon, related_name = "pokemons_team")
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)