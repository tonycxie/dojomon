from django.shortcuts import render, HttpResponse, redirect
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
import json
import requests
from .models import *
from apps.battle.models import Moves
import bcrypt


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
    teams = Trainers.objects.get(email=request.session["email"]).trainers_team.all()
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


def logout(request):
    request.session.flush()
    return redirect("/")


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
        pokemon_list = Pokemon.objects.filter(Q(tier=1) | Q(tier=2))
    elif trainer.trainer_level <= 30:
        pokemon_list = Pokemon.objects.filter(Q(tier = 1) | Q(tier = 2) | Q(tier = 3))
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

def edit_page(request):
    teams = Trainers.objects.get(id=request.session["userid"]).trainers_team.all()
    pokemon_team = []
    for team in teams:
        pokemon_id = team.teams_pokemon_id
        pokemon_team.append(Pokemon.objects.get(id=pokemon_id))
    data = {
        "trainer": Trainers.objects.get(id=request.session["userid"]),
        "all_pokemon": Pokemon.objects.all(),
        "trainers_team": pokemon_team
    }
    return render(request, "dashboard/edit_team.html", data)


@csrf_exempt
def add_to_team(request):
    trainer = Trainers.objects.get(email = request.session["email"])
    team = Team.objects.filter(teams_trainer = trainer)
    if team.count() != 0:
        team = team.order_by("-order")
        order = team.first().order
    else:
        order = 0
    check_dups = team.filter(teams_pokemon_id = request.POST["add-id"]).count()  
    if order == 6 or check_dups > 0:
        print("team is full or pokemon is already in team")
        pokemon = None
    else:
        next_order = order + 1
        Team.objects.create(
            order = next_order,
            teams_pokemon_id = request.POST["add-id"],
            teams_trainer = trainer
        )
        pokemon = Pokemon.objects.filter(id = request.POST["add-id"])
    return HttpResponse(serializers.serialize("json", pokemon), content_type = "application/json")


@csrf_exempt
def remove_team(request):
    trainer = Trainers.objects.get(email = request.session["email"])
    team = Team.objects.filter(teams_trainer = trainer)
    print("removing " + request.POST["remove-id"])
    team.get(teams_pokemon_id = request.POST["remove-id"]).delete()
    team = Team.objects.filter(teams_trainer = trainer)
    order_number = 1
    for current_pokemon in team:
        current_pokemon.order = order_number
        print("changing " + str(current_pokemon.teams_pokemon_id) + " to order " + str(order_number))
        order_number += 1
        current_pokemon.save()
    pokemon = Pokemon.objects.filter(id = request.POST["remove-id"])
    print("redirecting...")
    return redirect("/dashboard/edit_team")


def edit_account(request):
    data = {
        "trainer": Trainers.objects.get(email = request.session["email"])
    }
    return render(request, "dashboard/edit_account.html", data)


def update_info(request):
    if request.method == "POST":
        errors = Trainers.objects.register_validator(request.POST)
        if len(errors) and not errors["email_exists"]:
            for key, value in errors.items():
                messages.error(request, value)
            return redirect("/dashboard/edit_account")
        else:
            # pw_hash = bcrypt.hashpw(request.POST["password"].encode(), bcrypt.gensalt())
            trainer = Trainers.objects.get(id=request.session["userid"])
            
            trainer.first_name = request.POST["first_name"]
            trainer.last_name = request.POST["last_name"]
            email = request.POST["email"]
            request.session["first_name"] = trainer.first_name
            # password_hash = pw_hash
            trainer.save()
    return redirect("/dashboard")