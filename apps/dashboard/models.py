from __future__ import unicode_literals
from django.db import models
from apps.log_reg.models import Trainers

class Pokemon(models.Model):
    name = models.CharField(max_length = 255)
    health = models.IntegerField()
    speed = models.IntegerField()
    tier = models.IntegerField()
    pokemons_trainer = models.ManyToManyField(Trainers, related_name = "trainers_pokemon")

class Types(models.Model):
    name = models.CharField(max_length = 255)
    types_pokemon = models.ManyToManyField(Pokemon, related_name = "pokemons_type")