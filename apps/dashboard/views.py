from django.shortcuts import render, HttpResponse, redirect
from django.contrib import messages

def index(request):
    return render(request, "dashboard/index.html")


def get_started(request):
    return render(request, "dashboard/get_started.html")