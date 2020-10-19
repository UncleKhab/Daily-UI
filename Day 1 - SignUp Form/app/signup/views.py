import json
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse

from .models import *

# Create your views here.

def index(request):
    context = {}
    return render(request, "signup/index.html", context)

def register(request):
    if request.method == "POST":
        username = request.POST["first-name"]
        email = request.POST["email"]

        password = request.POST["password"]
        confirmation = request.POST["confirmation"]

        if password != confirmation:
            return render(request, "signup/register.html", {
                "message": "Passwords must match."
            })

        
        user = User.objects.create_user(username, email, password)
        user.save()
        print("success")
        
        login(request, user)
        
        return render(request,"signup/register.html", {
            "message": "User Created"
        })
    else:
        return render(request, "signup/register.html")