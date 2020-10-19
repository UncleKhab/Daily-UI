import json
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from django.db import IntegrityError

from .models import *

# Create your views here.

def index(request):
    context = {}
    return render(request, "signup/index.html", context)

def login_view(request):
    if request.method == "POST":
        #Attempt to sign user in
        email = request.POST["email"]
        password = request.POST["password"]
        user = authenticate(request, username=email, password=password)

        #Check if authentication successful
        if user is not None:
            login(request, user)
            return render(request, "signup/login.html", {
                "message": "Logged in Successfully."
            })
        else:
            context = {
                "message": "Invalid username and/or password."
            }
            return render(request, "signup/login.html", context)
    else:
        context = {
            "message": "wrong method"
        }
        return render(request, "signup/login.html", context)


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        first_name = request.POST["first-name"]
        last_name = request.POST["last-name"]
        email = request.POST["email"]

        password = request.POST["password"]
        confirmation = request.POST["confirmation"]

        if password != confirmation:
            return render(request, "signup/register.html", {
                "message": "Passwords must match."
            })

        
        try:
            user = User.objects.create_user( email=email, first_name=first_name, last_name=last_name, password=password )
            user.save()
            print("success")
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Email Already in use"
            })
        
        login(request, user)
        
        return render(request,"signup/register.html", {
            "message": "User Created"
        })
    else:
        return HttpResponseRedirect(reverse("index"))