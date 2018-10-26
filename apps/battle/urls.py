from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^pokemon/(?P<number>\d+)$', views.wild_encounter),
    url(r'^moves$', views.get_moves),
    url(r'^add_pokemon/(?P<number>\d+)$', views.add_pokemon),
    url(r'^switch_pokemon$', views.switch_pokemon),
    url(r'^battle_trainers$', views.battle_trainers),
    url(r'^battle_trainers/(?P<number>\d+)$', views.start_battle),
    url(r'^enemy_switch$', views.enemy_switch)
]