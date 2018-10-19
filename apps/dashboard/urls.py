from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^get_started$', views.get_started),
    url(r'^add_team/(?P<name>\w+)', views.add_team)
]