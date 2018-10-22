from django.shortcuts import render, HttpResponse, redirect
from django.core import serializers
import json
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

    # loop for adding moves from pokemon api into database
    # for i in range(1, 720):
    #     response = requests.get("https://pokeapi.co/api/v2/move/" + str(i))
    #     move = response.json()
    #     if move["power"]:
    #         power = move["power"]
    #     elif move["power"] == None:
    #         power = 0
    #     if move["accuracy"]:
    #         accuracy = move["accuracy"]
    #     elif move["accuracy"] == None:
    #         accuracy = 0
    #     move_type = Types.objects.get(name = move["type"]["name"])
    #     Moves.objects.create(
    #         name = move["name"],
    #         power = power,
    #         accuracy = accuracy,
    #         pp = move["pp"],
    #         moves_type = move_type
    #     )

    lead_id = Team.objects.filter(teams_trainer = Trainers.objects.get(email = request.session["email"])).get(order = 1).teams_pokemon_id 
    context = {
        "wild_pokemon": Pokemon.objects.get(id = number),
        "first_pokemon": Pokemon.objects.get(id = lead_id),
    }
    return render(request, "battle/wild_encounter.html", context)


def get_moves(request):
    pokemon = Pokemon.objects.get(name = request.POST["pokemon"])
    moves = Moves.objects.filter(moves_pokemon = pokemon)
    return HttpResponse(serializers.serialize("json", moves), content_type = "application/json")