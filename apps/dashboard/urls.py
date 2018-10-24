from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^get_started$', views.get_started),
    url(r'^add_team/(?P<name>\w+)$', views.add_team),
    url(r'^encounter$', views.encounter),
    url(r'^profile/(?P<id>\d+)$', views.profile_view),
    url(r'^save_sprite$', views.save_sprite),
    url(r'^view_pokemon/(?P<id>\d+)$', views.view_pokemon),
    url(r'^edit_team$', views.edit_page)
]