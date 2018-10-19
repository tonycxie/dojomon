from django.shortcuts import render, HttpResponse, redirect
import requests
from .models import *

def wild_encounter(request, number):
    # loop for adding sprite links
    # for i in range(1, 152):
    #     response = requests.get("https://pokeapi.co/api/v2/pokemon/" + str(i))
    #     pokemon = response.json()
    #     get_pokemon = Pokemon.objects.get(id = i)
    #     get_pokemon.front_sprite = pokemon["sprites"]["front_default"]
    #     get_pokemon.back_sprite = pokemon["sprites"]["back_default"]
    #     get_pokemon.save()
    context = {
        "wild_pokemon": Pokemon.objects.get(id = number)
    }
    return render(request, "battle/wild_encounter.html", context)