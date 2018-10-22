from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^pokemon/(?P<number>\d+)$', views.wild_encounter),
    url(r'^moves$', views.get_moves)
]