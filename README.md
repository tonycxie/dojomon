Dojomon
============
A web-based game built with Python using the Django framework and SQLite database based on the popular Pokémon video games.


Features:
=========
- Utilized PokéAPI to populate database with Pokémon information
- Implemented AJAX with Django to dynamically show damage done and remaining health during battles


To Use:
============
1) Create your desired folder to git clone our project

2) Enter the folder

3) pip install virtualenv (Create Virtual Environment for package installation)

4) virtualenv projectEnv (Create a Virtual Environment called "projectEnv" (Arbitrary name)) 

5) source projectEnv/bin/activate (To initialize Virtual Environment)

6) pip install -r requirements.txt (Install all necessary packages to run project) 

8) python manage.py makemigrations

9) python manage.py migrate

10) python manage.py runserver

11) Open localhost:8000 to see project!
