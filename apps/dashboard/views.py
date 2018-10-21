from django.shortcuts import render, HttpResponse, redirect
import requests
from .models import *

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
    return render(request, "dashboard/index.html")


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
    if trainer.trainer_level < 5:
        pokemon_list = Pokemon.objects.filter(tier = 1)
    pokemon = Pokemon.objects.random(pokemon_list)
    return redirect("/battle/pokemon/" + str(pokemon.id))

def profile_view(request):
    # print(request.session["userid"])
    data = {
        "trainer": Trainers.objects.get(id=request.session["userid"]),
        "all_pokemon": Pokemon.objects.all()
    }
    return render(request, "dashboard/profile.html",data)