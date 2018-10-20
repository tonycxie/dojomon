from __future__ import unicode_literals
from django.db import models
from apps.dashboard.models import *

class Moves(models.Model):
    name = models.CharField(max_length = 255)
    power = models.IntegerField()
    accuracy = models.IntegerField()
    pp = models.IntegerField()
    moves_type = models.ForeignKey(Types, related_name = "types_move")
    moves_pokemon = models.ManyToManyField(Pokemon, related_name = "pokemons_move")
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)