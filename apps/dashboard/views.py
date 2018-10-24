from django.shortcuts import render, HttpResponse, redirect
from django.core import serializers
import json
import requests
from .models import *
from apps.battle.models import Moves


def index(request):
    # loop for putting data from pokemon api into the database
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
    teams = Trainers.objects.get(id=request.session["userid"]).trainers_team.all()
    pokemon_team = []
    for team in teams:
        pokemon_id = team.teams_pokemon_id
        pokemon_team.append(Pokemon.objects.get(id=pokemon_id))
    data = {
        "all_trainers": Trainers.objects.all(),
        "your_pokemon": pokemon_team
    }
    return render(request, "dashboard/index.html", data)


def get_started(request):
    return render(request, "dashboard/get_started.html")


def add_team(request, name):
    pokemon = Pokemon.objects.get(name = name)
    trainer = Trainers.objects.get(email = request.session["email"])
    trainer.trainers_pokemon.add(pokemon)
    trainer.trainer_level += pokemon.tier
    trainer.save()
    Team.objects.create(
        order = 1,
        teams_trainer = trainer,
        teams_pokemon = pokemon
    )
    return redirect("/dashboard")


def encounter(request):
    trainer = Trainers.objects.get(email = request.session["email"])
    if trainer.trainer_level <= 5:
        pokemon_list = Pokemon.objects.filter(tier = 1)
    elif trainer.trainer_level <= 15:
        pokemon_list = Pokemon.objects.filter(tier = 1).filter(tier = 2)
    elif trainer.trainer_level <= 30:
        pokemon_list = Pokemon.objects.filter(tier = 1).filter(tier = 2).filter(tier = 3)
    elif trainer.trainer_level <= 50:
        pokemon_list = Pokemon.objects.exclude(tier = 5)
    else:
        pokemon_list = Pokemon.objects.all()
    pokemon = Pokemon.objects.random(pokemon_list)
    return redirect("/battle/pokemon/" + str(pokemon.id))

def profile_view(request, id):
    # print(request.session["userid"])
    teams = Trainers.objects.get(id=id).trainers_team.all()
    pokemon_team = []
    for team in teams:
        pokemon_id = team.teams_pokemon_id
        pokemon_team.append(Pokemon.objects.get(id=pokemon_id))
    data = {
        "trainer": Trainers.objects.get(id=id),
        "all_pokemon": Pokemon.objects.all(),
        "trainers_team": pokemon_team
    }
    print(Trainers.objects.get(id=id).trainers_pokemon.all())
    return render(request, "dashboard/profile.html",data)

def save_sprite(request):
    trainer = Trainers.objects.get(id=request.session["userid"])
    trainer.character_sprite = request.POST["character_sprite"]
    trainer.save()
    return HttpResponse("success")

def view_pokemon(request, id):
    pokemon = Pokemon.objects.filter(id=id)
    moves = Moves.objects.filter(moves_pokemon = pokemon).all()
    types = Types.objects.filter(types_pokemon = pokemon).all()
    response =  {
            "pokemon": serializers.serialize("json", pokemon),
            "moves": serializers.serialize("json", moves),
            "type": serializers.serialize("json", types)
    }
    return HttpResponse(json.dumps(response), content_type = "application/json")

