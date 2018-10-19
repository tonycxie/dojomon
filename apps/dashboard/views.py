from django.shortcuts import render, HttpResponse, redirect
from django.contrib import messages
import requests
from .models import *

def index(request):
    # for i in range(1, 152):
    #     response = requests.get("https://pokeapi.co/api/v2/pokemon/" + str(i) + "/")
    #     pokemon = response.json()
    #     Pokemon.objects.create(
    #         name = pokemon["name"],
    #         health = pokemon["stats"][1]["base_stat"] + pokemon["stats"][3]["base_stat"] + pokemon["stats"][5]["base_stat"],
    #         speed = pokemon["stats"][0]["base_stat"],
    #         tier = 0
    #     )
    #     this_pokemon = Pokemon.objects.get(name = pokemon["name"])
    #     for pokemon_type in pokemon["types"]:
    #         this_type = Types.objects.get(name = pokemon_type["type"]["name"])
    #         this_pokemon.pokemons_type.add(this_type)

    return render(request, "dashboard/index.html")


def get_started(request):
    return render(request, "dashboard/get_started.html")