from __future__ import unicode_literals
from django.db import models
import re

class TrainersManager(models.Manager):
    def register_validator(self, postData):
        errors = {}
        NAME_REGEX = re.compile(r'^[a-zA-Z][a-zA-Z]+$')
        EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
        if len(postData["first_name"]) < 1:
            errors["first_name"] = "First name is required"
        elif not NAME_REGEX.match(postData["first_name"]):
            errors["first_name"] = "First name must be at least 2 letters and have no numbers"
        if len(postData["last_name"]) < 1:
            errors["last_name"] = "Last name is required"
        elif not NAME_REGEX.match(postData["last_name"]):
            errors["last_name"] = "Last name must be at least 2 letters and have no numbers"
        if len(postData["email"]) < 1:
            errors["email"] = "Email is required"
        elif not EMAIL_REGEX.match(postData["email"]):
            errors["email"] = "Invalid email"
        elif Trainers.objects.filter(email = postData["email"]).count() > 0:
            errors["email"] = "Email already exists"
        if len(postData["password"]) < 1:
            errors["pw"] = "Password is required"
        elif len(postData["password"]) < 8:
            errors["pw"] = "Password must be at least 8 characters"
        if len(postData["confirm_password"]) < 1:
            errors["confirm_pw"] = "You must confirm your password"
        elif postData["password"] != postData["confirm_password"]:
            errors["confirm_pw"] = "Password does not match"
        return errors


    def pw_validator(self, postData):
        errors = {}
        if len(postData["password"]) < 1:
            errors["pw"] = "Password is required"
        elif len(postData["password"]) < 9:
            errors["pw"] = "Password must be at least 8 characters"
        if len(postData["confirm_password"]) < 1:
            errors["confirm_pw"] = "You must confirm your password"
        elif postData["password"] != postData["confirm_password"]:
            errors["confirm_pw"] = "Password does not match"
        return errors


class Trainers(models.Model):
    first_name = models.CharField(max_length = 255)
    last_name = models.CharField(max_length = 255)
    email = models.CharField(max_length = 255)
    user_level = models.IntegerField()
    trainer_level = models.IntegerField()
    password_hash = models.CharField(max_length = 255)
    character_sprite = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    objects = TrainersManager()