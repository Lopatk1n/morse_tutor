import os
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-v3@dba)9wr7j6&dr9^1mp=1s^33&jvxcvm^gv3c@=kic98*73)'

DEBUG = True

ALLOWED_HOSTS = []

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

STATICFILES_DIRS = [
   os.path.join(BASE_DIR, "static"),
   os.path.join(BASE_DIR, "app/static"),
]
STATIC_DIR = os.path.join(BASE_DIR, 'static')