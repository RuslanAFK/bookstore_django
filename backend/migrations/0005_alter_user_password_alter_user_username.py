# Generated by Django 4.0.4 on 2022-05-23 16:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_book_author'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=16),
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(default='', max_length=16),
        ),
    ]
