from rest_framework import serializers
from .models import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'name', 'info', 'genre', 'image', 'author', )


class LoadBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('name', 'info', 'genre', 'image', 'author', )


class DeleteBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('name', )





