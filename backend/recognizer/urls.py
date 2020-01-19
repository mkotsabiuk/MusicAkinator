from django.urls import path, include

from recognizer.views import get_song

urlpatterns = [
    path('get_song/', get_song),
]
