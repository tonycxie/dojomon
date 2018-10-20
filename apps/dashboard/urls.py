from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^get_started$', views.get_started),
    url(r'^add_team/(?P<name>\w+)$', views.add_team),
    url(r'^encounter$', views.encounter),
    url(r'^profile$', views.profile_view)
]