from django.shortcuts import render, HttpResponse, redirect
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
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

    # loop for adding pokemon descriptions
    # for i in range(1, 152):
    #     response = requests.get("https://pokeapi.co/api/v2/pokemon-species/" + str(i))
    #     pokemon = response.json()
    #     get_pokemon = Pokemon.objects.get(id = i)
    #     for desc in pokemon["flavor_text_entries"]:
    #         if desc["language"]["name"] == "en" and desc["version"]["name"] == "alpha-sapphire":
    #             get_pokemon.desc = desc["flavor_text"]
    #             get_pokemon.save()
    #             continue

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

    lead_pokemon = Team.objects.filter(teams_trainer = Trainers.objects.get(email = request.session["email"])).get(order = 1).teams_pokemon
    wild_pokemon = Pokemon.objects.get(id = number)
    # request.session["enemy_hp"] = wild_pokemon.health
    # request.session["enemy_hp_width"] = 100
    # request.session["my_hp"] = lead_pokemon.health
    # request.session["my_hp_width"] = 100
    context = {
        "wild_pokemon": wild_pokemon,
        "wild_types": Types.objects.filter(types_pokemon = Pokemon.objects.get(id = number)),
        "wild_moves": Moves.objects.filter(moves_pokemon = Pokemon.objects.get(id = number)),
        "my_pokemon": lead_pokemon,
        "order_number": 1,
        "my_types": Types.objects.filter(types_pokemon = Pokemon.objects.get(id = lead_pokemon.id))
    }
    return render(request, "battle/wild_encounter.html", context)


def get_moves(request):
    pokemon = Pokemon.objects.get(name = request.POST["pokemon"])
    moves = Moves.objects.filter(moves_pokemon = pokemon)
    return HttpResponse(serializers.serialize("json", moves), content_type = "application/json")


def add_pokemon(request, number):
    trainer = Trainers.objects.get(email = request.session["email"])
    pokemon = Pokemon.objects.get(id = number)
    if Trainers.objects.filter(email = request.session["email"], trainers_pokemon = pokemon).count() == 0:
        trainer.trainers_pokemon.add(pokemon)
        trainer.trainer_level += pokemon.tier
        trainer.save()
    return redirect("/dashboard")


@csrf_exempt
def switch_pokemon(request):
    pokemon_id = Team.objects.filter(teams_trainer = Trainers.objects.get(email = request.session["email"])).get(order = request.POST["next-order"]).teams_pokemon_id
    next_pokemon = Pokemon.objects.filter(id = pokemon_id)
    types = Types.objects.filter(types_pokemon = next_pokemon)
    response = {
        "next_pokemon": serializers.serialize("json", next_pokemon),
        "types": serializers.serialize("json", types)
    } 
    return HttpResponse(json.dumps(response), content_type = "application/json")

def battle_trainers(request):
    data = {
        "trainers": Trainers.objects.filter(user_level=0)
    }
    return render(request, "battle/trainers.html", data)

# available trainers:
#     Preschooler
#     bugsy
#     alder
#     misty
#     red
#     lance
#     light
