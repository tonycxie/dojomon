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

class CPUs(models.Model):
    name = models.CharField(max_length = 255)
    required_level = models.IntegerField()
    character_sprite = models.CharField(max_length = 255)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    
class CPUTeam(models.Model):
    order = models.IntegerField()
    cpu_teams_trainer = models.ForeignKey(CPUs, related_name = "trainers_cpu_team")
    cpu_teams_pokemon = models.ForeignKey(Pokemon, related_name = "pokemons_cpu_team")
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)