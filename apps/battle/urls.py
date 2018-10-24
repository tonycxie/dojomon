from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^pokemon/(?P<number>\d+)$', views.wild_encounter),
    url(r'^moves$', views.get_moves),
    url(r'^add_pokemon/(?P<number>\d+)$', views.add_pokemon),
    url(r'^switch_pokemon$', views.switch_pokemon)
    # url(r'^switch_pokemon/(?P<enemy_id>\d+)/(?P<enemy_hp>\d+)/(?P<order_number>\d+)', views.switch_pokemon)
]