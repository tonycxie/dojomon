# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2018-10-25 20:36
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('log_reg', '0004_trainers_character_sprite'),
        ('dashboard', '0011_pokemon_desc'),
        ('battle', '0007_moves'),
    ]

    operations = [
        migrations.CreateModel(
            name='CPUs',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('required_level', models.IntegerField()),
                ('character_sprite', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='CPUTeam',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('cpu_teams_pokemon', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pokemons_cpu_team', to='dashboard.Pokemon')),
                ('cpu_teams_trainer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='trainers_cpu_team', to='log_reg.Trainers')),
            ],
        ),
    ]