# Generated by Django 4.0.4 on 2022-05-17 12:47

import backend.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_alter_book_genre_alter_book_image_alter_book_info'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.CharField(default=backend.models.set_unique_code_user, max_length=8, primary_key=True, serialize=False, unique=True)),
                ('username', models.CharField(default='', max_length=36)),
                ('password', models.CharField(max_length=36)),
                ('is_admin', models.BooleanField()),
            ],
        ),
    ]
