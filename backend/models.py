from django.db import models
import string
import random


def set_unique_code_book():
    length = 8

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Book.objects.filter(id=code).count() == 0:
            break

    return code


def set_unique_code_user():
    length = 8

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if User.objects.filter(id=code).count() == 0:
            break

    return code


class Book(models.Model):
    id = models.CharField(max_length=8, default=set_unique_code_book, primary_key=True, unique=True)
    name = models.CharField(max_length=36, default='')
    info = models.CharField(max_length=400, null=True)
    genre = models.CharField(max_length=36, null=True)
    image = models.CharField(max_length=1000, null=True)
    author = models.CharField(max_length=36, null=True)


class User(models.Model):
    id = models.CharField(max_length=8, default=set_unique_code_user, primary_key=True, unique=True)
    username = models.CharField(max_length=16, default='')
    password = models.CharField(max_length=16)
    is_admin = models.BooleanField()
